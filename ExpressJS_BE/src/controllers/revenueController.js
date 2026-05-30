const revenueService = require('../services/revenueService');

const getManagerRevenue = async (req, res) => {
    try {
        const data = await revenueService.getManagerRevenue(req.query);
        return res.json(data);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = { getManagerRevenue };