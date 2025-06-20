const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const disasterRoutes = require('./routes/disasterRoutes');
const geocodeRoutes = require('./routes/geocodeRoutes');
const verifyImageRoutes = require('./routes/verifyImageRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const { loggingMiddleware } = require('./middleware/logging');
const { errorHandler } = require('./middleware/errorHandler');
const { initSockets } = require('./sockets');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggingMiddleware);

// Rate Limiting (100 reqs/15min per IP)
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// API Routes
app.use('/api/disasters', disasterRoutes(io));
app.use('/api/geocode', geocodeRoutes);
app.use('/api/verify-image', verifyImageRoutes);
app.use('/api/social-media', socialMediaRoutes(io));
app.use('/api/resources', resourceRoutes);

// Error Handler
app.use(errorHandler);

// Socket.IO
initSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 