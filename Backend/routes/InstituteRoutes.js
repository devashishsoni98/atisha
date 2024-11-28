// routes/instituteRoutes.js

const express = require('express');
const InstituteController = require('../controllers/InstituteController');

const router = express.Router();

// Route for creating or updating institute information
// End point: POST /api/institute/info/create
router.post('/info/create', InstituteController.createOrUpdateInstitute);

// Route for getting institute information by ID
// End point: GET /api/institute/:id
router.get('/:id', InstituteController.getInstituteById);

module.exports = router;