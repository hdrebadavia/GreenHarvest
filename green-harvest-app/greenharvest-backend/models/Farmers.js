const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Farmers', {
    FarmerID: {
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
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Farmers',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Farmers__731B88E83A3C506E",
        unique: true,
        fields: [
          { name: "FarmerID" },
        ]
      },
      {
        name: "UQ__Farmers__A9D105342AFF5156",
        unique: true,
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
