const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Products',
    {
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // References the Users table
          key: 'UserId',
        },
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // References the Users table
          key: 'UserId',
        },
      },
      UpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // References the Users table
          key: 'UserId',
        },
      },
    },
    {
      sequelize,
      tableName: 'Products',
      schema: 'GreenHarvest', // Ensure consistent schema name
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      indexes: [
        {
          name: 'PK__Products__B40CC6CDDB360752',
          unique: true,
          fields: [{ name: 'ProductID' }],
        },
      ],
    }
  );
};