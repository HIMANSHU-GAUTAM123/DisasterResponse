const express = require('express');
const { verifyImage } = require('../services/geminiService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const result = await verifyImage(imageUrl);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Image verification failed' });
  }
});

module.exports = router; 