const authMiddleware = (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = authMiddleware;
