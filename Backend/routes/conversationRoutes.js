// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
//
// const router = express.Router();
// const prisma = new PrismaClient();
//
// // Create or get existing conversation
// router.post('/', async (req, res) => {
//     const { user1_id, user2_id } = req.body;
//
//     try {
//         // Check if conversation already exists
//         let conversation = await prisma.conversations.findFirst({
//             where: {
//                 OR: [
//                     { user1_id, user2_id },
//                     { user1_id: user2_id, user2_id: user1_id }
//                 ]
//             }
//         });
//
//         // If no conversation exists, create a new one
//         if (!conversation) {
//             conversation = await prisma.conversations.create({
//                 data: {
//                     user1_id,
//                     user2_id
//                 }
//             });
//         }
//
//         res.json(conversation);
//     } catch (error) {
//         console.log({ error: 'Failed to create/find conversation', error: error.message });
//         res.status(500).json({ error: 'Failed to create/find conversation', error: error.message });
//     }
// });
//
// // Get user conversations
// router.get('/:user_id', async (req, res) => {
//     const { user_id } = req.params;
//
//     try {
//         const conversations = await prisma.conversations.findMany({
//             where: {
//                 OR: [
//                     { user1_id: parseInt(user_id) },
//                     { user2_id: parseInt(user_id) }
//                 ]
//             },
//             include: {
//                 user1: {
//                     select: {
//                         id: true,
//                         name: true
//                     }
//                 },
//                 user2: {
//                     select: {
//                         id: true,
//                         name: true
//                     }
//                 },
//                 _count: {
//                     select: {
//                         chat_messages: {
//                             where: {
//                                 is_read: false
//                             }
//                         }
//                     }
//                 }
//             },
//             orderBy: { last_message_at: 'desc' }
//         });
//
//         // Transform conversations to include the other user's details
//         const transformedConversations = conversations.map(conv => ({
//             ...conv,
//             otherUser: conv.user1_id === parseInt(user_id) ? conv.user2 : conv.user1,
//             unreadCount: conv._count.chat_messages
//         }));
//
//         res.json(transformedConversations);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch conversations' });
//     }
// });
//
// module.exports = router;


const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Create or get existing conversation
router.post('/', async (req, res) => {
    const { user1_id, user2_id } = req.body;

    try {
        // Convert user IDs to integers
        const user1IdInt = parseInt(user1_id, 10);
        const user2IdInt = parseInt(user2_id, 10);

        // Check if conversation already exists
        let conversation = await prisma.conversations.findFirst({
            where: {
                OR: [
                    {
                        user1_id: user1IdInt,
                        user2_id: user2IdInt,
                    },
                    {
                        user1_id: user2IdInt,
                        user2_id: user1IdInt,
                    },
                ],
            },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await prisma.conversations.create({
                data: {
                    user1_id: user1IdInt,
                    user2_id: user2IdInt,
                },
            });
        }

        res.json(conversation);
    } catch (error) {
        console.error('Error creating/finding conversation:', error);

        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'A conversation already exists between these users.' });
        }

        res.status(500).json({ error: 'Failed to create/find conversation' });
    }
});

// Get user conversations
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const userIdInt = parseInt(user_id, 10); // Convert to integer

        const conversations = await prisma.conversations.findMany({
            where: {
                OR: [
                    { user1_id: userIdInt },
                    { user2_id: userIdInt },
                ],
            },
            include: {
                user1: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user2: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        chat_messages: {
                            where: {
                                is_read: false,
                            },
                        },
                    },
                },
            },
            orderBy: { last_message_at: 'desc' },
        });

        // Transform conversations to include the other user's details
        const transformedConversations = conversations.map(conv => ({
            ...conv,
            otherUser: conv.user1_id === userIdInt ? conv.user2 : conv.user1,
            unreadCount: conv._count.chat_messages,
        }));

        res.json(transformedConversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

module.exports = router;