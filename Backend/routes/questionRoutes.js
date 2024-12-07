const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Define routes
router.post('/', questionController.createQuestion);

module.exports = router;
