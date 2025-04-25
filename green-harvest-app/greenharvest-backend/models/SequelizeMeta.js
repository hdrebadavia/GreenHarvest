const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SequelizeMeta', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'SequelizeMeta',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Sequeliz__72E12F1ADA5E739B",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "UQ__Sequeliz__72E12F1BF7548763",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
