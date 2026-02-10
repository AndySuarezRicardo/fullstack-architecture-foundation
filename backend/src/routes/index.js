import express from 'express';
import healthRoutes from './health.js';

const router = express.Router();

// Register routes
router.use(healthRoutes);

// Placeholder for future module routes
// router.use('/auth', authRoutes);
// router.use('/users', usersRoutes);

export default router;
