const express = require('express');

const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const {
    listUserCoupons,
    listShopCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

router.get('/', authMiddleware, listUserCoupons);
router.get('/shop', authMiddleware, requireRole("admin"), listShopCoupons);
router.post('/', authMiddleware, requireRole("admin"), createCoupon);
router.put('/:id', authMiddleware, requireRole("admin"), updateCoupon);
router.delete('/:id', authMiddleware, requireRole("admin"), deleteCoupon);

module.exports = router;
