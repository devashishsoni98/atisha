const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// POST route to create a new Webex meeting
router.post('/create', meetingController.createMeeting);

module.exports = router;
