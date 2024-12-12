// // Example usage in an existing component
//
// import {useSelector} from "react-redux";
// import { Chat } from "../components/chat/Chat";
//
//
// export default function SessionPreview() {
//     const userId = useSelector(state => state.user.id || localStorage.getItem('userId'));
//     console.log(userId);
//
//     const counselorId = userId=== "3" ? 2: 3; // Get counselor's ID
//
//     return (
//         <div>
//             {/* Other components */}
//             {/* <Chat currentUserId={userId} otherUserId={counselorId} userType={``} /> */}
//
//
//
//
//         </div>
//     );
// }
//
//
// // import React, { useEffect, useState } from 'react';
// // import { io } from 'socket.io-client';
//
// // const socket = io('http://localhost:4000'); // Adjust the URL if needed
//
// // const Chat = () => {
// //     const [message, setMessage] = useState('');
// //     const [messages, setMessages] = useState([]);
// //     const [userId, setUserId] = useState('');
//
// //     useEffect(() => {
// //         // Listen for incoming messages
// //         socket.on('receive_message', (newMessage) => {
// //             setMessages((prevMessages) => [...prevMessages, newMessage]);
// //         });
//
// //         // Listen for message sent confirmation
// //         socket.on('message_sent_confirmation', (confirmation) => {
// //             console.log('Message sent:', confirmation);
// //         });
//
// //         // Clean up on unmount
// //         return () => {
// //             socket.off('receive_message');
// //             socket.off('message_sent_confirmation');
// //         };
// //     }, []);
//
// //     const handleSendMessage = () => {
// //         if (message && userId) {
// //             const messageData = {
// //                 conversation_id: 1, // Replace with actual conversation ID
// //                 sender_id: userId,
// //                 recipient_id: '1', // Replace with actual recipient ID
// //                 message_content: message,
// //             };
// //             socket.emit('send_message', messageData);
// //             setMessage('');
// //         }
// //     };
//
// //     return (
// //         <div>
// //             <h2>Chat</h2>
// //             <input
// //                 type="text"
// //                 placeholder="Your User ID"
// //                 value={userId}
// //                 onChange={(e) => setUserId(e.target.value)}
// //             />
// //             <input
// //                 type="text"
// //                 placeholder="Type a message"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //             />
// //             <button onClick={handleSendMessage}>Send</button>
// //             <div>
// //                 <h3>Messages:</h3>
// //                 <ul>
// //                     {messages.map((msg, index) => (
// //                         <li key={index}>{msg.message_content} (from {msg.sender.name})</li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // };
//
// // export default Chat;


import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SessionBookingPreview = () => {
    const [isJoining, setIsJoining] = useState(false);

    const handleJoin = () => {
        setIsJoining(true);
        // Simulating a delay before redirecting
        setTimeout(() => {
            window.location.href = "https://meeting-link.example.com";
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Counseling Session Preview</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
                >
                    {/* Session Details */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Session Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Date</p>
                                <p className="font-medium">May 15, 2023</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Time</p>
                                <p className="font-medium">2:00 PM - 3:00 PM</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Duration</p>
                                <p className="font-medium">60 minutes</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Session Type</p>
                                <p className="font-medium">Video Call</p>
                            </div>
                        </div>
                    </section>

                    {/* Participant Information */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Participants</h2>
                        <div className="flex items-center space-x-4 mb-4">
                            <img src="https://via.placeholder.com/50" alt="Counselor" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-medium">Dr. Jane Smith</p>
                                <p className="text-sm text-gray-600">Counselor</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/50" alt="Student" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-medium">John Doe</p>
                                <p className="text-sm text-gray-600">Student</p>
                            </div>
                        </div>
                    </section>

                    {/* Join Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleJoin}
                        disabled={isJoining}
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300 ${
                            isJoining ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {isJoining ? 'Joining...' : 'Join Session'}
                    </motion.button>
                </motion.div>
            </main>
        </div>
    );
};

export default SessionBookingPreview;

