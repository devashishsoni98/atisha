const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Admin Signup
const signupAdmin = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin in the database
        const admin = await prisma.admin.create({
            data: {
                name: fullName,
                email: email,
                password: hashedPassword,
            },
        });

        // Create JWT token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "Admin created successfully",
            adminId: admin.id,
            token: token,
            admin: {
                id: admin.id,
                name: fullName,
                email: admin.email,
            }
        });
    } catch (error) {
        console.error("Error during admin registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Fetch admin by email
        const admin = await prisma.admin.findUnique({
            where: { email: email },
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};

module.exports = {
    signupAdmin,
    loginAdmin,
};