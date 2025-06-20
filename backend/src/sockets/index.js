const { getMockFeed } = require('../services/socialMediaService');

function initSockets(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join rooms for disasters/resources if needed
    socket.on('join:disaster', (disasterId) => {
      socket.join(`disaster:${disasterId}`);
    });
    socket.on('leave:disaster', (disasterId) => {
      socket.leave(`disaster:${disasterId}`);
    });

    // Listen for custom events if needed
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Emit a new mock social feed item every 10 seconds
  let counter = 4;
  setInterval(() => {
    const feed = getMockFeed();
    // Add a new random item
    const newItem = {
      id: Date.now(),
      user: 'LiveUser' + counter,
      text: `Live update #${counter}: Situation evolving.`,
      timestamp: Date.now()
    };
    feed.unshift(newItem);
    io.emit('social:update');
    counter++;
  }, 10000);
}

module.exports = { initSockets }; 