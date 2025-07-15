const Url = require('../models/Url');
const { generateUniqueShortCode } = require('../utils/shortCodeGenerator');

// Create short URL
const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    // Check if URL already exists
    const existingUrl = await Url.findOne({ url });
    if (existingUrl) {
      return res.status(200).json({
        id: existingUrl._id,
        url: existingUrl.url,
        shortCode: existingUrl.shortCode,
        createdAt: existingUrl.createdAt,
        updatedAt: existingUrl.updatedAt
      });
    }

    // Generate unique short code
    const shortCode = await generateUniqueShortCode();

    // Create new URL
    const newUrl = new Url({
      url,
      shortCode
    });

    await newUrl.save();

    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Failed to create short URL' 
    });
  }
};

// Get original URL by short code
const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find URL and increment access count
    const url = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { accessCount: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({
        error: 'URL not found',
        details: 'The short code does not exist'
      });
    }

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    });
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Failed to retrieve URL' 
    });
  }
};

// Update URL
const updateUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;

    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode },
      { url },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({
        error: 'URL not found',
        details: 'The short code does not exist'
      });
    }

    res.status(200).json({
      id: updatedUrl._id,
      url: updatedUrl.url,
      shortCode: updatedUrl.shortCode,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt
    });
  } catch (error) {
    console.error('Error updating URL:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Failed to update URL' 
    });
  }
};

// Delete URL
const deleteUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const deletedUrl = await Url.findOneAndDelete({ shortCode });

    if (!deletedUrl) {
      return res.status(404).json({
        error: 'URL not found',
        details: 'The short code does not exist'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting URL:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Failed to delete URL' 
    });
  }
};

// Get URL statistics
const getUrlStats = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        error: 'URL not found',
        details: 'The short code does not exist'
      });
    }

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      accessCount: url.accessCount
    });
  } catch (error) {
    console.error('Error retrieving URL stats:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Failed to retrieve URL statistics' 
    });
  }
};

module.exports = {
  createShortUrl,
  getOriginalUrl,
  updateUrl,
  deleteUrl,
  getUrlStats
}; 