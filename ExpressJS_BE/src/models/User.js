const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
        },

        addresses: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        points: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "users",
        timestamps: true,

        indexes: [
            {
                fields: ["email"],
            },
            {
                fields: ["phone"],
            },
            {
                fields: ["role"],
            },
            {
                fields: ["isActive"],
            },
        ],
    },
);

module.exports = User;
