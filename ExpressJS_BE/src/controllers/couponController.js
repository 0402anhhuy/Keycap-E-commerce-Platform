const couponService = require("../services/couponService");

const listUserCoupons = async (req, res) => {
    try {
        const coupons = await couponService.getUserCoupons();
        return res.json(coupons);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const listShopCoupons = async (req, res) => {
    try {
        const coupons = await couponService.getShopCoupons();
        return res.json(coupons);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const createCoupon = async (req, res) => {
    try {
        const coupon = await couponService.createCoupon(req.body);
        return res.status(201).json(coupon);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const coupon = await couponService.updateCoupon(
            req.params.id,
            req.body,
        );
        return res.json(coupon);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const result = await couponService.deleteCoupon(
            req.params.id,
        );
        return res.json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = {
    listUserCoupons,
    listShopCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
};
