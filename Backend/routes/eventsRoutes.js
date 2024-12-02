// Events for Landing Page

const express = require('express');
const router = express.Router();
const { fetchUpcomingEvents, fetchCompletedEvents } = require('../controllers/eventsController');

// Route to fetch upcoming events
//END POINT: GET /api/events/upcoming
router.get('/upcoming', fetchUpcomingEvents);

// Route to fetch completed events
//END POINT: GET /api/events/completed
router.get('/completed', fetchCompletedEvents);

module.exports = router;
