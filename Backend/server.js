// //atisha/Backend/server.js
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');
// const http = require('http');
// const socketService = require('./socket/socket');
// const multer = require('multer');
// dotenv.config();

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000;
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');
// const http = require('http');
// const multer = require('multer');
// dotenv.config();
// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // const app = express();
// // const prisma = new PrismaClient();
// // const PORT = process.env.PORT || 3000;

// // Configure multer
// const upload = multer({ dest: 'uploads/' });

// // Middleware to parse JSON bodies
// app.use(express.json());

// // // Configure CORS
// // app.use(
// //   cors({
// //     origin: ['http://localhost:5173', 'http://localhost:5174'],
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     credentials: true,
// //   })
// // );

// // Import routes
// const schoolStudentsRoutes = require('./routes/schoolStudentsRoutes');

// // Use routes with a prefix
// app.use('/api/school-students', schoolStudentsRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // // Configure multer
// // const upload = multer({ dest: 'uploads/' });

// // Middleware to parse JSON bodies
// app.use(express.json());
// // Create an HTTP server
// const server = http.createServer(app);

// // Configure CORS
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'http://localhost:5174'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );
// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// // Import routes
// const userRoutes = require('./routes/userRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const counselorRoutes = require('./routes/counselorRoutes');
// const instituteRoutes = require('./routes/InstituteRoutes');
// const mentorRoutes = require('./routes/mentorRoutes');
// const sessionsReportsRoutes = require('./routes/sessionsReportsRoutes');
// const counselorBookingRoutes = require('./routes/counselorBookingRoutes');
// const mentorBookingRoutes = require('./routes/mentorBookingRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const meetingRoutes = require('./routes/meetingRoutes');
// const masterRoutes = require('./routes/masterRoutes');
// const eventRoutes = require('./routes/eventsRoutes');
// const studentTraitsRoutes = require('./routes/studentTraitsRoutes');
// const messageRoutes = require('./routes/messageRoutes');
// const conversationRoutes = require('./routes/conversationRoutes');
// const careerRoutes = require('./routes/careerRoutes');
// const webexRoutes = require('./routes/webexRoutes');
// const notificationRoutes = require('./routes/notificationsRoutes');
// const eventsRoutes = require('./routes/eventsRoutes');
// const activityRoutes = require('./routes/activityRoutes');
// const quizRoutes = require('./routes/quizRoutes');
// const questionRoutes = require('./routes/questionRoutes');
// const responseRoutes = require('./routes/responseRoutes');
// const fileRoutes = require('./routes/fileRoutes');
// const stuRoutes = require('./routes/stuRoutes');
// const schoolStudentsRoutes = require('./routes/schoolStudentsRoutes'); 
// // Use routes with a prefix
// app.use('/api/auth', userRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/counselor', counselorRoutes);
// app.use('/api/institute', instituteRoutes);
// app.use('/api/mentor', mentorRoutes);
// app.use('/api/session-reports', sessionsReportsRoutes);
// app.use('/api/counselor-booking', counselorBookingRoutes);
// app.use('/api/mentor-booking', mentorBookingRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/meeting', meetingRoutes);
// app.use("/api/master", masterRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/conversations', conversationRoutes);
// app.use('/api/student-traits', studentTraitsRoutes);
// app.use('/api/career', careerRoutes);
// app.use('/api/webex', webexRoutes)
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/events', eventsRoutes);
// app.use('/api/student-traits', studentTraitsRoutes);
// app.use('/api/activities', activityRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/questions', questionRoutes);
// app.use('/api/responses', responseRoutes);
// app.use('/api/school-students', schoolStudentsRoutes);
// // For inst student
// app.use('/api/files', upload.single('file'), fileRoutes);
// app.use('/api/stu', stuRoutes);
// // Start server
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const http = require('http');
const multer = require('multer');
const socketService = require('./socket/socket');  // Ensure your socket setup is correct

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175','http://localhost:5176'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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
const meetingRoutes = require('./routes/meetingRoutes');
const masterRoutes = require('./routes/masterRoutes');
const eventRoutes = require('./routes/eventsRoutes');
const studentTraitsRoutes = require('./routes/studentTraitsRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const careerRoutes = require('./routes/careerRoutes');
const webexRoutes = require('./routes/webexRoutes');
// Use routes with a prefixs
const notificationRoutes = require('./routes/notificationsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const activityRoutes = require('./routes/activityRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const fileRoutes = require('./routes/fileRoutes');
const stuRoutes = require('./routes/stuRoutes');
const schoolStudentsRoutes = require('./routes/schoolStudentsRoutes');
const MentorMatchingRoutes = require('./routes/MentorMatchingRoutes');
const careerLensRoutes = require('./routes/careerLensRoutes');
const pushNotificationsRoutes = require('./routes/pushNotificationRoutes');



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
app.use('/api/meeting', meetingRoutes);
app.use("/api/master", masterRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/student-traits', studentTraitsRoutes);
app.use('/api/career',careerRoutes);
app.use('/api/webex',webexRoutes)
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/mentor-matching', MentorMatchingRoutes);
app.use('/api/careerLens', careerLensRoutes);
app.use('/api/student-traits', studentTraitsRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/school-students', schoolStudentsRoutes); // This line remains as per your request
app.use('/api/push-notifications', pushNotificationsRoutes);

// For inst student
app.use('/api/files', upload.single('file'), fileRoutes);
app.use('/api/stu', stuRoutes);

// Create an HTTP server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


