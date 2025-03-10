const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};


const authorize = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user || !roles.includes(user.Role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    };
};

module.exports = { authenticate, authorize };