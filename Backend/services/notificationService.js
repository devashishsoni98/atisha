const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Sends a notification to a user.
 * @param {string} userId - The ID of the user to send the notification to.
 * @param {string} message - The content of the notification.
 * @returns {Promise<Object>} - The created notification object.
 */
async function sendNotification(userId, message) {
    const notifications = await prisma.notifications.create({
        data: {
            recipientId: userId,
            content: message,
            category: 'message', // You can customize this as needed
            readAt: null, // Default to unread
            createdAt: new Date(),
        },
    });

    // Optional: Emit the notification via socket if needed
    // const socket = getSocketInstance(); // Implement this function to get your socket instance
    // socket.to(userId).emit('new_notification', notification);

    return notifications;
}

/**
 * Retrieves all notifications for a user.
 * @param {string} userId - The ID of the user whose notifications to retrieve.
 * @returns {Promise<Array>} - An array of notifications.
 */
async function getNotifications(userId) {
    return prisma.notifications.findMany({
        where: {recipientId: userId},
        orderBy: {createdAt: 'desc'},
    });
}

/**
 * Marks a specific notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 * @returns {Promise<Object>} - The updated notification object.
 */
async function markAsRead(notificationId) {
    return prisma.notifications.update({
        where: {id: notificationId},
        data: {readAt: new Date()},
    });
}

// Export the functions for use in other parts of your application
module.exports = {
    sendNotification,
    getNotifications,
    markAsRead,
};