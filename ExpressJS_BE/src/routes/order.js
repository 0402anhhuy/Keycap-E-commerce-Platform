const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const {
    createOrder,
    confirmOrder,
    getMyOrders,
    getOrderDetail,
    cancelOrder,
    updateOrderStatus,
    getManagerOrders,
    checkCoupon
} = require('../controllers/orderController');

router.post('/', authMiddleware, createOrder);
router.post('/check-coupon', authMiddleware, checkCoupon);
router.get('/me', authMiddleware, getMyOrders);
router.get('/shop', authMiddleware, requireRole("admin"), getManagerOrders);
router.get('/:id', authMiddleware, getOrderDetail);
router.post('/:id/confirm', authMiddleware, requireRole("admin"), confirmOrder);
router.patch('/:id/cancel', authMiddleware, cancelOrder);
router.patch('/:id/status', authMiddleware, requireRole("admin"), updateOrderStatus);

module.exports = router;