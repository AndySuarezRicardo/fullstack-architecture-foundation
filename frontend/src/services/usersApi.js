import { apiService } from './api';

export const usersApi = {
  /**
   * Get all users with pagination
   */
  getAllUsers: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.role) queryParams.append('role', params.role);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);

    const url = `/users${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return await apiService.get(url);
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId) => {
    return await apiService.get(`/users/${userId}`);
  },

  /**
   * Create a new user
   */
  createUser: async (userData) => {
    return await apiService.post('/users', userData);
  },

  /**
   * Update user
   */
  updateUser: async (userId, userData) => {
    return await apiService.patch(`/users/${userId}`, userData);
  },

  /**
   * Delete user (soft delete)
   */
  deleteUser: async (userId) => {
    return await apiService.delete(`/users/${userId}`);
  },
};

export default usersApi;
