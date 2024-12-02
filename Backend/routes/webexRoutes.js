const express = require('express');
const router = express.Router();
const webexController = require('../controllers/webexController.js'); // Import controller

// Step 1: Redirect to Webex for authorization
router.get('/authorize', webexController.authorize);

// Step 2: Handle Webex redirect and extract the authorization code
router.get('/callback', webexController.handleCallback);

// Step 3: Exchange code for an access token
router.post('/get_access_token', webexController.getAccessToken);

module.exports = router;
