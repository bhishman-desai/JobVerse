import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Notification from '../model/notification.js'; 

let io;
const userSocketMap = new Map();

const initializeSocket = (server) => {
  if (io) {
    console.log('Socket.io already initialized');
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      socket.userId = decoded.userId; // Attach userId to socket instance
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    const userId = socket.userId;

    // Map userId to socketId
    userSocketMap.set(userId, socket.id);

    // Join a room with userId as the room name
    socket.join(userId);
    console.log(`User ${userId} joined room`);

    socket.on('disconnect', () => {
      console.log('User disconnected');
      userSocketMap.delete(userId); // Remove mapping when the user disconnects
    });
  });

  return io;
};

const sendNotification = async (userId, message) => {
  try {
    // Get the socketId for the userId
    const socketId = userSocketMap.get(userId);
    if (socketId) {
      // Emit the notification to the user's socketId
      io.to(socketId).emit('notification', { message, createdAt: new Date() });
    } else {
      console.error(`No socket found for user ${userId}`);
    }

    // Save the notification in the database
    const newNotification = new Notification({ userId, message });
    await newNotification.save();
    console.log(`Notification sent to user ${userId}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export { initializeSocket, sendNotification };
