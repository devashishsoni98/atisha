const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup route
router.post('/signup', userController.signupUser);

// Login route
router.post('/login', userController.loginUser);

module.exports = router;

