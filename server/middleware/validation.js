const Joi = require('joi');

// URL validation schema
const urlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.uri': 'Please provide a valid URL with http or https protocol',
      'any.required': 'URL is required'
    })
});

// Validate URL creation/update
const validateUrl = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details[0].message
    });
  }
  
  next();
};

// Validate short code parameter
const validateShortCode = (req, res, next) => {
  const { shortCode } = req.params;
  
  if (!shortCode || shortCode.length < 6 || shortCode.length > 10) {
    return res.status(400).json({
      error: 'Invalid short code',
      details: 'Short code must be between 6 and 10 characters'
    });
  }
  
  next();
};

module.exports = {
  validateUrl,
  validateShortCode
}; 