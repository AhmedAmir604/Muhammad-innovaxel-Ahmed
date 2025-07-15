const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', urlRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'URL Shortener API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      'POST /api/shorten': 'Create short URL',
      'GET /api/shorten/:shortCode': 'Get original URL',
      'PUT /api/shorten/:shortCode': 'Update URL',
      'DELETE /api/shorten/:shortCode': 'Delete URL',
      'GET /api/shorten/:shortCode/stats': 'Get URL statistics'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app; 