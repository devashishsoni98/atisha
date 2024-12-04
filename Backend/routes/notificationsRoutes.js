const express = require('express');
const router = require('express').Router();
const NotificationController = require('../controllers/NotificationsController');

//Route to send a notification
//End point: /api/notifications/send
router.post('/send', NotificationController.sendNotification);

//Route to get notifications by recipient ID
//End point: /api/notifications/:recipient_id
router.get('/:recipient_id', NotificationController.getNotificationsByRecipientId);

//Route to mark a notification as read
//End point: /api/notifications/:notification_id/mark-as-read
router.post('/:notification_id/mark-as-read', NotificationController.markNotificationAsRead);

//Route to delete a notification
//End point: /api/notifications/:notification_id
router.delete('/:notification_id', NotificationController.deleteNotification);

module.exports = router;


