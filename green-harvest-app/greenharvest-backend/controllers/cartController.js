const db = require("../models");
const CartItem = db.CartItem;

const addItemToCart = async (req, res) => {
  try {
    const {  ProductId, Quantity, CreatedBy: userId } = req.body;
    const cartItem = new CartItem({ ProductId, Quantity, CreatedBy: userId });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.findAll({
    });

    if (!cartItems.length) return res.status(200).json({ message: "No products found for this store" });

    res.json(cartItems);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message);
        return res.status(400).json({ message: "Validation Error", errors: messages });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.Quantity = quantity || cartItem.Quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addItemToCart, getCartItemsByUserId, updateCartItem, deleteCartItem };