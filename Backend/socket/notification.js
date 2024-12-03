const socketIo = require("socket.io");

const initSocket = (server) => {
  // Initialize Socket.IO with CORS support
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", // Frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Map to store connected users (userId -> socketId)
  const users = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Register a user with their userId
    socket.on("registerUser", (userId) => {
      users.set(userId, socket.id); // Map userId to socketId
      console.log(`User registered: ${userId} (Socket ID: ${socket.id})`);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      // Remove the user from the map
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          console.log(`User removed: ${userId}`);
          break;
        }
      }
    });
  });

  /**
   * Send a notification to a specific user
   * @param {string} userId - The ID of the user
   * @param {string} message - The notification message
   */
  const sendNotification = (userId, message) => {
    const socketId = users.get(userId);
    if (socketId) {
      io.to(socketId).emit("notification", { message });
      console.log(`Notification sent to User ${userId}: ${message}`);
    } else {
      console.log(`User ${userId} is not connected.`);
    }
  };

  /**
   * Broadcast a notification to all connected users
   * @param {string} message - The notification message
   */
  const broadcastNotification = (message) => {
    io.emit("notification", { message });
    console.log(`Broadcast notification: ${message}`);
  };

  return { sendNotification, broadcastNotification };
};

module.exports = initSocket;
