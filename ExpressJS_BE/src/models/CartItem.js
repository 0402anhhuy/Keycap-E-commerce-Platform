const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CartItem = sequelize.define(
    "CartItem",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
    },
    {
        tableName: "cart_items",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: ["userId", "productId"],
            },
        ],
    },
);

module.exports = CartItem;
