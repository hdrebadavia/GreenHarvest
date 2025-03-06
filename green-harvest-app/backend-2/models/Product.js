const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the Product model
// The Product model represents the products table in the database
const Product = sequelize.define("Products", {
    ProductId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.STRING, allowNull: false },
    Price: { type: DataTypes.FLOAT, allowNull: false },
    Stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    FarmerId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: "Products",
    schema: "dbo",
    timestamps: false //Add this to remove the createdAt and updatedAt fields
  });

module.exports = Product;
