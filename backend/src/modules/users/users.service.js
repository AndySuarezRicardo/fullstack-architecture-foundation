import prisma from '../../core/database/prismaClient.js';
import { ConflictError, NotFoundError } from '../../core/errors/index.js';
import bcrypt from 'bcrypt';

class UsersService {
  /**
   * Create a new user
   */
  async createUser(userData) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password (basic implementation - will be improved in auth layer)
    const passwordHash = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role || 'AGENCY',
        isActive: userData.isActive !== undefined ? userData.isActive : true,
      },
    });

    // Remove password from response
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(options = {}) {
    const { page = 1, limit = 10, role, isActive } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(userId, updateData) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundError('User not found');
    }

    // Check email uniqueness if email is being updated
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: updateData.email },
      });

      if (emailExists) {
        throw new ConflictError('User with this email already exists');
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  /**
   * Delete user (soft delete - set isActive to false)
   */
  async deleteUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return { message: 'User deactivated successfully' };
  }
}

export default new UsersService();
