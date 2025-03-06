const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("Users", {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    PasswordHash: { type: DataTypes.STRING, allowNull: false },
    EmailAddress: { type: DataTypes.STRING, unique: true, allowNull: false },
    Role: { type: DataTypes.ENUM("farmer", "consumer", "admin"), allowNull: false },
}, {
    tableName: "Users",
    schema: "dbo",
    timestamps: false //Add this to remove the createdAt and updatedAt fields
  });

module.exports = User;
