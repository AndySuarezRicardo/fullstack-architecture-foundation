import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3001,
  host: process.env.HOST || 'localhost',

  api: {
    version: process.env.API_VERSION || 'v1',
    prefix: process.env.API_PREFIX || '/api',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log',
  },

  // Placeholder for future configurations
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
};

export default config;
