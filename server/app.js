const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// TODO: Add routes here

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API' });
});

module.exports = app; 