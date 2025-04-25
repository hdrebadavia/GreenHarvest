const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Transactions', {
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PaymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PaymentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DeliveryMethod: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AddressId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Transactions',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Transact__55433A6BFDA06DD9",
        unique: true,
        fields: [
          { name: "TransactionId" },
        ]
      },
    ]
  });
};
