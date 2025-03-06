require("dotenv").config();
const { Sequelize } = require("sequelize");



  const sequelize = new Sequelize("GreenHarvest", "sa", "localPassw0rd123!", {
    dialect: "mssql",
    host: "localhost",
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };