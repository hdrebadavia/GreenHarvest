const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Customer__A4AE64B8ECA484FD",
        unique: true,
        fields: [
          { name: "CustomerID" },
        ]
      },
      {
        name: "UQ__Customer__A9D1053425B89736",
        unique: true,
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
