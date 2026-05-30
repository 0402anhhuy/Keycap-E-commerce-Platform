const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CouponUsage = sequelize.define(
    "CouponUsage",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        couponId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        discountAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        usedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "coupon_usages",
        timestamps: false,

        indexes: [
            {
                fields: ["couponId"],
            },
            {
                fields: ["userId"],
            },
            {
                fields: ["orderId"],
            },
            {
                unique: true,
                fields: ["couponId", "userId"],
            },
        ],
    },
);

module.exports = CouponUsage;
