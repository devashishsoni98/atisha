const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// Define routes
router.post('/', responseController.createResponse);

module.exports = router;
