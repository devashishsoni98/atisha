// src/routes/salaryRoutes.js
const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/careerLensController');

// Route to get salary data
router.get('/salary', salaryController.getSalaryData);
router.post('/data', salaryController.getCareerData);
module.exports = router;
