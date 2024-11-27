// routes/counselorRoutes.js

const express = require('express');
const CounselorController = require('../controllers/counselorControllers');

const router = express.Router();

// Route for creating or updating counselor profile
// End point: POST /api/counselor/create
router.post('/create', CounselorController.createOrUpdateCounselorProfile);

// Route for getting counselor profile by ID
// End point: GET /api/counselor/:id
router.get('/:id', CounselorController.getCounselorById);

// Route for getting counselor profile by recommendation
// End point: GET /api/counselor/recommendation/:id
router.get('/recommendation/:counselor_id', CounselorController.getCounselorByRecommendation);

// Route for getting counselors by specialization
// End point: GET /api/counselor/specialization/:specialty
router.get('/specialization/:specialty', CounselorController.getCounselorBySpecialization);

// Route for getting all counselors
// End point: GET /api/counselor/all
router.get('/', CounselorController.getAllCounselor);

module.exports = router;