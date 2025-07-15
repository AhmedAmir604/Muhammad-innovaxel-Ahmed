// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.join(', ')
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate entry',
      details: 'Short code already exists'
    });
  }

  // Mongoose CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
      details: 'The provided ID is not valid'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// Not found middleware
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Not found',
    details: `Route ${req.originalUrl} not found`
  });
};

module.exports = {
  errorHandler,
  notFound
}; 