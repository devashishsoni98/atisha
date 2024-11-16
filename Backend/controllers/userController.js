
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const signupUser = async (req, res) => {
    const { fullName, email, password, accountType } = req.body;

    if (!fullName || !email || !password || !accountType) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const role = await userModel.getRoleByAccountType(accountType);
        if (!role) {
            return res.status(400).json({ message: "Invalid account type" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.createUser(fullName, email, hashedPassword, role.id);

        res.status(201).json({ userId: user.id });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
};

module.exports = {
    signupUser,
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Get user by email
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, roleId: user.role_id },
            process.env.JWT_SECRET || 'yourSecretKey', // Replace 'yourSecretKey' with a strong secret in .env
            { expiresIn: '1h' }
        );

        // Respond with user info and token
        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.role_id,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};

module.exports = {
    signupUser,
    loginUser,
};
