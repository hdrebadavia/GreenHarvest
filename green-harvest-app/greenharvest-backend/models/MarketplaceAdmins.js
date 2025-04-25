const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MarketplaceAdmins', {
    AdminID: {
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
    Role: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Admin"
    }
  }, {
    sequelize,
    tableName: 'MarketplaceAdmins',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Marketpl__719FE4E8897C8318",
        unique: true,
        fields: [
          { name: "AdminID" },
        ]
      },
      {
        name: "UQ__Marketpl__A9D105346CCCBEB4",
        unique: true,
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
