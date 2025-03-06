const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const OrderItem = sequelize.define("OrderItems", {
    OrderItemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    OrderId: { type: DataTypes.INTEGER, allowNull: false },
    ProductId: { type: DataTypes.INTEGER, allowNull: false },
    Quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    Subtotal: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = OrderItem;
