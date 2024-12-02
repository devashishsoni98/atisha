const express = require('express');
const router = express.Router();
const studentTraitsController = require('../controllers/studentTraitsController');

// GET route for getting all student traits
// End point: /api/student-traits
router.get('/', studentTraitsController.getStudentTraits);

// GET route for getting student trait by user ID
// End point: /api/student-traits/:userId
router.get('/:userId', studentTraitsController.getStudentTraitByUserId);


module.exports = router;