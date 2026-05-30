const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Review = sequelize.define(
    "Review",
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

        rating: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "reviews",
        timestamps: true,
    },
);

module.exports = Review;
