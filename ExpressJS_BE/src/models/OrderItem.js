const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const OrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
            },
        },

        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },

        sku: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        size: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        material: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        color: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },

        discountPercent: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },

        subtotal: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
    },
    {
        tableName: "order_items",
        timestamps: false,

        indexes: [
            {
                fields: ["orderId"],
            },
            {
                fields: ["productId"],
            },
        ],
    },
);

module.exports = OrderItem;
