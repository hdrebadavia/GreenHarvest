const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderItems', {
    OrderItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'OrderItems',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__OrderIte__57ED06A151815F78",
        unique: true,
        fields: [
          { name: "OrderItemID" },
        ]
      },
    ]
  });
};