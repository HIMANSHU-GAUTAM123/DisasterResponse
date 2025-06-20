const express = require('express');
const { getNearbyResources } = require('../controllers/resourceController');

const router = express.Router();

router.get('/nearby', getNearbyResources);

module.exports = router; 