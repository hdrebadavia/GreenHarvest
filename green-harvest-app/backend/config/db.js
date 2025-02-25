const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mssql",
  port: process.env.DB_PORT || 1433,
  dialectOptions: {
    options: {
      encrypt: false, // Disable encryption for local dev
      trustServerCertificate: true, // Needed for self-signed certificates
    },
  },
});

module.exports = sequelize;
