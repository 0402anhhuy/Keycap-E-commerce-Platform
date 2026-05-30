const { sequelize } = require('../config/database');
const Order = require('../models/Order');
const { Op } = require('sequelize');

const getManagerRevenue = async ({ from, to, groupBy = 'day' }) => {
    const groupFormats = { day: '%Y-%m-%d', month: '%Y-%m', year: '%Y' };
    const fmt = groupFormats[groupBy] || groupFormats.day;

    const replacements = { fmt };
    let dateFilter = '';
    // Use updatedAt as an approximation for delivered time
    if (from) { dateFilter += ' AND updatedAt >= :from'; replacements.from = new Date(from); }
    if (to)   { dateFilter += ' AND updatedAt <= :to';   replacements.to   = new Date(to); }

    const chart = await sequelize.query(
        `SELECT DATE_FORMAT(updatedAt, :fmt) as period,
                COUNT(*) as orderCount,
                SUM(totalAmount) as revenue,
                SUM(discountAmount) as totalDiscount
         FROM orders
         WHERE status = 'delivered'
         ${dateFilter}
         GROUP BY period
         ORDER BY period ASC`,
        { replacements, type: sequelize.QueryTypes.SELECT }
    );

    const [stats] = await sequelize.query(
        `SELECT COUNT(*) as totalOrders,
                COALESCE(SUM(totalAmount), 0) as totalRevenue,
                COALESCE(SUM(discountAmount), 0) as totalDiscount,
                COUNT(DISTINCT userId) as uniqueCustomers
         FROM orders
         WHERE status = 'delivered'
         ${dateFilter}`,
        { replacements, type: sequelize.QueryTypes.SELECT }
    );

    return {
        summary: {
            totalRevenue: Number(stats.totalRevenue),
            totalOrders: Number(stats.totalOrders),
            totalDiscount: Number(stats.totalDiscount),
            uniqueCustomers: Number(stats.uniqueCustomers)
        },
        chart
    };
};

module.exports = { getManagerRevenue };