const express = require('express');
const router = express.Router();
const {
   setMentorAvailability,
    getMentorAvailability,
    bookMentorSlot,
    getMentorSlot,
    updateBookingStatusOfMentor,
    completeMentorBooking,
    getMentorBookingsForApproval,
    getMentorBookingsForStarting,
    getMentorBookingsForCompletion,
    getMentorBookingByStudentId
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

// Route to update booking status of mentor
// End point: /api/mentor-booking/update_booking_status
router.post('/update_booking_status', updateBookingStatusOfMentor);

// Route to complete mentor booking
// End point: /api/mentor-booking/complete_booking
router.post('/complete_booking', completeMentorBooking);

// Route to get mentor bookings for approval
// End point: /api/mentor-booking/get_bookings_for_approval/:mentor_id
router.get('/get_bookings_for_approval/:mentor_id', getMentorBookingsForApproval);

// Route to get bookings for starting
// End point: /api/mentor-booking/get_bookings_for_starting/:mentor_id
router.get('/get_bookings_for_starting/:mentor_id',  getMentorBookingsForStarting   );

// Route to get bookings for completion
// End point: /api/mentor-booking/get_bookings_for_completion/:mentor_id
router.get('/get_bookings_for_completion/:mentor_id', getMentorBookingsForCompletion);

// Route to get bookings for a student
// End point: /api/mentor-booking/get_bookings_for_student/:student_id
router.get('/get_bookings_for_student/:student_id', getMentorBookingByStudentId);

module.exports = router;