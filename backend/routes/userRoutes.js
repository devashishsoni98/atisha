// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup route
// End point: /api/auth/users/signup
router.post('/users/signup', userController.signupUser);

// Login route
// End point: /api/auth/users/login
router.post('/users/login', userController.loginUser);

module.exports = router;

