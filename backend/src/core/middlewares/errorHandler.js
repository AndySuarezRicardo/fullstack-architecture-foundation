import logger from '../utils/logger.js';
import { AppError } from '../errors/index.js';

export const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Log error
  if (err.isOperational) {
    logger.warn(`Operational error: ${message}`);
  } else {
    logger.error(`Error: ${err.stack}`);
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        timestamp: err.timestamp,
      }),
    },
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};
