const express = require('express');
const { createDisaster, getDisasters, updateDisaster, deleteDisaster } = require('../controllers/disasterController');
const { requireRole } = require('../middleware/auth');

module.exports = (io) => {
  const router = express.Router();

  // Attach io to req for controller use
  router.use((req, res, next) => { req.io = io; next(); });

  router.get('/', getDisasters);
  router.post('/', requireRole(['admin', 'contributor']), createDisaster);
  router.put('/:id', requireRole(['admin', 'contributor']), updateDisaster);
  router.delete('/:id', requireRole(['admin']), deleteDisaster);

  return router;
}; 