const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    },
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Kết nối thành công");
    } catch (error) {
        console.error("Lỗi kết nối:", error);
    }
};

module.exports = { sequelize, connection };
