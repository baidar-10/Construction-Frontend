import axios from './axios.config';

export const workerService = {
  // Get all workers
  getAllWorkers: async (filters = {}) => {
    // Remove empty or undefined filters so they don't produce query params like skill=
    const params = Object.fromEntries(
      Object.entries(filters || {}).filter(([, value]) => value !== undefined && value !== null && value !== "")
    );
    const response = await axios.get('/workers', { params });
    return response.data.workers || [];
  },

  // Get worker by ID
  getWorkerById: async (workerId) => {
    const response = await axios.get(`/workers/${workerId}`);
    return response.data.worker;
  },

  // Search workers
  searchWorkers: async (searchQuery) => {
    const response = await axios.get('/workers/search', {
      params: { q: searchQuery },
    });
    return response.data.workers || [];
  },

  // Filter workers by skill
  filterBySkill: async (skill) => {
    const response = await axios.get('/workers/filter', {
      params: { skill },
    });
    return response.data.workers || [];
  },

  // Get worker reviews
  getWorkerReviews: async (workerId) => {
    const response = await axios.get(`/workers/${workerId}/reviews`);
    return response.data;
  },

  // Add worker review
  addReview: async (workerId, reviewData) => {
    const response = await axios.post(`/workers/${workerId}/reviews`, reviewData);
    return response.data;
  },
};