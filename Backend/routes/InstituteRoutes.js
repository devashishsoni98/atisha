// routes/instituteRoutes.js

const express = require('express');
const InstituteController = require('../controllers/InstituteController');

const router = express.Router();

// Institute route to fetch institute name and code
router.get('/fetch',InstituteController.fetchInstituteNameCode)

// Route for creating or updating institute information
// End point: POST /api/institute/info/create
router.post('/info/create', InstituteController.createOrUpdateInstitute);

// Route for getting institute information by ID
// End point: GET /api/institute/:id
router.get('/:id', InstituteController.getInstituteById);

module.exports = router;