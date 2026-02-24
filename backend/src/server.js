const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const fs = require('fs');
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync('server_debug.log', logMessage);
    console.log(logMessage.trim());
    next();
});


// Database Connection
const db = require('./db');

console.log('Attempting to connect to DB...');

const runMigrations = require('./migrations');

db.pool.connect()
    .then(async () => {
        console.log(`Connected to PostgreSQL database`);
        await runMigrations();
    })
    .catch(err => console.error('Database connection error', err.stack));

// Routes
const authRoutes = require('./routes/auth');
const doubtRoutes = require('./routes/doubts');
const courseRoutes = require('./routes/courses');

app.use('/auth', authRoutes);
app.use('/doubts', doubtRoutes);
app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
    res.send('PeerLearn Backend Running');
});

// Start Server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Socket.io Setup
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    // Signaling for WebRTC
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        socket.on('sending-signal', ({ userToSignal, callerID, signal }) => {
            io.to(userToSignal).emit('user-joined', { signal, callerID });
        });

        socket.on('returning-signal', ({ signal, callerID }) => {
            io.to(callerID).emit('receiving-returned-signal', { signal, id: socket.id });
        });

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});
