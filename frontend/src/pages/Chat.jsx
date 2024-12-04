// Example usage in an existing component

import {useSelector} from "react-redux";
import { Chat } from "../components/chat/Chat";


export default function SomeComponent() {
    const userId = useSelector(state => state.user.id || localStorage.getItem('userId'));
    console.log(userId);
    
    const counselorId = userId=== "3" ? 2: 3; // Get counselor's ID

    return (
        <div>
            {/* Other components */}
            <Chat currentUserId={userId} otherUserId={counselorId} userType={``} />
        </div>
    );
}


// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000'); // Adjust the URL if needed

// const Chat = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [userId, setUserId] = useState('');

//     useEffect(() => {
//         // Listen for incoming messages
//         socket.on('receive_message', (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         // Listen for message sent confirmation
//         socket.on('message_sent_confirmation', (confirmation) => {
//             console.log('Message sent:', confirmation);
//         });

//         // Clean up on unmount
//         return () => {
//             socket.off('receive_message');
//             socket.off('message_sent_confirmation');
//         };
//     }, []);

//     const handleSendMessage = () => {
//         if (message && userId) {
//             const messageData = {
//                 conversation_id: 1, // Replace with actual conversation ID
//                 sender_id: userId,
//                 recipient_id: '1', // Replace with actual recipient ID
//                 message_content: message,
//             };
//             socket.emit('send_message', messageData);
//             setMessage('');
//         }
//     };

//     return (
//         <div>
//             <h2>Chat</h2>
//             <input
//                 type="text"
//                 placeholder="Your User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//             <div>
//                 <h3>Messages:</h3>
//                 <ul>
//                     {messages.map((msg, index) => (
//                         <li key={index}>{msg.message_content} (from {msg.sender.name})</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Chat;