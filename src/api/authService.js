import axios from './axios.config';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    // Backend returns { user: { ... } }
    return response.data.user || response.data;
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    const response = await axios.put(`/auth/profile/${userId}`, userData);
    return response.data;
  },

  // Upload avatar image
  uploadAvatar: async (userId, file) => {
    const form = new FormData();
    form.append('avatar', file);
    const response = await axios.post(`/auth/profile/${userId}/avatar`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};