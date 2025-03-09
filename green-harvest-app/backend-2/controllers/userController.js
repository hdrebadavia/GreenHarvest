const db = require("../models"); // Import the models index
const User = db.User; // Get the User model
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { FirstName, MiddleName, LastName, EmailAddress, ContactNumber, password, Role  } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { EmailAddress } });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({ FirstName, MiddleName, LastName, EmailAddress, ContactNumber, PasswordHash: hashedPassword, Role });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { EmailAddress, Password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { EmailAddress } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(Password, user.PasswordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Reset Password

const resetPassword = async (req, res) => {
    try {
        const { EmailAddress, Password, NewPassword } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { EmailAddress } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(Password, user.PasswordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const hashedPassword = await bcrypt.hash(NewPassword, 10);

        // Create user
        const newUser = await User.update({ PasswordHash: hashedPassword }, { where: { EmailAddress } });
        res.status(201).json({ message: "Password updated successfully.", user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get user by ID

const getUserById = async(req, res) => {
    try{
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user)
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = { registerUser, loginUser, getUsers, resetPassword, getUserById };
