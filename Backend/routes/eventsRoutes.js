// Events for Landing Page

const express = require('express');
const router = express.Router();
const { fetchUpcomingEvents, fetchCompletedEvents, fetchEventById } = require('../controllers/eventsController');

// Route to fetch upcoming events
//END POINT: GET /api/events/upcoming
router.get('/upcoming', fetchUpcomingEvents);

// Route to fetch completed events
//END POINT: GET /api/events/completed
router.get('/completed', fetchCompletedEvents);

// Route to fetch event by Id
//END POINT: GET /api/events/:id
router.get('/:id', fetchEventById );

module.exports = router;
