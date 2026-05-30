const { sequelize } = require('../config/database');
const Review = require('../models/Review');
const { Order, OrderItem } = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const verifyPurchased = async (userId, productId) => {
    const orders = await Order.findAll({ 
        where: { userId, status: 'delivered' },
        include: [{ model: OrderItem, as: 'items', where: { productId } }]
    });
    if (orders.length === 0) throw Object.assign(new Error('Bạn chưa mua hoặc chưa nhận được sản phẩm này.'), { status: 403 });
};

const recalcProductRating = async (productId) => {
    const [result] = await sequelize.query(
        'SELECT AVG(rating) as avg, COUNT(*) as cnt FROM reviews WHERE productId = :productId',
        { replacements: { productId }, type: sequelize.QueryTypes.SELECT }
    );
    await Product.update(
        { rating: Number(result.avg || 0).toFixed(2), reviewCount: Number(result.cnt) },
        { where: { id: productId } }
    );
};

const createProductReview = async (userId, { productId, rating, comment }) => {
    await verifyPurchased(userId, productId);

    const existing = await Review.findOne({ where: { userId, productId } });
    if (existing) throw Object.assign(new Error('Bạn đã đánh giá sản phẩm này rồi.'), { status: 409 });

    const product = await Product.findByPk(productId);
    if (!product) throw Object.assign(new Error('Sản phẩm không tồn tại.'), { status: 404 });

    const review = await Review.create({
        userId, productId, rating, comment
    });
    await recalcProductRating(productId);

    // Tặng điểm tích lũy (+10 điểm)
    const user = await User.findByPk(userId);
    if (user) {
        await user.increment('points', { by: 10 });
    }

    // Tạo mã giảm giá thưởng đánh giá sản phẩm
    const couponService = require('./couponService');
    const couponCode = await couponService.createReviewRewardCoupon(userId);

    const plainReview = review.get({ plain: true });
    plainReview.rewardPoints = 10;
    plainReview.rewardCouponCode = couponCode;

    return plainReview;
};

const getProductReviews = async (productId, { page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Review.findAndCountAll({
        where: { productId },
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'avatar']
        }],
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        offset
    });
    return { total: count, page: Number(page), limit: Number(limit), reviews: rows };
};

const getManagerReviews = async ({ page = 1, limit = 20 }) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Review.findAndCountAll({
        include: [
            {
                model: Product,
                as: 'product',
                attributes: ['id', 'title', 'images']
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'avatar']
            }
        ],
        order: [['createdAt', 'DESC']],
        limit: Number(limit),
        offset
    });
    return { total: count, page: Number(page), limit: Number(limit), reviews: rows };
};

module.exports = {
    createProductReview,
    getProductReviews,
    getManagerReviews
};