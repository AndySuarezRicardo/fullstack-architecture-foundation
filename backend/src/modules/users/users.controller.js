import usersService from './users.service.js';
import { validateCreateUser } from './dto/create-user.dto.js';
import { validateUpdateUser } from './dto/update-user.dto.js';
import { ValidationError } from '../../core/errors/index.js';
import logger from '../../core/utils/logger.js';

class UsersController {
  /**
   * POST /api/v1/users
   * Create a new user
   */
  async createUser(req, res, next) {
    try {
      // Validate request body
      const { error, value } = validateCreateUser(req.body);

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new ValidationError(errorMessages.join(', '));
      }

      const user = await usersService.createUser(value);

      logger.info(`User created: ${user.id}`);

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/users
   * Get all users with optional filters and pagination
   */
  async getAllUsers(req, res, next) {
    try {
      const { page, limit, role, isActive } = req.query;

      const options = {
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10,
        role,
        isActive: isActive !== undefined ? isActive === 'true' : undefined,
      };

      const result = await usersService.getAllUsers(options);

      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/users/:id
   * Get user by ID
   */
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/v1/users/:id
   * Update user
   */
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      // Validate request body
      const { error, value } = validateUpdateUser(req.body);

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new ValidationError(errorMessages.join(', '));
      }

      const user = await usersService.updateUser(id, value);

      logger.info(`User updated: ${user.id}`);

      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/users/:id
   * Deactivate user (soft delete)
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await usersService.deleteUser(id);

      logger.info(`User deactivated: ${id}`);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
