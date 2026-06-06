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
            references: {
                model: "coupons",
                key: "id",
            },
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },

        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
            },
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
