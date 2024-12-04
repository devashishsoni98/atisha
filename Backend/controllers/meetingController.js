// const axios = require('axios');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.createMeeting = async (req, res) => {
//     try {
//         const { user_id, title, start, duration, agenda } = req.body;

//         // Validate request fields
//         if (!start || !duration) {
//             return res.status(400).json({ error: 'Start time and duration are required' });
//         }

//         // Calculate the end time
//         const startTime = new Date(start);
//         const endTime = new Date(startTime.getTime() + duration * 60000); // Convert minutes to milliseconds

//         // Retrieve access token from the database
//         const tokenData = await prisma.webex_tokens.findUnique({
//             where: {
//                 user_id: user_id,
//             },
//         });

//         if (!tokenData) {
//             return res.status(404).json({ error: 'Access token not found for this user' });
//         }

//         const accessToken = tokenData.access_token;

//         // Meeting data
//         const meetingData = {
//             title: title || 'Default Meeting Title',
//             start: startTime.toISOString(),
//             end: endTime.toISOString(),
//             agenda: agenda || 'No agenda provided',
//         };

//         console.log('Meeting Data Sent to Webex:', meetingData);

//         // Send request to Webex API
//         const response = await axios.post(
//             'https://webexapis.com/v1/meetings',
//             meetingData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         res.status(200).json({
//             message: 'Meeting created successfully',
//             meeting: response.data,
//         });
//     } catch (error) {
//         console.error('Error creating Webex meeting:', error.response?.data || error.message);
//         res.status(500).json({
//             error: 'Failed to create Webex meeting',
//             details: error.response?.data || error.message,
//         });
//     }
// };


const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const refreshAccessToken = async (user_id, refresh_token) => {
    try {
        const response = await axios.post('https://webexapis.com/v1/access_token', {
            grant_type: 'refresh_token',
            client_id: process.env.WEBEX_CLIENT_ID, // Replace with your Webex Client ID
            client_secret: process.env.WEBEX_CLIENT_SECRET, // Replace with your Webex Client Secret
            refresh_token,
        });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        // Update the tokens in the database
        await prisma.webex_tokens.update({
            where: { user_id },
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            },
        });

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing Webex access token:', error.response?.data || error.message);
        throw new Error('Failed to refresh Webex access token');
    }
};

exports.createMeeting = async (req, res) => {
    try {
        const { user_id, title, start, duration, agenda } = req.body;
        console.log("API called")
        // Validate request fields
        if (!start || !duration) {
            return res.status(400).json({ error: 'Start time and duration are required' });
        }

        // Retrieve tokens for the user
        const tokenData = await prisma.webex_tokens.findUnique({
            where: { user_id },
        });

        if (!tokenData) {
            return res.status(404).json({
                error: 'No access token found for the user. Please authorize Webex integration.',
            });
        }

        const { access_token: accessToken, refresh_token: refreshToken } = tokenData;

        // Check if access token is valid
        if (!accessToken) {
            return res.status(400).json({
                error: 'Invalid access token. Please reauthorize Webex integration.',
            });
        }

        // Calculate meeting times
        const startTime = new Date(start);
        const endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration to milliseconds

        const meetingData = {
            title: title || 'Default Meeting Title',
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            agenda: agenda || 'No agenda provided',
        };

        try {
            // Attempt to create the meeting
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
            // Handle token expiration
            if (error.response?.status === 401) {
                console.warn('Access token expired, attempting to refresh');

                // Refresh the access token
                const newAccessToken = await refreshAccessToken(user_id, refreshToken);

                // Retry creating the meeting
                const retryResponse = await axios.post(
                    'https://webexapis.com/v1/meetings',
                    meetingData,
                    {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                res.status(200).json({
                    message: 'Meeting created successfully after token refresh',
                    meeting: retryResponse.data,
                });
            } else {
                console.error('Error creating Webex meeting:', error.response?.data || error.message);
                res.status(500).json({
                    error: 'Failed to create Webex meeting',
                    details: error.response?.data || error.message,
                });
            }
        }
    } catch (error) {
        console.error('Error in createMeeting function:', error.message);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};
