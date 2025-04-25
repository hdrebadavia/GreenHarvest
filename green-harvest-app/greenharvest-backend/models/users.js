const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Users',
    {
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Set as primary key
        autoIncrement: true, // Auto-increment for primary key
      },
      FirstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      LastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      EmailAddress: {
        type: DataTypes.STRING(100),
        allowNull: false, // Email should not be null
        unique: true, // Ensure uniqueness
      },
      Role: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      PasswordHash: {
        type: DataTypes.STRING(100),
        allowNull: false, // Password should not be null
      },
      // Address: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      tableName: 'Users',
      schema: 'GreenHarvest', // Ensure consistent schema name
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      indexes: [
        {
          name: 'PK__Users__1788CC4C6FB8DF3D',
          unique: true,
          fields: [{ name: 'UserID' }],
        },
        {
          name: 'UQ__Users__49A147401EF05833',
          unique: true,
          fields: [{ name: 'EmailAddress' }],
        },
      ],
    }
  );
};