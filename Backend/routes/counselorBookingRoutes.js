const express = require('express');
const {
    setAvailability,
    getAvailability,
    bookSlot,
    updateBookingStatus,
    completeBooking,
    getCounselorBookingsForApproval,
    getCounselorBookingsForStarting,
    getCounselorBookingsForCompletion,
    getBookingByStudentId

} = require('../controllers/counselorBookingController');

const router = express.Router();

// Routes for counselor booking operations
// End point: /api/counselor-booking/set_availability
router.post('/set_availability', setAvailability);

// Route to get availability slots for a counselor
// End point: /api/counselor-booking/get_availability/:counselor_id
router.get('/get_availability/:counselor_id', getAvailability);

// Routes for booking operations
// End point: /api/counselor-booking/book_slot
router.post('/book_slot', bookSlot);

// Routes for updating booking status and completion
// End point: /api/counselor-booking/update_booking_status
router.post('/update_booking_status', updateBookingStatus);

// Route to complete a booking
// End point: /api/counselor-booking/complete_booking
router.post('/complete_booking', completeBooking);

// Route to get bookings for approval
// End point: /api/counselor-booking/get_bookings_for_approval/:counselor_id
router.get('/get_bookings_for_approval/:counselor_id', getCounselorBookingsForApproval);

// Route to get bookings for starting
// End point: /api/counselor-booking/get_bookings_for_starting/:counselor_id
router.get('/get_bookings_for_starting/:counselor_id', getCounselorBookingsForStarting);

// Route to get bookings for completion
// End point: /api/counselor-booking/get_bookings_for_completion/:counselor_id
router.get('/get_bookings_for_completion/:counselor_id', getCounselorBookingsForCompletion);

// Route to get bookings for a student
// End point: /api/counselor-booking/get_bookings_for_student/:student_id
router.get('/get_bookings_for_student/:student_id', getBookingByStudentId);


module.exports = router;
