const express = require("express");
const { registerUser, loginUser, getUsers, resetPassword, getUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers); // Fetch all users
router.get("/resetPassword", resetPassword);
router.get("/:id", getUserById)
module.exports = router;

