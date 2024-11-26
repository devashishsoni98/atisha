const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
        req.user = decoded; // Attach decoded information to request object
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = verifyToken;