const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMeeting = async (req, res) => {
    try {
        const { user_id, title, start, duration, agenda } = req.body;

        // Validate request fields
        if (!start || !duration) {
            return res.status(400).json({ error: 'Start time and duration are required' });
        }

        // Calculate the end time
        const startTime = new Date(start);
        const endTime = new Date(startTime.getTime() + duration * 60000); // Convert minutes to milliseconds

        // Retrieve access token from the database
        const tokenData = await prisma.webex_tokens.findUnique({
            where: {
                user_id: user_id,
            },
        });

        if (!tokenData) {
            return res.status(404).json({ error: 'Access token not found for this user' });
        }

        const accessToken = tokenData.access_token;

        // Meeting data
        const meetingData = {
            title: title || 'Default Meeting Title',
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            agenda: agenda || 'No agenda provided',
        };

        console.log('Meeting Data Sent to Webex:', meetingData);

        // Send request to Webex API
        const response = await axios.post(
            'https://webexapis.com/v1/meetings',
            meetingData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({
            message: 'Meeting created successfully',
            meeting: response.data,
        });
    } catch (error) {
        console.error('Error creating Webex meeting:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to create Webex meeting',
            details: error.response?.data || error.message,
        });
    }
};
