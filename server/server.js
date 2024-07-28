/* Author: Bhishman Desai */
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'socket.io';
import connect from './config/dBConnection.js';
import apiRoutes from './router/apiRoutes.js';
import Message from './model/Message.js';
import UserInteraction from './model/UserInteraction.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use('/api', apiRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinChat', async (username) => {
        socket.join(username);
        console.log(`User ${username} joined the chat`);

        const messages = await Message.find({
            $or: [{ senderUsername: username }, { receiverUsername: username }]
        }).sort({ timestamp: 1 });

        socket.emit('chatHistory', messages);

        const userInteraction = await UserInteraction.findOne({ username });
        const interactedUsers = userInteraction ? userInteraction.interactedUsers : [];
        socket.emit('interactedUsers', interactedUsers);
    });

    socket.on('sendMessage', async (message) => {
        console.log('Message received on server:', message);

        const newMessage = new Message(message);
        await newMessage.save();

        await UserInteraction.updateOne(
            { username: message.senderUsername },
            { $addToSet: { interactedUsers: message.receiverUsername } },
            { upsert: true }
        );
        await UserInteraction.updateOne(
            { username: message.receiverUsername },
            { $addToSet: { interactedUsers: message.senderUsername } },
            { upsert: true }
        );

        io.to(message.receiverUsername).emit('receiveMessage', message);
        console.log(`Message sent to ${message.receiverUsername}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = 8080;

connect().then(() => {
    try {
        server.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server.');
    }
}).catch(error => {
    console.log("Invalid database connection!");
});
