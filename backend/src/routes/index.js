import express from 'express';
import healthRoutes from './health.js';
import usersRoutes from '../modules/users/users.routes.js';

const router = express.Router();

// Health check
router.use(healthRoutes);

// Users module
router.use('/users', usersRoutes);

// Placeholder for future module routes
// router.use('/auth', authRoutes);
// router.use('/agencies', agenciesRoutes);

export default router;
