import axios from './axios.config';

export const customerService = {
  // Get customer profile
  getCustomerProfile: async (customerId) => {
    const response = await axios.get(`/customers/${customerId}`);
    return response.data;
  },

  // Update customer profile
  updateCustomerProfile: async (customerId, profileData) => {
    const response = await axios.put(`/customers/${customerId}`, profileData);
    return response.data;
  },

  // Get customer bookings history
  getBookingHistory: async (customerId) => {
    const response = await axios.get(`/customers/${customerId}/bookings`);
    return response.data;
  },

  // Get favorite workers
  getFavoriteWorkers: async (customerId) => {
    const response = await axios.get(`/customers/${customerId}/favorites`);
    return response.data;
  },

  // Add worker to favorites
  addFavoriteWorker: async (customerId, workerId) => {
    const response = await axios.post(`/customers/${customerId}/favorites`, { workerId });
    return response.data;
  },

  // Remove worker from favorites
  removeFavoriteWorker: async (customerId, workerId) => {
    const response = await axios.delete(`/customers/${customerId}/favorites/${workerId}`);
    return response.data;
  },
};