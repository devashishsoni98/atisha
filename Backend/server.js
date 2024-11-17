// //server.js
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const userRoutes = require('./routes/userRoutes'); // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Import student routes

// const app = express();

// // Middleware
// app.use(express.json());  // Built-in middleware to parse JSON bodies
// app.use(cors());

// // Routes
// // app.use('/api', userRoutes);
// app.use('/api/users', userRoutes); // User routes
// app.use('/api/students', studentRoutes); // Student profile routes

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // Import user routes
const studentRoutes = require('./routes/studentRoutes'); // Import student routes

const app = express();

// Middleware
app.use(express.json());  // Built-in middleware to parse JSON bodies
app.use(cors());

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/students', studentRoutes); // Student profile routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
