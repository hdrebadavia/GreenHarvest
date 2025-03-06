const sql = require("mssql");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize("GreenHarvest", "greenHarvestAdmin", "Greenharvest2025!", {
  host: "greenharvestserver.database.windows.net",
  dialect: "mssql",
  dialectOptions: {
    encrypt: true, // Required for Azure
  },
});

//localDB
// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   server: process.env.DB_HOST, // e.g. localhost
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: false, // Set to true if using Azure
//     enableArithAbort: true,
//   },
// };

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("✅ Connected to MSSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

module.exports = connectDB;
