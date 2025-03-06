const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("Orders", {
  OrderId: {
    type: DataTypes.UUID,  // Unique identifier for the order
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  CustomerID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",  // Reference to User model
      key: "UserID",
    },
  },
  TotalAmount: {
    type: DataTypes.FLOAT,  // Total order price
    allowNull: false,
  },
  OrderStatus: {
    type: DataTypes.ENUM("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Pending",
    allowNull: false,
  },
  PaymentMethod: {
    type: DataTypes.STRING,  // Example: "Credit Card", "Cash on Delivery"
    allowNull: false,
  },
}, {
  tableName: "Orders",
  schema: "dbo",
  timestamps: false //Add this to remove the createdAt and updatedAt fields
});

module.exports = Order;
