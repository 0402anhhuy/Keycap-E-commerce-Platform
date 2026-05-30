const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const { authMiddleware, vendorMiddleware } = require('../middleware/auth');

// Admin thống kê doanh thu toàn hệ thống
router.get('/manager', authMiddleware, vendorMiddleware, revenueController.getManagerRevenue);

module.exports = router;