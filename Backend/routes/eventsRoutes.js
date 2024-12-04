// Events for Landing Page

const express = require('express');
const router = express.Router();
const { fetchUpcomingEvents, fetchCompletedEvents, fetchEventById, fetchEventRequestByCounselorId, fetchAcceptedEventByCounselorId} = require('../controllers/eventsController');

// Route to fetch upcoming events
//END POINT: GET /api/events/upcoming
router.get('/upcoming', fetchUpcomingEvents);

// Route to fetch completed events
//END POINT: GET /api/events/completed
router.get('/completed', fetchCompletedEvents);

// Route to fetch event by Id
//END POINT: GET /api/events/:id
router.get('/:id', fetchEventById );

// Route to fetch event request by counselor id
//END POINT: GET /api/events/event-request/:id
router.get('/event-request/:id', fetchEventRequestByCounselorId);

// Route to fetch accepted event by counselor id
//END POINT: GET /api/events/accepted-event/:id
router.get('/accepted-event/:id', fetchAcceptedEventByCounselorId);

module.exports = router;
