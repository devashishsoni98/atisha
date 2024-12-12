// Events for Landing Page

const express = require('express');
const router = express.Router();
const {
    fetchUpcomingEvents,
    fetchCompletedEvents,
    fetchEventById,
    fetchEventRequestByCounselorId,
    fetchAcceptedEventByCounselorId,
    fetchEventsForTomorrowAndToday,
    fetchAllEvent,
    fetchUpcomingEventOfToday
} = require('../controllers/eventsController');

// Route to fetch upcoming events
//END POINT: GET /api/events/upcoming
router.get('/upcoming', fetchUpcomingEvents);

// Route to fetch completed events
//END POINT: GET /api/events/completed
router.get('/completed', fetchCompletedEvents);

// Route to fetch event by Id
//END POINT: GET /api/events/:id
router.get('/:id', fetchEventById);

// Route to fetch event request by counselor id
//END POINT: GET /api/events/event-request/:id
router.get('/event-request/:id', fetchEventRequestByCounselorId);

// Route to fetch accepted event by counselor id
//END POINT: GET /api/events/accepted-event/:id
router.get('/accepted-event/:id', fetchAcceptedEventByCounselorId);

// Route to fetch events for tomorrow and today
//END POINT: GET /api/events/events-for-tomorrow-and-today
router.get('/events-for-tomorrow-and-today/all', fetchEventsForTomorrowAndToday);

// Route to fetch upcoming event of today
//END POINT: GET /api/events/upcoming-event-of-today
router.get('/upcoming-event-of-today', fetchUpcomingEventOfToday);

// Route to fetch all events
//  End po
router.get('/all/admin', fetchAllEvent);

module.exports = router;
