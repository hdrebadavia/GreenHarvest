var DataTypes = require("sequelize").DataTypes;
var _CartItems = require("./CartItems");
var _Customers = require("./Customers");
var _Farmers = require("./Farmers");
var _MarketplaceAdmins = require("./MarketplaceAdmins");
var _OrderItems = require("./OrderItems");
var _OrderItems = require("./OrderItems");
var _Orders = require("./Orders");
var _Orders = require("./Orders");
var _Products = require("./products");
var _Products = require("./products");
var _Reviews = require("./Reviews");
var _SequelizeMeta = require("./SequelizeMeta");
var _StoreUsers = require("./StoreUsers");
var _Stores = require("./Stores");
var _Transactions = require("./Transactions");
var _Users = require("./Users");
var _Users = require("./Users");
var _Addresses = require("./Addresses");

function initModels(sequelize) {
  var CartItems = _CartItems(sequelize, DataTypes);
  var Customers = _Customers(sequelize, DataTypes);
  var Farmers = _Farmers(sequelize, DataTypes);
  var MarketplaceAdmins = _MarketplaceAdmins(sequelize, DataTypes);
  var OrderItems = _OrderItems(sequelize, DataTypes);
  var OrderItems = _OrderItems(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Reviews = _Reviews(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var StoreUsers = _StoreUsers(sequelize, DataTypes);
  var Stores = _Stores(sequelize, DataTypes);
  var Transactions = _Transactions(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Addresses = _Addresses(sequelize, DataTypes)

  Products.belongsTo(Stores, { as: "Store", foreignKey: "StoreId"});
  Stores.hasMany(Products, { as: "Products", foreignKey: "StoreId"});
  StoreUsers.belongsTo(Stores, { as: "Store", foreignKey: "StoreId"});
  Stores.hasMany(StoreUsers, { as: "StoreUsers", foreignKey: "StoreId"});
  Addresses.belongsTo(Users, { as: "CreatedBy_User", foreignKey: "CreatedBy"});
  Users.hasMany(Addresses, { as: "Addresses", foreignKey: "CreatedBy"});
  Addresses.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Addresses, { as: "User_Addresses", foreignKey: "UserID"});
  Addresses.belongsTo(Users, { as: "UpdatedBy_User", foreignKey: "UpdatedBy"});
  Users.hasMany(Addresses, { as: "UpdatedBy_Addresses", foreignKey: "UpdatedBy"});
  Orders.belongsTo(Users, { as: "Customer", foreignKey: "CustomerId"});
  Users.hasMany(Orders, { as: "Orders", foreignKey: "CustomerId"});
  Orders.belongsTo(Users, { as: "CreatedBy_User", foreignKey: "CreatedBy"});
  Users.hasMany(Orders, { as: "CreatedBy_Orders", foreignKey: "CreatedBy"});
  Orders.belongsTo(Users, { as: "UpdatedBy_User", foreignKey: "UpdatedBy"});
  Users.hasMany(Orders, { as: "UpdatedBy_Orders", foreignKey: "UpdatedBy"});
  Products.belongsTo(Users, { as: "CreatedBy_User", foreignKey: "CreatedBy"});
  Users.hasMany(Products, { as: "Products", foreignKey: "CreatedBy"});
  Products.belongsTo(Users, { as: "UpdatedBy_User", foreignKey: "UpdatedBy"});
  Users.hasMany(Products, { as: "UpdatedBy_Products", foreignKey: "UpdatedBy"});
  StoreUsers.belongsTo(Users, { as: "CreatedBy_User", foreignKey: "CreatedBy"});
  Users.hasMany(StoreUsers, { as: "StoreUsers", foreignKey: "CreatedBy"});
  StoreUsers.belongsTo(Users, { as: "UpdatedBy_User", foreignKey: "UpdatedBy"});
  Users.hasMany(StoreUsers, { as: "UpdatedBy_StoreUsers", foreignKey: "UpdatedBy"});
  StoreUsers.belongsTo(Users, { as: "User", foreignKey: "UserId"});
  Users.hasMany(StoreUsers, { as: "User_StoreUsers", foreignKey: "UserId"});
  Stores.belongsTo(Users, { as: "CreatedBy_User", foreignKey: "CreatedBy"});
  Users.hasMany(Stores, { as: "Stores", foreignKey: "CreatedBy"});
  Stores.belongsTo(Users, { as: "UpdatedBy_User", foreignKey: "UpdatedBy"});
  Users.hasMany(Stores, { as: "UpdatedBy_Stores", foreignKey: "UpdatedBy"});

  return {
    CartItems,
    Customers,
    Farmers,
    MarketplaceAdmins,
    OrderItems,
    OrderItems,
    Orders,
    Orders,
    Products,
    Products,
    Reviews,
    SequelizeMeta,
    StoreUsers,
    Stores,
    Transactions,
    Users,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
