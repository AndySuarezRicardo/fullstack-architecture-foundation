import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './core/config/index.js';
import logger from './core/utils/logger.js';
import { errorHandler, notFoundHandler, requestLogger } from './core/middlewares/index.js';
import routes from './routes/index.js';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors(config.cors));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// API routes
app.use(`${config.api.prefix}/${config.api.version}`, routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
