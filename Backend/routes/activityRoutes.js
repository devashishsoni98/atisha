const express = require('express');
const router = express.Router();
const { createActivity } = require('../controllers/activityController');

router.post('/create', createActivity);

module.exports = router;
