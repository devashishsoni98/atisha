const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST route for creating or updating student profile
// End point: /api/student/create
router.post('/create', studentController.createOrUpdateStudentProfile);
/// GET route for getting student profile by ID
// End point: /api/student/:id
router.get('/:id', studentController.getStudentById);

module.exports = router;