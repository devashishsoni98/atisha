const express = require('express');
const router = express.Router();
const pushNotificationsController = require('../controllers/pushNotificationsController');

// Route to create a new notification
// End point
router.post('/', pushNotificationsController.createPushNotification);

// Route to get all notifications
router.get('/', pushNotificationsController.getAllNotifications);

// Route to mark a notification as read
router.put('/:id', pushNotificationsController.markAsRead);


module.exports = router;