const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"]; //AZURE SQL
// const config = require("../config/config.json")["local"]; //LOCAL SQL
const initModels = require('./init-models');
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
const models = initModels(sequelize);
db.models = models;

// Spread models to top-level db for easier access
Object.assign(db, models);
// Associations
// db.User.hasMany(db.Address, { foreignKey: "UserId", as: "Addresses" });
// db.Store.hasMany(db.Product, { foreignKey: "StoreId", as: "Products" });
// db.User.hasMany(db.Order, { foreignKey: "UserId", as: "Orders" });
// db.Order.belongsTo(db.User, { foreignKey: "UserId", as: "User" });
// db.Order.hasMany(db.OrderItem, { foreignKey: "OrderId", as: "OrderItems" });
// db.OrderItem.belongsTo(db.Order, { foreignKey: "OrderId", as: "Order" });
// db.OrderItem.belongsTo(db.Product, { foreignKey: "ProductId", as: "Product" });
// db.Product.belongsTo(db.Store, { foreignKey: "StoreId", as: "Store" });
// db.Product.belongsTo(db.User, { foreignKey: "CreatedBy", as: "Creator" });
// db.Product.belongsTo(db.User, { foreignKey: "UpdatedBy", as: "Updater" });
// db.Store.belongsTo(db.User, { foreignKey: "CreatedBy", as: "Creator" });
// db.Store.belongsTo(db.User, { foreignKey: "UpdatedBy", as: "Updater" });
// db.Order.belongsTo(db.User, { foreignKey: "CreatedBy", as: "Creator" });
// db.Order.belongsTo(db.User, { foreignKey: "UpdatedBy", as: "Updater" });
// db.OrderItem.belongsTo(db.User, { foreignKey: "CreatedBy", as: "Creator" });
// db.OrderItem.belongsTo(db.User, { foreignKey: "UpdatedBy", as: "Updater" });
// db.Address.belongsTo(db.User, { foreignKey: "CreatedBy", as: "Creator" });
// db.Address.belongsTo(db.User, { foreignKey: "UpdatedBy", as: "Updater" });

module.exports = db;