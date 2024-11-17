// // routes/studentRoutes.js
// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');

// // Route to create or update student profile
// router.post('/profile', studentController.createOrUpdateStudentProfile);

// module.exports = router;
// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST route for creating or updating student profile
router.post('/', studentController.createOrUpdateStudentProfile);

module.exports = router;
