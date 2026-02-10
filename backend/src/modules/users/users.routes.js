import express from 'express';
import usersController from './users.controller.js';

const router = express.Router();

/**
 * @route   POST /api/v1/users
 * @desc    Create a new user
 * @access  Public (will be protected later with auth middleware)
 */
router.post('/', usersController.createUser.bind(usersController));

/**
 * @route   GET /api/v1/users
 * @desc    Get all users with pagination
 * @access  Public (will be protected later with auth middleware)
 * @query   page, limit, role, isActive
 */
router.get('/', usersController.getAllUsers.bind(usersController));

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Public (will be protected later with auth middleware)
 */
router.get('/:id', usersController.getUserById.bind(usersController));

/**
 * @route   PATCH /api/v1/users/:id
 * @desc    Update user
 * @access  Public (will be protected later with auth middleware)
 */
router.patch('/:id', usersController.updateUser.bind(usersController));

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Deactivate user (soft delete)
 * @access  Public (will be protected later with auth middleware)
 */
router.delete('/:id', usersController.deleteUser.bind(usersController));

export default router;
