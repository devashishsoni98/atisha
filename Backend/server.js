
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();

// Middleware
app.use(express.json());  // Built-in middleware to parse JSON bodies
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
