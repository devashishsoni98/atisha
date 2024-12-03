// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const useSocket = ({
//   currentUserId,
//   otherUserId,
//   conversationId,
//   onMessageReceived,
//   onTypingStart,
//   onTypingStop,
// }) => {
//   const [socket, setSocket] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:4000', {
//       query: { userId: currentUserId },
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     newSocket.on('connect', () => {
//       newSocket.emit('register_user', currentUserId);
//     });

//     newSocket.on('connect_error', () => {
//       setError('Unable to connect to chat server');
//     });

//     newSocket.on('receive_message', (message) => {
//       if (message.conversation_id === conversationId) {
//         onMessageReceived(message);
//       }
//     });

//     newSocket.on('typing', ({ sender_id }) => {
//       if (sender_id === otherUserId) {
//         onTypingStart();
//       }
//     });

//     newSocket.on('stop_typing', ({ sender_id }) => {
//       if (sender_id === otherUserId) {
//         onTypingStop();
//       }
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, [currentUserId, otherUserId, conversationId]);

//   return { socket, error };
// };

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000'); // Replace with your server URL

    // Register the user ID with the server
    if (userId) {
      socket.emit('registerUser', userId);
    }

    // Listen for incoming notifications
    socket.on('notification', (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return notifications;
};

export default useSocket;
