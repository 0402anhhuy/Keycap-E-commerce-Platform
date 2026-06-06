const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Lấy danh sách đánh giá của một sản phẩm (public)
router.get('/product/:productId', reviewController.getProductReviews);

// Tạo đánh giá cho sản phẩm (user)
router.post('/product', authMiddleware, reviewController.createProductReview);

// Admin lấy danh sách toàn bộ đánh giá trên hệ thống
router.get('/manager', authMiddleware, requireRole("admin"), reviewController.getManagerReviews);

module.exports = router;