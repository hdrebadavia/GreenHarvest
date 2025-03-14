const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;

// Create order
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;
        console.log("Request body:", req.body);

        const order = await Order.create({ CustomerId: userId, CreatedBy: userId, OrderStatus: 'Pending' });
        console.log("Order created:", order);

        const orderItems = items.map((item) => ({
            OrderId: order.OrderId,
            ProductId: item.productId,
            Quantity: item.quantity,
        }));
        console.log("Order items to create:", orderItems);

        await OrderItem.bulkCreate(orderItems);
        console.log("Order items created");

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: OrderItem });
        res.json(orders);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get order by id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, { include: OrderItem });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        order.userId = userId || order.userId;
        await order.save();
        await OrderItem.destroy({ where: { orderId: order.id } });
        const orderItems = items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
        }));
        await OrderItem.bulkCreate(orderItems);
        res.json(order);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        await order.destroy();
        await OrderItem.destroy({ where: { orderId: order.id } });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};