const { Product } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ProductId"
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
        field: "StoreId",
        references: {
            model: "Stores",
            key: "StoreId"
        },
        onDelete: "CASCADE"
      },
      CreatedAt: {
          type: DataTypes.DATE,
          field: "CreatedAt",
          allowNull: false,
          defaultValue: sequelize.literal("GETDATE()")
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
      UpdatedAt: {
          type: DataTypes.DATE,
          field: "UpdatedAt",
          allowNull: true,
          onUpdate: sequelize.literal("GETDATE()")
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
        timestamps: false,
        schema: "GreenHarvest"
    });

    // Define relationships
    Product.associate = (models) => {
      Product.belongsTo(models.Users, { foreignKey: "CreatedBy", as: "Creator" });
    };

    return Product;
};
