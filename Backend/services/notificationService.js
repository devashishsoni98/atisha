const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const sendNotification = async (recipient_id, content, link,  category) => {
    console.log(recipient_id);
    
    try {
        console.log({ recipient_id, content, link, category });
        const recipient = await prisma.users.findUnique({
            where: {
                id: recipient_id
            }
        });
        if (!recipient) {
            throw new Error('Recipient not found');
        }

        const notification = await prisma.notifications.create({
            data: {
                recipient_id,
                content,
                link,
                category
            }
        });
        return notification;
    }
    catch
        (error)
        {
            console.error('Error sending notification:', error);
            throw error;
        }
}

const getNotificationsByRecipientId = async (recipient_id) => {
    try {
        const notifications = await prisma.notifications.findMany({
            where: {
                recipient_id: parseInt(recipient_id),
                is_read: false
            }
        });
        return notifications;
    } catch (error) {
        console.log("error:",error);
        
        console.error('Error fetching notifications:', error);
        
    }
}

const markNotificationAsRead = async (notification_id) => {
    try {
        const notification = await prisma.notifications.update({
            where: {
                id: parseInt(notification_id)
            },
            data: {
                is_read: true
            }
        });
        return notification;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
}

const deleteNotification = async (notification_id) => {
    try {
        const notification = await prisma.notifications.delete({
            where: {
                id: parseInt(notification_id)
            }
        });
        return notification;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}

module.exports = {
    sendNotification,
    getNotificationsByRecipientId,
    markNotificationAsRead,
    deleteNotification
};