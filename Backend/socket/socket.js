// const { Server } = require('socket.io');
// const { PrismaClient } = require('@prisma/client');
//
// class SocketService {
//     constructor() {
//         this.io = null;
//         this.prisma = new PrismaClient();
//         this.onlineUsers = new Map();
//     }
//
//     // Initialize socket server
//     initializeSocket(httpServer) {
//         this.io = new Server(httpServer, {
//             cors: {
//                 origin: ["http://localhost:5173","http://localhost:5174"], // Configure this to your frontend URL
//                 methods: ["GET", "POST"]
//             }
//         });
//
//         this.setupSocketEvents();
//     }
//
//     // Setup socket event listeners
//     setupSocketEvents() {
//         if (!this.io) return;
//
//         this.io.on('connection', (socket) => {
//             console.log('New client connected');
//
//             // User registration
//             socket.on('register_user', (userId) => {
//                 this.onlineUsers.set(userId, socket.id);
//                 console.log(`User ${userId} online`);
//             });
//
//             // Send message
//             socket.on('send_message', async (messageData) => {
//                 try {
//                     // Save message to database
//                     const savedMessage = await this.saveMessage(messageData);
//
//                     // Find recipient's socket
//                     const recipientSocketId = this.onlineUsers.get(messageData.recipient_id);
//
//                     // Broadcast message to recipient if online
//                     if (recipientSocketId && this.io) {
//                         this.io.to(recipientSocketId).emit('receive_message', savedMessage);
//                     }
//
//                     // Confirm message sent to sender
//                     socket.emit('message_sent_confirmation', savedMessage);
//                 } catch (error) {
//                     console.error('Message send error:', error);
//                     socket.emit('message_error', { error: 'Failed to send message' });
//                 }
//             });
//
//             // Typing indicator
//             socket.on('typing', (data) => {
//                 const recipientSocketId = this.onlineUsers.get(data.recipient_id);
//                 if (recipientSocketId) {
//                     socket.to(recipientSocketId).emit('typing', {
//                         sender_id: parseInt(data.sender_id)
//                     });
//                 }
//             });
//
//             // Stop typing
//             socket.on('stop_typing', (data) => {
//                 const recipientSocketId = this.onlineUsers.get(data.recipient_id);
//                 if (recipientSocketId) {
//                     socket.to(recipientSocketId).emit('stop_typing', {
//                         sender_id: parseInt(data.sender_id)
//                     });
//                 }
//             });
//
//             // Disconnect handler
//             socket.on('disconnect', () => {
//                 this.handleDisconnect(socket.id);
//             });
//         });
//     }
//
//     // Save message to database
//     async saveMessage(messageData) {
//         // Save message
//         const savedMessage = await this.prisma.chat_messages.create({
//             data: {
//                 conversation_id: parseInt(messageData.conversation_id),
//                 sender_id: parseInt(messageData.sender_id),
//                 message_content: messageData.message_content
//             },
//             include: {
//                 sender: {
//                     select: {
//                         id: true,
//                         name: true
//                     }
//                 }
//             }
//         });
//
//         // Update conversation's last message
//         await this.prisma.conversations.update({
//             where: { id: messageData.conversation_id },
//             data: {
//                 last_message: messageData.message_content,
//                 last_message_at: new Date()
//             }
//         });
//
//         return savedMessage;
//     }
//
//     // Handle user disconnection
//     handleDisconnect(socketId) {
//         for (let [userId, userSocketId] of this.onlineUsers.entries()) {
//             if (userSocketId === socketId) {
//                 this.onlineUsers.delete(userId);
//                 console.log(`User ${userId} offline`);
//                 break;
//             }
//         }
//     }
//
//     // Get socket instance (for advanced use cases)
//     getIO() {
//         if (!this.io) {
//             throw new Error('Socket.IO not initialized');
//         }
//         return this.io;
//     }
// }
//
// const NotificationService = require('./notificationService');
//
// // Inside your socket event listener
// socket.on('send_message', async (messageData) => {
//     try {
//         const savedMessage = await this.saveMessage(messageData);
//
//         const recipientSocketId = this.onlineUsers.get(messageData.recipient_id);
//
//         // Send a notification to the recipient
//         await NotificationService.sendNotification(messageData.recipient_id, `New message from ${messageData.sender_id}`);
//
//         if (recipientSocketId && this.io) {
//             this.io.to(recipientSocketId).emit('receive_message', savedMessage);
//         }
//
//         socket.emit('message_sent_confirmation', savedMessage);
//     } catch (error) {
//         console.error('Message send error:', error);
//         socket.emit('message_error', { error: 'Failed to send message' });
//     }
// });
//
// module.exports = new SocketService();


const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const NotificationService = require('./notificationService');

const prisma = new PrismaClient();
const onlineUsers = new Map();
let io = null;

// Initialize socket server
function initializeSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],
            methods: ["GET", "POST"]
        }
    });

    setupSocketEvents();
}

// Setup socket event listeners
function setupSocketEvents() {
    if (!io) return;

    io.on('connection', (socket) => {
        console.log('New client connected');

        // User registration
        socket.on('register_user', (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} online`);
        });

        // Send message
        socket.on('send_message', async (messageData) => {
            try {
                const savedMessage = await saveMessage(messageData);

                const recipientSocketId = onlineUsers.get(messageData.recipient_id);

                // Send a notification to the recipient
                await NotificationService.sendNotification(messageData.recipient_id, `New message from ${messageData.sender_id}`);

                // Broadcast message to recipient if online
                if (recipientSocketId && io) {
                    io.to(recipientSocketId).emit('receive_message', savedMessage);
                }

                // Confirm message sent to sender
                socket.emit('message_sent_confirmation', savedMessage);
            } catch (error) {
                console.error('Message send error:', error);
                socket.emit('message_error', { error: 'Failed to send message' });
            }
        });

        // Typing indicator
        socket.on('typing', (data) => {
            const recipientSocketId = onlineUsers.get(data.recipient_id);
            if (recipientSocketId) {
                socket.to(recipientSocketId).emit('typing', {
                    sender_id: parseInt(data.sender_id)
                });
            }
        });

        // Stop typing
        socket.on('stop_typing', (data) => {
            const recipientSocketId = onlineUsers.get(data.recipient_id);
            if (recipientSocketId) {
                socket.to(recipientSocketId).emit('stop_typing', {
                    sender_id: parseInt(data.sender_id)
                });
            }
        });

        // Disconnect handler
        socket.on('disconnect', () => {
            handleDisconnect(socket.id);
        });
    });
}

// Save message to database
async function saveMessage(messageData) {
    const savedMessage = await prisma.chat_messages.create({
        data: {
            conversation_id: parseInt(messageData.conversation_id),
            sender_id: parseInt(messageData.sender_id),
            message_content: messageData.message_content
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    // Update conversation's last message
    await prisma.conversations.update({
        where: { id: messageData.conversation_id },
        data: {
            last_message: messageData.message_content,
            last_message_at: new Date()
        }
    });

    return savedMessage;
}

// Handle user disconnection
function handleDisconnect(socketId) {
    for (let [userId, userSocketId] of onlineUsers.entries()) {
        if (userSocketId === socketId) {
            onlineUsers.delete(userId);
            console.log(`User ${userId} offline`);
            break;
        }
    }
}

// Get socket instance (for advanced use cases)
function getIO() {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
}

module.exports = { initializeSocket, getIO };