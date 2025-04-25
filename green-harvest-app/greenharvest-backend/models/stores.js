const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Stores', {
    StoreId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    },
    UpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    }
  }, {
    sequelize,
    tableName: 'Stores',
    schema: 'GreenHarvest',
    timestamps: true,
    indexes: [
      {
        name: "PK__Stores__3B82F101A07AFEC1",
        unique: true,
        fields: [
          { name: "StoreId" },
        ]
      },
    ]
  });
};
