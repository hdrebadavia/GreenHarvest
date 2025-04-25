const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StoreUsers', {
    StoreUserId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stores',
        key: 'StoreId'
      }
    },
    UserType: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'StoreUsers',
    schema: 'GreenHarvest',
    timestamps: true,
    indexes: [
      {
        name: "PK__StoreUse__F769D91D51F65504",
        unique: true,
        fields: [
          { name: "StoreUserId" },
        ]
      },
    ]
  });
};
