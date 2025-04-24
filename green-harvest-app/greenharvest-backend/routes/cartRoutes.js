const express = require('express');
const { addItemToCart, getCartItemsByUserId, updateCartItem, deleteCartItem } = require("../controllers/cartController");

const router = express.Router();

router.post('/', addItemToCart);
router.get('/:userId', getCartItemsByUserId);
router.put('/:cartItemId', updateCartItem);
router.delete('/:cartItemId', deleteCartItem);

module.exports = router;