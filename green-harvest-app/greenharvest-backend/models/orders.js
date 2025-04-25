const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    OrderStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Pending"
    },
    PaymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Orders',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Orders__C3905BAFE587EDC6",
        unique: true,
        fields: [
          { name: "OrderID" },
        ]
      },
    ]
  });
};