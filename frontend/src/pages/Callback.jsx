import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const [tokenFetched, setTokenFetched] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenFetched) return; // Skip if the token has already been fetched

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code'); // Get 'code' from URL
        const error = urlParams.get('error'); // Handle possible errors

        if (error) {
            alert(`Error: ${urlParams.get('error_description') || error}`);
            return;
        }

        if (code) {
            // Call backend API to exchange the code for an access token
            fetch('http://localhost:4000/api/webex/get_access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, user_id: 12 }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                        if (data.message === 'Token saved successfully!') {
                            setTokenFetched(true); // Mark token as fetched
                            // navigate('/'); // Redirect only after successful token save
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while fetching the access token');
                });
        } else {
            alert('No authorization code found');
        }
    }, [tokenFetched, navigate]); // Include tokenFetched to ensure useEffect runs only once

    return <div>Loading...</div>;
};

export default OAuthCallback;
