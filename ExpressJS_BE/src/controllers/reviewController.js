const reviewService = require('../services/reviewService');

const createProductReview = async (req, res) => {
    try {
        const review = await reviewService.createProductReview(req.user.id, req.body);
        return res.status(201).json(review);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const result = await reviewService.getProductReviews(req.params.productId, req.query);
        return res.json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const getManagerReviews = async (req, res) => {
    try {
        const result = await reviewService.getManagerReviews(req.query);
        return res.json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = { createProductReview, getProductReviews, getManagerReviews };