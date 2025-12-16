import axios from './axios.config';

export const bookingService = {
  // Create booking
  createBooking: async (bookingData) => {
    const response = await axios.post('/bookings', bookingData);
    return response.data;
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    const response = await axios.get(`/bookings/user/${userId}`);
    return response.data;
  },

  // Get worker bookings
  getWorkerBookings: async (workerId) => {
    const response = await axios.get(`/bookings/worker/${workerId}`);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    const response = await axios.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    const response = await axios.delete(`/bookings/${bookingId}`);
    return response.data;
  },
};