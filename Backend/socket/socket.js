const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');

class SocketService {
    constructor() {
        this.io = null;
        this.prisma = new PrismaClient();
        this.onlineUsers = new Map();
    }

    // Initialize socket server
    initializeSocket(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: ["http://localhost:5173","http://localhost:5174"], // Configure this to your frontend URL
                methods: ["GET", "POST"]
            }
        });

        this.setupSocketEvents();
    }

    // Setup socket event listeners
    setupSocketEvents() {
        if (!this.io) return;

        this.io.on('connection', (socket) => {
            console.log('New client connected');

            // User registration
            socket.on('register_user', (userId) => {
                this.onlineUsers.set(userId, socket.id);
                console.log(`User ${userId} online`);
            });

            // Send message
            socket.on('send_message', async (messageData) => {
                try {
                    // Save message to database
                    const savedMessage = await this.saveMessage(messageData);

                    // Find recipient's socket
                    const recipientSocketId = this.onlineUsers.get(messageData.recipient_id);

                    // Broadcast message to recipient if online
                    if (recipientSocketId && this.io) {
                        this.io.to(recipientSocketId).emit('receive_message', savedMessage);
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
                const recipientSocketId = this.onlineUsers.get(data.recipient_id);
                if (recipientSocketId) {
                    socket.to(recipientSocketId).emit('typing', {
                        sender_id: parseInt(data.sender_id)
                    });
                }
            });

            // Stop typing
            socket.on('stop_typing', (data) => {
                const recipientSocketId = this.onlineUsers.get(data.recipient_id);
                if (recipientSocketId) {
                    socket.to(recipientSocketId).emit('stop_typing', {
                        sender_id: parseInt(data.sender_id)
                    });
                }
            });

            // Disconnect handler
            socket.on('disconnect', () => {
                this.handleDisconnect(socket.id);
            });
        });
    }

    // Save message to database
    async saveMessage(messageData) {
        // Save message
        const savedMessage = await this.prisma.chat_messages.create({
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
        await this.prisma.conversations.update({
            where: { id: messageData.conversation_id },
            data: {
                last_message: messageData.message_content,
                last_message_at: new Date()
            }
        });

        return savedMessage;
    }

    // Handle user disconnection
    handleDisconnect(socketId) {
        for (let [userId, userSocketId] of this.onlineUsers.entries()) {
            if (userSocketId === socketId) {
                this.onlineUsers.delete(userId);
                console.log(`User ${userId} offline`);
                break;
            }
        }
    }

    // Get socket instance (for advanced use cases)
    getIO() {
        if (!this.io) {
            throw new Error('Socket.IO not initialized');
        }
        return this.io;
    }
}

module.exports = new SocketService();