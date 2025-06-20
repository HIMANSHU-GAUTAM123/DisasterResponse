const express = require('express');
const { geocodeLocation, reverseGeocode } = require('../services/geocodingService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { locationName } = req.body;
  try {
    const result = await geocodeLocation(locationName);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

router.post('/reverse', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const result = await reverseGeocode(lat, lng);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Reverse geocoding failed' });
  }
});

module.exports = router; 