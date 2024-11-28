// routes/mentorRoutes.js

const express = require('express');
const MentorController = require('../controllers/mentorController');

const router = express.Router();

// Route for creating a new mentor
/// End point: POST /api/mentor/create
router.post('/create', MentorController.createMentor);

// Route for getting mentor by ID
// End point: GET /api/mentor/:id
router.get('/:id', MentorController.getMentorById);

// Route for getting all mentors
// End point: GET /api/mentor
router.get('/', MentorController.getAllMentors);

module.exports = router;