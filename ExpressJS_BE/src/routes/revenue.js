const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Admin thống kê doanh thu toàn hệ thống
router.get('/manager', authMiddleware, requireRole("admin"), revenueController.getManagerRevenue);

module.exports = router;