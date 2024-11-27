const express = require('express');
const router = express.Router();
const {
   setMentorAvailability,
    getMentorAvailability,
} = require('../controllers/mentorBookingControllers');

// Route to set mentor availability
// End point: /api/mentor-booking/set_availability
router.post('/set_availability', setMentorAvailability);

// Route to get mentor availability
// End point: /api/mentor-booking/get_availability/:mentor_id
router.get('/get_availability/:mentor_id', getMentorAvailability);

module.exports = router;