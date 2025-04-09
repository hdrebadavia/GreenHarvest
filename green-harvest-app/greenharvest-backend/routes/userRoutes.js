const express = require("express");
const { registerUser, loginUser, getUsers, resetPassword, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticate, authorize(['Admin']), getUsers);
router.get('/:id', authenticate, authorize(['Admin', 'Customer', 'StoreOwner']), getUserById);
router.post('/reset-password', authenticate, resetPassword);
router.patch('/update/:id', authenticate, authorize(['Admin', 'Customer', 'StoreOwner']), updateUser);
router.delete('/:id', authenticate, authorize(['Admin']), deleteUser);
module.exports = router;

