const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signupUser = async (req, res) => {
    const { fullName, email, password, accountType } = req.body;

    if (!fullName || !email || !password || !accountType) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Fetch role based on accountType
        const role = await prisma.role.findUnique({
            where: { role_name: accountType },
        });

        if (!role) {
            return res.status(400).json({ message: "Invalid account type" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await prisma.user.create({
            data: {
                name: fullName,
                email: email,
                password: hashedPassword,
                roleId: role.id,
            },
        });

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, roleId: role.id },
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '1h' }
        );

        // Return response with user data and token
        res.status(201).json({
            message: "User created successfully",
            userId: user.id,
            token,
            userData: {
                id: user.id,
                name: fullName,
                email,
                roleId: role.id,
                roleType: accountType.toLowerCase(),
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Fetch user by email and include their role
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true }, // Include the user's role in the response
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, roleId: user.roleId },
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            userData: {
                id: user.id,
                name: user.name,
                email,
                roleId: user.roleId,
                roleType: user.role.role_name.toLowerCase(), // Accessing the user's role name directly
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