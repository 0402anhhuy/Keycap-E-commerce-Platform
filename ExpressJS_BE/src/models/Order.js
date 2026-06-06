const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        orderCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },

        subtotal: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        discountAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        shippingFee: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        totalAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        couponCode: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        couponDiscount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
        },

        shippingName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        shippingPhone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        paymentMethod: {
            type: DataTypes.ENUM("cod", "paypal", "stripe", "bank_transfer"),
            allowNull: false,
            defaultValue: "cod",
        },

        paymentStatus: {
            type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
            allowNull: false,
            defaultValue: "pending",
        },

        status: {
            type: DataTypes.ENUM(
                "pending",
                "confirmed",
                "processing",
                "shipping",
                "delivered",
                "cancelled",
            ),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        tableName: "orders",
        timestamps: true,

        indexes: [
            {
                fields: ["orderCode"],
            },
            {
                fields: ["userId"],
            },
            {
                fields: ["status"],
            },
            {
                fields: ["paymentStatus"],
            },
        ],
    },
);

module.exports = Order;
