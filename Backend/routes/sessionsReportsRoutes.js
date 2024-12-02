const express = require('express');
const {
    createSessionReport,
    getSessionReports,
    getSessionReportById,
    updateSessionReport,
    deleteSessionReport,
    getSessionReportByMentorId,
    getSessionReportByStudentId,
    getSessionReportByCounselorId,
    getSessionByCounselorBookingId
} = require('../controllers/sessionsReportsController');

const router = express.Router();

// Create a new session report
// End point: /api/session-reports
router.post('/', createSessionReport);

// Get all session reports
/// End point: /api/session-reports
router.get('/', getSessionReports);

// Get a specific session report by ID
// End point: /api/session-reports/:id
router.get('/:id', getSessionReportById);

// Update a session report by ID
// End point: /api/session-reports/:id
router.put('/:id', updateSessionReport);

// Delete a session report by ID
// End point: /api/session-reports/:id
router.delete('/:id', deleteSessionReport);

// Get session reports by mentor ID
// End point: /api/session-reports/mentor/:mentor_id
router.get('/mentor/:mentor_id', getSessionReportByMentorId);

// Get session reports by student ID
// End point: /api/session-reports/student/:student_id
router.get('/student/:student_id', getSessionReportByStudentId);

// Get session reports by counselor ID
// End point: /api/session-reports/counselor/:counselor_id
router.get('/counselor/:counselor_id', getSessionReportByCounselorId);

// Get session reports by counselor booking ID
// End point: /api/session-reports/counselor-booking/:booking_id
router.get('/counselor-booking/:booking_id', getSessionByCounselorBookingId);


module.exports = router;