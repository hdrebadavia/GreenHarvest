const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log("✅ Connected to Azure SQL Database"))
  .catch(err => console.error("❌ Connection error:", err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = require("./product")(sequelize, DataTypes);

module.exports = db;
