// // const express = require('express');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // require('dotenv').config();
// // const app = express();
// //
// //
// //
// // // Middleware
// // app.use(express.json());  // Built-in middleware to parse JSON bodies
// // app.use(cors());
// //
// // const userRoutes = require('./routes/userRoutes'); // Import user routes
// // const studentRoutes = require('./routes/studentRoutes'); // Import student routes
// //
// // // Routes
// // app.use('/api', userRoutes); // User routes
// // app.use('/api/students', studentRoutes); // Student profile routes
// //
// // // Start the server
// // const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });



// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000;

// app.use(express.json()); // Middleware to parse JSON bodies

// // Import routes
// const userRoutes = require('./routes/userRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const counselorRoutes = require('./routes/counselorRoutes');
// const instituteRoutes = require('./routes/InstituteRoutes');

// // Use routes with a prefix
// app.use('/api/auth', userRoutes);
// app.use('/api/student',studentRoutes );
// app.use('/api/counselor', counselorRoutes);
// app.use('/api/institute', instituteRoutes);
// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // If using cookies/auth headers
  })
);

// Import routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const counselorRoutes = require('./routes/counselorRoutes');
const instituteRoutes = require('./routes/InstituteRoutes');

// Use routes with a prefix
app.use('/api/auth', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/counselor', counselorRoutes);
app.use('/api/institute', instituteRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
