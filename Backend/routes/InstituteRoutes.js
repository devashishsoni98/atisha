// routes/instituteRoutes.js

const express = require('express');
const { createOrUpdateInstituteInfo } = require('../controllers/instituteController');

const router = express.Router();

// Route for creating or updating institute information
// End point: POST /api/institute/info/create
router.post('/info/create', createOrUpdateInstituteInfo);

module.exports = router;