// // const express = require('express');
// // const router = express.Router();
// // const { createActivity } = require('../controllers/activityController');

// // router.post('/create', createActivity);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { createActivity } = require('../controllers/activityController');

// router.post('/create', createActivity);

// module.exports = router;
// activityRoutes.js
const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController');

// POST route for creating an activity
router.post('/', ActivityController.createActivity);  // Make sure the path is correct

// GET route for fetching all activities
router.get('/', ActivityController.getAllActivities);

// GET route for fetching an activity by ID
router.get('/:id', ActivityController.getActivityById);

module.exports = router;
