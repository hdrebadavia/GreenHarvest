const express = require("express");
const { registerUser, loginUser, getUsers, resetPassword, getUserById } = require("../controllers/userController");
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticate, authorize(['Admin']), getUsers);
router.get('/users/:id', authenticate, authorize(['Admin', 'Customer', 'StoreOwner']), getUserById);
router.post('/reset-password', authenticate, resetPassword);

module.exports = router;

