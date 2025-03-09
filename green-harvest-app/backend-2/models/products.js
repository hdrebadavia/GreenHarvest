const { Product } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ProductID"
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Name"
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Description"
      },
      ProductType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "ProductType"
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "Quantity"
      },
      Unit: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Unit"
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "Price"
      },
      StoreID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "StoreID"
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "CreatedBy",
        references: {
          model: 'Users',
          key: 'UserId'
        }
      },
      UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "UpdatedBy",
        references: {
          model: 'Users',
          key: 'UserId'
        }
      }
    }, {
        tableName: "Products",
        timestamps: true,
        schema: "GreenHarvest"
    });

    return Product;
};
