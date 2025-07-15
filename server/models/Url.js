const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 10
  },
  accessCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
urlSchema.index({ shortCode: 1 });

module.exports = mongoose.model('Url', urlSchema); 