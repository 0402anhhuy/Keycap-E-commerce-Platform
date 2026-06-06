const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },

        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 100],
            },
        },

        productCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
    },
    {
        tableName: "categories",
        timestamps: true,

        indexes: [
            {
                fields: ["slug"],
            },
        ],
    },
);

module.exports = Category;