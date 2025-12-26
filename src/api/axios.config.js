import axios from 'axios';

// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Normalize base URL: ensure it ends with /api so callers can use paths like '/auth/register' or '/workers'
const normalizeBaseUrl = (url) => {
  if (!url) return url;
  // Trim trailing slashes
  const trimmed = url.replace(/\/+$/g, '');
  if (trimmed.endsWith('/api')) return trimmed;
  return `${trimmed}/api`;
};

const BASE_URL = normalizeBaseUrl(API_BASE_URL);
if (API_BASE_URL && !API_BASE_URL.endsWith('/api')) {
  // Helpful warning in development when env is set incorrectly
  // eslint-disable-next-line no-console
  console.warn(`VITE_API_BASE_URL does not end with '/api'. Using '${BASE_URL}' as baseURL.`);
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;