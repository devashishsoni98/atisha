const express = require('express');
const router = express.Router();
const {
   setMentorAvailability,
    getMentorAvailability,
    bookMentorSlot,
    getMentorSlot
} = require('../controllers/mentorBookingControllers');

// Route to set mentor availability
// End point: /api/mentor-booking/set_availability
router.post('/set_availability', setMentorAvailability);

// Route to get mentor availability
// End point: /api/mentor-booking/get_availability/:mentor_id
router.get('/get_availability/:mentor_id', getMentorAvailability);

// Route to book a mentor slot
// End point: /api/mentor-booking/book_slot
router.post('/book_slot', bookMentorSlot);

// Route to get mentor slot
    // End point: /api/mentor-booking/get_slot/:booking_id
router.get('/get_slot/:booking_id', getMentorSlot);

module.exports = router;