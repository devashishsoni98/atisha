const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();  // To load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allows requests from any origin

// PostgreSQL connection setup using environment variables
const con = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD || 'amanjain17x', // Replace with a secure password
    database: process.env.DB_NAME || 'db_atisha',
});

// Connect to PostgreSQL
con.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err.stack));

// Signup endpoint for user registration
app.post('/api/signup', async (req, res) => {
    const { fullName, email, password, accountType } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !password || !accountType) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Fetch the role_id based on the accountType, casting role_name as text
        const roleQuery = 'SELECT id FROM roles WHERE LOWER(role_name::text) = LOWER($1)';
        const roleResult = await con.query(roleQuery, [accountType]);

        // If no matching role found, send an error response
        if (roleResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid account type" });
        }

        const roleId = roleResult.rows[0].id;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user data into the 'users' table with the corresponding role_id
        const userQuery = `
            INSERT INTO users (name, email, password, role_id) 
            VALUES ($1, $2, $3, $4) RETURNING id
        `;
        const userResult = await con.query(userQuery, [fullName, email, hashedPassword, roleId]);

        // Log the inserted user details to the console (you can remove this in production)
        console.log("Inserted User:", userResult.rows[0]);

        // Respond with the user ID after successful registration
        res.status(201).json({ userId: userResult.rows[0].id });
        
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
