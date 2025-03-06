const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

// Create an order
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Create the order
        const order = await Order.create({ userId });

        // Add items to the order
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: OrderItem });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createOrder, getOrders };
