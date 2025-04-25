const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reviews', {
    ReviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Rating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Review: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'Reviews',
    schema: 'GreenHarvest',
    timestamps: true,
    indexes: [
      {
        name: "PK__Reviews__74BC79CE34B5E332",
        unique: true,
        fields: [
          { name: "ReviewId" },
        ]
      },
    ]
  });
};
