const { Op } = require('sequelize');
const Coupon = require('../models/Coupon');
const Product = require('../models/Product');

/**
 * Lấy danh sách mã giảm giá khả dụng của người dùng
 */
const getUserCoupons = async () => {
    return await Coupon.findAll({
        where: {
            isActive: true,
            startDate: { [Op.lte]: new Date() },
            endDate: { [Op.gte]: new Date() }
        }
    });
};

/**
 * Kiểm tra tính hợp lệ của mã giảm giá và tính toán số tiền giảm giá
 */
const checkCoupon = async (userId, { items, couponCode }) => {
    if (!couponCode) return { discount: 0, coupon: null };

    const productIds = items.map((i) => i.productId);
    const products = await Product.findAll({ where: { id: { [Op.in]: productIds }, status: 'active' } });

    let subtotal = 0;
    for (const item of items) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) continue;
        subtotal += Number(product.price) * item.quantity;
    }

    const coupon = await Coupon.findOne({
        where: {
            code: couponCode,
            isActive: true,
            startDate: { [Op.lte]: new Date() },
            endDate: { [Op.gte]: new Date() }
        }
    });

    if (!coupon) {
        throw Object.assign(new Error('Mã giảm giá không hợp lệ hoặc đã hết hạn.'), { status: 400 });
    }

    if (subtotal === 0) {
        throw Object.assign(new Error('Mã giảm giá không áp dụng cho các sản phẩm trong giỏ hàng.'), { status: 400 });
    }

    if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
        throw Object.assign(new Error(`Đơn hàng phải tối thiểu ${Number(coupon.minOrderAmount).toLocaleString('vi-VN')}đ để dùng mã này.`), { status: 400 });
    }

    let discount = coupon.discountType === 'percentage'
        ? (subtotal * Number(coupon.discountValue)) / 100
        : Number(coupon.discountValue);

    if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, Number(coupon.maxDiscountAmount));
    }
    discount = Math.min(discount, subtotal);

    return {
        discount,
        discountAmount: discount,
        code: coupon.code,
        couponCode: coupon.code,
        type: coupon.discountType,
        value: coupon.discountValue
    };
};

/**
 * Tạo mã giảm giá thưởng khi khách hàng đánh giá sản phẩm (REV-)
 */
const createReviewRewardCoupon = async (userId) => {
    const randStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    const couponCode = `REV-${userId}-${randStr}`;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // Hạn 30 ngày

    await Coupon.create({
        code: couponCode,
        description: "Mã giảm giá thưởng đánh giá sản phẩm",
        discountType: 'percentage',
        discountValue: 10.00,
        minOrderAmount: 50000.00,
        maxDiscountAmount: 20000.00,
        usageLimit: 1,
        usedCount: 0,
        startDate: new Date(),
        endDate,
        isActive: true
    });

    return couponCode;
};

const getShopCoupons = async () => {
    return await Coupon.findAll({
        order: [['createdAt', 'DESC']]
    });
};

const createCoupon = async (data) => {
    const { code, description, discountType, discountValue, minOrderAmount, maxDiscountAmount, usageLimit, startDate, endDate } = data;
    const existing = await Coupon.findOne({ where: { code } });
    if (existing) throw Object.assign(new Error('Mã giảm giá đã tồn tại.'), { status: 400 });

    return await Coupon.create({
        code: code.trim().toUpperCase(),
        description,
        discountType,
        discountValue,
        minOrderAmount: minOrderAmount || 0,
        maxDiscountAmount: maxDiscountAmount || null,
        usageLimit: usageLimit || null,
        startDate: startDate || new Date(),
        endDate: endDate || null,
        isActive: true
    });
};

const updateCoupon = async (couponId, data) => {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) throw Object.assign(new Error('Mã giảm giá không tồn tại.'), { status: 404 });

    const { description, discountType, discountValue, minOrderAmount, maxDiscountAmount, usageLimit, startDate, endDate, isActive } = data;
    await coupon.update({
        description,
        discountType,
        discountValue,
        minOrderAmount,
        maxDiscountAmount,
        usageLimit,
        startDate,
        endDate,
        isActive: isActive !== undefined ? isActive : coupon.isActive
    });
    return coupon;
};

const deleteCoupon = async (couponId) => {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) throw Object.assign(new Error('Mã giảm giá không tồn tại.'), { status: 404 });

    await coupon.destroy();
    return { message: 'Đã xóa mã giảm giá.' };
};

module.exports = {
    getUserCoupons,
    checkCoupon,
    createReviewRewardCoupon,
    getShopCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
};
