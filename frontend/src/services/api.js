import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for adding auth tokens, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API service methods
export const apiService = {
  // Health check
  checkHealth: async () => {
    return await axiosInstance.get('/health');
  },

  // Generic methods for future use
  get: async (url, config) => {
    return await axiosInstance.get(url, config);
  },

  post: async (url, data, config) => {
    return await axiosInstance.post(url, data, config);
  },

  put: async (url, data, config) => {
    return await axiosInstance.put(url, data, config);
  },

  patch: async (url, data, config) => {
    return await axiosInstance.patch(url, data, config);
  },

  delete: async (url, config) => {
    return await axiosInstance.delete(url, config);
  },
};

export default axiosInstance;
