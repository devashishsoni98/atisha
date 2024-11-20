const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');  
require('dotenv').config();
const app = express();



// Middleware
app.use(express.json());  // Built-in middleware to parse JSON bodies
app.use(cors());
// Increase payload size limit (adjust the limit as needed)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const userRoutes = require('./routes/userRoutes'); // Import user routes
const studentRoutes = require('./routes/studentRoutes'); // Import student routes

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/students', studentRoutes); // Student profile routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
