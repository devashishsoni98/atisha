// routes/counselorRoutes.js

const express = require('express');
const { createOrUpdateCounselorProfile } = require('../controllers/counselorController');

const router = express.Router();

// Route for creating or updating counselor profile
// End point: POST /api/counselor/profile/create
router.post('/profile/create', createOrUpdateCounselorProfile);

module.exports = router;