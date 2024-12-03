// FOR Fetching career from DB on Result Pgae after quiz

const express = require('express');
const { getRecommendedCareers } = require('../controllers/careerController');

const router = express.Router();

// Define the route for fetching recommended careers
router.post('/recommend', getRecommendedCareers);

module.exports = router;
