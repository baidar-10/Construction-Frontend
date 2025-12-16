import axios from './axios.config';

export const workerService = {
  // Get all workers
  getAllWorkers: async (filters = {}) => {
    const response = await axios.get('/workers', { params: filters });
    return response.data;
  },

  // Get worker by ID
  getWorkerById: async (workerId) => {
    const response = await axios.get(`/workers/${workerId}`);
    return response.data;
  },

  // Search workers
  searchWorkers: async (searchQuery) => {
    const response = await axios.get('/workers/search', {
      params: { q: searchQuery },
    });
    return response.data;
  },

  // Filter workers by skill
  filterBySkill: async (skill) => {
    const response = await axios.get('/workers/filter', {
      params: { skill },
    });
    return response.data;
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