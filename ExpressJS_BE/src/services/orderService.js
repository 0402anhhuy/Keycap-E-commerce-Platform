const { sequelize } = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const CartItem = require('../models/CartItem');
const Coupon = require('../models/Coupon');
const User = require('../models/User');
const { Op } = require('sequelize');

// ── Auto-confirm sau 30 phút nếu đơn vẫn pending ──────────────────────────
const scheduleAutoConfirm = (orderId) => {
    const THIRTY_MIN = 30 * 60 * 1000;
    setTimeout(async () => {
        try {
            const order = await Order.findByPk(orderId);
            if (order && order.status === 'pending') {
                await order.update({ status: 'confirmed' });
                console.log(`[Auto-confirm] Order #${orderId} confirmed automatically.`);
            }
        } catch (err) {
            console.error(`[Auto-confirm] Error confirming order #${orderId}:`, err.message);
        }
    }, THIRTY_MIN);
};

// ── Tạo đơn hàng ──────────────────────────────────────────────────────────
const createOrder = async (userId, { items, couponCode, shippingAddress, paymentMethod, note }) => {
    if (!items || items.length === 0) throw Object.assign(new Error('Giỏ hàng trống.'), { status: 400 });

    const productIds = items.map((i) => i.productId);
    const products = await Product.findAll({ where: { id: { [Op.in]: productIds }, status: 'active' } });
    if (products.length !== productIds.length)
        throw Object.assign(new Error('Một số sản phẩm không tồn tại.'), { status: 400 });

    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction: t });

        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const product = products.find((p) => p.id === item.productId);
            if (product.stock < item.quantity)
                throw Object.assign(new Error(`Sản phẩm "${product.title}" không đủ hàng.`), { status: 400 });
            
            const lineTotal = Number(product.price) * item.quantity;
            subtotal += lineTotal;
            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
                color: item.color || null,
                productTitle: product.title,
                productImage: product.images?.[0] || null
            });
        }

        let couponDiscount = 0;
        let discountAmount = 0; // Total discount
        
        if (couponCode) {
            const coupon = await Coupon.findOne({
                where: {
                    code: couponCode,
                    isActive: true,
                    startDate: { [Op.lte]: new Date() },
                    endDate: { [Op.gte]: new Date() }
                },
                transaction: t
            });
            if (coupon) {
                if (!coupon.minOrderAmount || subtotal >= Number(coupon.minOrderAmount)) {
                    couponDiscount = coupon.discountType === 'percentage'
                        ? (subtotal * Number(coupon.discountValue)) / 100
                        : Number(coupon.discountValue);
                    if (coupon.maxDiscountAmount) couponDiscount = Math.min(couponDiscount, Number(coupon.maxDiscountAmount));
                    couponDiscount = Math.min(couponDiscount, subtotal);
                    discountAmount = couponDiscount;
                    await coupon.increment('usedCount', { transaction: t });
                }
            }
        }

        const shippingFee = 0; // Miễn phí vận chuyển
        const totalAmount = subtotal - discountAmount + shippingFee;

        // Xử lý địa chỉ giao hàng
        const shippingName = shippingAddress?.name || user?.name || "Người nhận";
        const shippingPhone = shippingAddress?.phone || user?.phone || "0000000000";
        const shippingAddressString = typeof shippingAddress === 'string' 
            ? shippingAddress 
            : (shippingAddress?.street || JSON.stringify(shippingAddress));

        const orderCode = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order = await Order.create({
            orderCode,
            userId,
            subtotal,
            discountAmount,
            shippingFee,
            totalAmount,
            couponCode: couponCode || null,
            couponDiscount,
            paymentMethod: paymentMethod || 'cod',
            shippingName,
            shippingPhone,
            shippingAddress: shippingAddressString,
            note,
            status: 'pending',
            paymentStatus: 'pending' // pending is unpaid in new enum
        }, { transaction: t });

        await OrderItem.bulkCreate(
            orderItems.map((i) => ({ ...i, orderId: order.id })),
            { transaction: t }
        );

        for (const item of items) {
            const product = products.find((p) => p.id === item.productId);
            await product.decrement('stock', { by: item.quantity, transaction: t });
            await product.increment('sold', { by: item.quantity, transaction: t });
        }

        await CartItem.destroy({ where: { userId, productId: { [Op.in]: productIds } }, transaction: t });
        await t.commit();

        scheduleAutoConfirm(order.id);

        return [order]; // Return array to match old behavior where it returned multiple orders
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

// ── Confirm đơn hàng thủ công (admin) ─────────────────────────────────────
const confirmOrder = async (orderId) => {
    const order = await Order.findByPk(orderId);
    if (!order) throw Object.assign(new Error('Đơn hàng không tồn tại.'), { status: 404 });
    if (order.status !== 'pending')
        throw Object.assign(new Error('Chỉ có thể xác nhận đơn hàng mới.'), { status: 400 });
    await order.update({ status: 'confirmed' });
    return order;
};

// ── Lấy danh sách đơn hàng của user ──────────────────────────────────────
const getMyOrders = async (userId, { page = 1, limit = 10, status }) => {
    const where = { userId };
    if (status) where.status = status;
    const offset = (page - 1) * limit;
    const { count, rows } = await Order.findAndCountAll({
        where,
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        offset,
        include: [{ model: OrderItem, as: 'items' }]
    });
    return { total: count, page: Number(page), limit: Number(limit), orders: rows };
};

// ── Chi tiết đơn hàng ─────────────────────────────────────────────────────
const getOrderDetail = async (orderId, userId, role) => {
    const where = { id: orderId };
    if (!['admin', 'manager'].includes(role)) where.userId = userId;
    const order = await Order.findOne({ where, include: [{ model: OrderItem, as: 'items' }] });
    if (!order) throw Object.assign(new Error('Đơn hàng không tồn tại.'), { status: 404 });
    return order;
};

// ── Hủy đơn hàng ─────────────────────────────────────────────────────────
const cancelOrder = async (orderId, userId, reason) => {
    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) throw Object.assign(new Error('Đơn hàng không tồn tại.'), { status: 404 });

    const now = new Date();
    const createdAt = new Date(order.createdAt);
    const diffMs = now - createdAt;
    const THIRTY_MIN = 30 * 60 * 1000;

    // Chỉ cho hủy khi pending hoặc confirmed và trong vòng 30 phút
    if (!['pending', 'confirmed'].includes(order.status)) {
        throw Object.assign(new Error('Không thể huỷ đơn hàng ở trạng thái này.'), { status: 400 });
    }

    if (diffMs > THIRTY_MIN) {
        throw Object.assign(new Error('Đã quá 30 phút, không thể hủy đơn hàng.'), { status: 400 });
    }

    const t = await sequelize.transaction();
    try {
        await order.update({ status: 'cancelled' }, { transaction: t });

        const items = await OrderItem.findAll({ where: { orderId } });
        for (const item of items) {
            await Product.increment('stock', { by: item.quantity, where: { id: item.productId }, transaction: t });
            await Product.decrement('sold', { by: item.quantity, where: { id: item.productId }, transaction: t });
        }
        await t.commit();
    } catch (err) {
        await t.rollback();
        throw err;
    }
    return order;
};

// ── Cập nhật trạng thái đơn hàng (admin) ────────────────────────────
const updateOrderStatus = async (orderId, newStatus) => {
    const validTransitions = {
        pending: ['confirmed', 'cancelled'],
        confirmed: ['processing', 'cancelled'],
        processing: ['shipping', 'cancelled'],
        shipping: ['delivered'],
    };

    const order = await Order.findByPk(orderId);
    if (!order) throw Object.assign(new Error('Đơn hàng không tồn tại.'), { status: 404 });
    
    // Allow any transition to cancelled if needed, otherwise check transitions
    if (newStatus !== 'cancelled' && !validTransitions[order.status]?.includes(newStatus))
        throw Object.assign(new Error(`Không thể chuyển sang trạng thái "${newStatus}".`), { status: 400 });

    const updates = { status: newStatus };

    if (newStatus === 'delivered') {
        updates.paymentStatus = 'paid';
    } 

    if (newStatus === 'cancelled') {
        const t = await sequelize.transaction();
        try {
            await order.update(updates, { transaction: t });
            const items = await OrderItem.findAll({ where: { orderId } });
            for (const item of items) {
                await Product.increment('stock', { by: item.quantity, where: { id: item.productId }, transaction: t });
                await Product.decrement('sold', { by: item.quantity, where: { id: item.productId }, transaction: t });
            }
            await t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }
        return order;
    }

    await order.update(updates);
    return order;
};

// ── Lấy đơn hàng (admin) ────────────────────────────────────────────────
const getManagerOrders = async ({ page = 1, limit = 20, status }) => {
    const where = {};
    if (status) where.status = status;
    const offset = (page - 1) * limit;
    const { count, rows } = await Order.findAndCountAll({
        where,
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        offset,
        include: [{ model: OrderItem, as: 'items' }]
    });
    return { total: count, page: Number(page), limit: Number(limit), orders: rows };
};

const checkCoupon = async (userId, { items, couponCode }) => {
    const couponService = require('./couponService');
    return couponService.checkCoupon(userId, { items, couponCode });
};

module.exports = { createOrder, confirmOrder, getMyOrders, getOrderDetail, cancelOrder, updateOrderStatus, getManagerOrders, checkCoupon };