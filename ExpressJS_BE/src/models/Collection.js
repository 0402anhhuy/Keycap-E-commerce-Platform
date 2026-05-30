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
        },

        image: {
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
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
    },
);

module.exports = Collection;
