const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Send a new message
router.post('/', async (req, res) => {
    const { conversation_id, sender_id, message_content } = req.body;

    try {
        // Create a new message in the database
        const newMessage = await prisma.chat_messages.create({
            data: {
                conversation_id: parseInt(conversation_id),
                sender_id: parseInt(sender_id),
                message_content,
            },
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get messages for a specific conversation
router.get('/:conversation_id', async (req, res) => {
    const { conversation_id } = req.params;

    try {
        // Fetch messages for the specified conversation
        const messages = await prisma.chat_messages.findMany({
            where: { conversation_id: parseInt(conversation_id) },
            orderBy: { sent_at: 'asc' }, // Order by sent time
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Update read status of messages
router.patch('/read/:conversation_id', async (req, res) => {
    const { conversation_id } = req.params;
    const { userId } = req.body; // Assuming you send the user ID who read the messages

    try {
        // Update the read status of all unread messages in the conversation
        const updatedMessages = await prisma.chat_messages.updateMany({
            where: {
                conversation_id: parseInt(conversation_id),
                is_read: false,
                sender_id: { not: parseInt(userId) }, // Only update messages not sent by the user
            },
            data: {
                is_read: true,
            },
        });

        res.json({ updatedCount: updatedMessages.count });
    } catch (error) {
        console.error('Error updating read status:', error);
        res.status(500).json({ error: 'Failed to update read status' });
    }
});

module.exports = router;