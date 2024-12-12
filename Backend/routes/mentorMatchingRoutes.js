const express = require('express');
const router = express.Router();
const { getMentorMatching } = require('../controllers/mentorMatchingController');


router.get('/:id', getMentorMatching);

module.exports = router;
