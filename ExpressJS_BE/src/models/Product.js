const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        sku: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [3, 255],
            },
        },

        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        collectionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        discountPercent: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            },
        },

        size: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Height in millimeters",
        },

        profile: {
            type: DataTypes.STRING(50),
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

        designer: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },

        images: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },

        status: {
            type: DataTypes.ENUM(
                "draft",
                "active",
                "out_of_stock",
                "hidden",
                "deleted",
            ),
            allowNull: false,
            defaultValue: "draft",
        },

        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        sold: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        rating: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            defaultValue: 0,
        },

        reviewCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "products",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: ["sku"],
            },
            {
                unique: true,
                fields: ["slug"],
            },
            {
                fields: ["categoryId"],
            },
            {
                fields: ["status"],
            },
            {
                fields: ["price"],
            },
            {
                fields: ["sold"],
            },
            {
                fields: ["createdAt"],
            },
        ],
    },
);

module.exports = Product;
