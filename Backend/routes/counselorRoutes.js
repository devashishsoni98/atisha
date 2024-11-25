// routes/counselorRoutes.js

const express = require('express');
const CounselorController = require('../controllers/counselorController');

const router = express.Router();

// Route for creating or updating counselor profile
// End point: POST /api/counselor/create
router.post('/create', CounselorController.createOrUpdateCounselorProfile);

// Route for getting counselor profile by ID
// End point: GET /api/counselor/:id
router.get('/:id', CounselorController.getCounselorById);



module.exports = router;