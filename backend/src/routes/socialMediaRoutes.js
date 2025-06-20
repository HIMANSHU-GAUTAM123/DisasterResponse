const express = require('express');
const { getMockFeed } = require('../services/socialMediaService');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const feed = await getMockFeed();
      res.json(feed);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch social feed' });
    }
  });

  return router;
}; 