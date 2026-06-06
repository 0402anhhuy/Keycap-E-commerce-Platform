const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Wishlist = sequelize.define(
    "Wishlist",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
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
    },
    {
        tableName: "wishlists",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: ["userId", "productId"],
            },
            {
                fields: ["productId"],
            },
        ],
    },
);

module.exports = Wishlist;
