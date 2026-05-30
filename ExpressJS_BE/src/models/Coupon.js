const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Coupon = sequelize.define(
    "Coupon",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        discountType: {
            type: DataTypes.ENUM("percentage", "fixed_amount"),
            allowNull: false,
        },

        discountValue: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },

        minOrderAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        maxDiscountAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: true,
        },

        usageLimit: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

        usedCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: "coupons",
        timestamps: true,
    },
);

module.exports = Coupon;
