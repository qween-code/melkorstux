/**
 * API Service
 * Handles all API requests to the backend
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Jobs API
export const jobsAPI = {
  getAll: (params) => api.get('/api/jobs', { params }),
  getById: (id) => api.get(`/api/jobs/${id}`),
  create: (data) => api.post('/api/jobs', data),
  update: (id, data) => api.put(`/api/jobs/${id}`, data),
  delete: (id) => api.delete(`/api/jobs/${id}`),
  getStats: () => api.get('/api/jobs/stats'),
  trackClick: (id, data) => api.post(`/api/jobs/${id}/click`, data),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params) => api.get('/api/analytics/dashboard', { params }),
  getJobAnalytics: (id, params) => api.get(`/api/analytics/jobs/${id}`, { params }),
  getPlatformPerformance: (params) => api.get('/api/analytics/platforms', { params }),
  getConversionFunnel: (params) => api.get('/api/analytics/funnel', { params }),
  getTopContent: (params) => api.get('/api/analytics/top-content', { params }),
  getDailyStats: (params) => api.get('/api/analytics/daily', { params }),
  getRevenueStats: (params) => api.get('/api/analytics/revenue', { params }),
  trackEvent: (data) => api.post('/api/analytics/track', data),
};

// Content API
export const contentAPI = {
  getAll: (params) => api.get('/api/content', { params }),
  getById: (id) => api.get(`/api/content/${id}`),
  create: (data) => api.post('/api/content', data),
  generate: (data) => api.post('/api/content/generate', data),
  update: (id, data) => api.put(`/api/content/${id}`, data),
  delete: (id) => api.delete(`/api/content/${id}`),
  getScheduled: () => api.get('/api/content/scheduled'),
  markAsPosted: (id, data) => api.post(`/api/content/${id}/posted`, data),
  getStats: () => api.get('/api/content/stats'),
};

export default api;
