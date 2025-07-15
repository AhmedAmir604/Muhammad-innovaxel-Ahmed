const Url = require('../models/Url');

// Generate random short code
const generateShortCode = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate unique short code (checks for duplicates)
const generateUniqueShortCode = async (length = 6) => {
  let shortCode;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  while (!isUnique && attempts < maxAttempts) {
    shortCode = generateShortCode(length);
    const existingUrl = await Url.findOne({ shortCode });
    
    if (!existingUrl) {
      isUnique = true;
    } else {
      attempts++;
      // Increase length if too many collisions
      if (attempts >= maxAttempts) {
        return generateUniqueShortCode(length + 1);
      }
    }
  }

  return shortCode;
};

module.exports = {
  generateShortCode,
  generateUniqueShortCode
}; 