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

module.exports = router;