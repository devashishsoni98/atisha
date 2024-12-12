// import express from 'express';
// import { getStudentsByClass } from '../controllers/stuController.js';

// const express = require('express');



// const router = express.Router();

// router.get('/:classNumber', getStudentsByClass);

// export default router;

// const express = require('express');
// const router = express.Router();
// const StudentController = require('../controllers/stuController');

// // POST route for creating a student
// router.post('/create', StudentController.createStudent);

// // GET route for fetching all students
// router.get('/', StudentController.getAllStudents);

// // GET route for fetching a student by ID
// router.get('/:id', StudentController.getStudentById);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getStudentsByClass } = require('../controllers/stuController');  // Correct import path

// Define the route and handler
router.post('/students/:classNumber', getStudentsByClass);

module.exports = router;
