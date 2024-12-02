// Events for Landing Page

const express = require('express');
const router = express.Router();
const { fetchUpcomingEvents, fetchCompletedEvents } = require('../controllers/eventsController');

// Route to fetch upcoming events
router.get('/upcoming', fetchUpcomingEvents);

// Route to fetch completed events
router.get('/completed', fetchCompletedEvents);

module.exports = router;
