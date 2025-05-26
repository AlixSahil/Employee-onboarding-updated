import { parseErrorMessage } from '../utils/helpers.js';

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = parseErrorMessage(err);
  
  // Determine error type
  let errorType = 'ServerError';
  
  if (err.code === 'ORA-00001') {
    errorType = 'UniqueConstraintViolation';
  } else if (err.code === 'ORA-02291') {
    errorType = 'ForeignKeyConstraintViolation';
  } else if (err.code === 'ORA-01400') {
    errorType = 'NotNullConstraintViolation';
  } else if (err.name === 'ValidationError') {
    errorType = 'ValidationError';
  }
  
  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message,
    type: errorType,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

/**
 * Error handler for async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};