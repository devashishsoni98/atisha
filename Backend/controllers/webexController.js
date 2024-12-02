const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Step 1: Redirect to Webex for authorization
exports.authorize = (req, res) => {
    const WEBEX_AUTH_URL = 'https://webexapis.com/v1/authorize';
    const clientId = process.env.WEBEX_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.WEBEX_REDIRECT_URI);
    const scope = encodeURIComponent(process.env.WEBEX_SCOPE_LIST);
    const state = generateUniqueState(); // Function to generate a unique state
    console.log("SCOPE: ",scope);
    // Check if environment variables are set
    if (!clientId || !redirectUri || !scope) {
        return res.status(500).send('Server configuration error.');
    }

    // Construct the authorization URL
    const authUrl = `${WEBEX_AUTH_URL}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    // Redirect to Webex login page
    res.redirect(authUrl);
};

// Example function to generate a unique state
function generateUniqueState() {
    return Math.random().toString(36).substring(2); // Simple random state generator
}



// Step 2: Handle Webex redirect and extract the code
exports.handleCallback = (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.status(400).json({ error: `Authorization failed: ${error}` });
    }

    res.status(200).json({
        message: "Authorization successful. Use the code below to fetch an access token.",
        code: code,
    });
};

// exports.getAccessToken = async (req, res) => {
//     const { code, user_id } = req.body;

//     try {
//         const response = await axios.post('https://webexapis.com/v1/access_token', {
//             grant_type: 'authorization_code',
//             client_id: process.env.WEBEX_CLIENT_ID,
//             client_secret: process.env.WEBEX_CLIENT_SECRET,
//             code: code,
//             redirect_uri: process.env.WEBEX_REDIRECT_URI
//         });


//         res.status(200).json({
//             access_token: response.data.access_token,
//             refresh_token: response.data.refresh_token,
//             expires_in: response.data.expires_in,
//         });
//     } catch (error) {
//         // Log the full error details for better understanding
//         console.error('Error details:', error.response ? error.response.data : error.message);

//         res.status(500).json({
//             error: 'Failed to get access token',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// };

exports.getAccessToken = async (req, res) => {
    const { code, user_id } = req.body;

    try {
        // Make the request to Webex API to exchange the authorization code for an access token
        const response = await axios.post('https://webexapis.com/v1/access_token', {
            grant_type: 'authorization_code',
            client_id: process.env.WEBEX_CLIENT_ID,
            client_secret: process.env.WEBEX_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.WEBEX_REDIRECT_URI
        });

        console.log(console.data);
        // Extract token details from the Webex response
        const { access_token, refresh_token, expires_in, token_type } = response.data;

        // Save the tokens to the database
        await prisma.webex_tokens.upsert({
            where: { user_id: user_id },
            update: {
                access_token: access_token,
                refresh_token: refresh_token,
                expires_in: expires_in,
                token_type: token_type
            },
            create: {
                user_id: user_id,
                access_token: access_token,
                refresh_token: refresh_token,
                expires_in: expires_in,
                token_type: token_type
            }
        });
        
        // Respond with a success message
        res.status(200).json({
            message: 'Token saved successfully!'
        });

    } catch (error) {
        // Log the full error details for better understanding
        console.error('Error details:', error.response ? error.response.data : error.message);

        // Respond with an error message
        res.status(500).json({
            error: 'Failed to get access token',
            details: error.response ? error.response.data : error.message,
        });
    }
};