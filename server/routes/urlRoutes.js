const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateUrl,
  deleteUrl,
  getUrlStats
} = require('../controllers/urlController');
const { validateUrl, validateShortCode } = require('../middleware/validation');

// POST /shorten - Create short URL
router.post('/shorten', validateUrl, createShortUrl);

// GET /shorten/:shortCode - Get original URL (and increment access count)
router.get('/shorten/:shortCode', validateShortCode, getOriginalUrl);

// PUT /shorten/:shortCode - Update URL
router.put('/shorten/:shortCode', validateShortCode, validateUrl, updateUrl);

// DELETE /shorten/:shortCode - Delete URL
router.delete('/shorten/:shortCode', validateShortCode, deleteUrl);

// GET /shorten/:shortCode/stats - Get URL statistics
router.get('/shorten/:shortCode/stats', validateShortCode, getUrlStats);

module.exports = router; 