const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Collection = sequelize.define(
    "Collection",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        background: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        productCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "collections",
        timestamps: true,
    },
);

module.exports = Collection;
