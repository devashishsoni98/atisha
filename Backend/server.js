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
    origin: ['http://localhost:5173','http://localhost:5174'], // Allow requests from this origin (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // If using cookies/auth headers
  })
);

// Import routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const counselorRoutes = require('./routes/counselorRoutes');
const instituteRoutes = require('./routes/InstituteRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const sessionsReportsRoutes = require('./routes/sessionsReportsRoutes');
const counselorBookingRoutes = require('./routes/counselorBookingRoutes');
const mentorBookingRoutes = require('./routes/mentorBookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const studentTraitsRoutes = require('./routes/studentTraitsRoutes');


// Use routes with a prefix
app.use('/api/auth', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/counselor', counselorRoutes);
app.use('/api/institute', instituteRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/session-reports', sessionsReportsRoutes);
app.use('/api/counselor-booking', counselorBookingRoutes);
app.use('/api/mentor-booking', mentorBookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/student-traits', studentTraitsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
