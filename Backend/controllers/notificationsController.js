const NotificationService = require('../services/notificationService');

const sendNotification = async (req, res) => {
    try {
        const {recipient_id, content, link, category} = req.body;
        console.log({ recipient_id, content, link, category });
        const notification = await NotificationService.sendNotification(recipient_id, content, link, category);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({message: 'Error sending notification'});
    }
};
const getNotificationsByRecipientId = async (req, res) => {
    try {
        const {recipient_id} = req.params;
        const notifications = await NotificationService.getNotificationsByRecipientId(recipient_id);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({message: 'Error fetching notifications'});
    }
};
const markNotificationAsRead = async (req, res) => {
    try {
        const {notification_id} = req.params;
        await NotificationService.markNotificationAsRead(notification_id);
        res.status(200).json({message: 'Notification marked as read'});
    } catch
        (error) {
        res.status(500).json({message: 'Error marking notification as read'});
    }
};
const deleteNotification = async (req, res) => {
    try {
        const {notification_id} = req.params;
        await NotificationService.deleteNotification(notification_id);
        res.status(200).json({message: 'Notification deleted'});
    } catch
        (error) {
        res.status(500).json({message: 'Error deleting notification'});
    }

}

module.exports = {
    sendNotification,
    getNotificationsByRecipientId,
    markNotificationAsRead,
    deleteNotification
};