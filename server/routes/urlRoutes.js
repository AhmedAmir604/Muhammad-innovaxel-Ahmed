const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateUrl,
  deleteUrl,
  getUrlStats
} = require('../controllers/urlController');

// POST /shorten - Create short URL
router.post('/shorten', createShortUrl);

// GET /shorten/:shortCode - Get original URL (and increment access count)
router.get('/shorten/:shortCode', getOriginalUrl);

// PUT /shorten/:shortCode - Update URL
router.put('/shorten/:shortCode', updateUrl);

// DELETE /shorten/:shortCode - Delete URL
router.delete('/shorten/:shortCode', deleteUrl);

// GET /shorten/:shortCode/stats - Get URL statistics
router.get('/shorten/:shortCode/stats', getUrlStats);

module.exports = router; 