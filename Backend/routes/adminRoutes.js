const express = require('express');
const { signupAdmin, loginAdmin } = require('../controllers/adminController');

const router = express.Router();

// Admin Signup
// End point: /api/admin/signup
router.post('/signup', signupAdmin);

// Login route
// End point: /api/admin/login
router.post('/login', loginAdmin);

module.exports = router;