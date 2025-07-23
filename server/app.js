const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build
// app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.use('/api', urlRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app; 