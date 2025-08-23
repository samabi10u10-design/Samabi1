import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const dietService = {
  // Generate personalized diet plan
  async generateDietPlan() {
    try {
      const response = await api.post('/diet/generate');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate diet plan');
    }
  },

  // Get user's diet plan
  async getDietPlan() {
    try {
      const response = await api.get('/diet/plan');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get diet plan');
    }
  },

  // Update diet plan
  async updateDietPlan(planId, planData) {
    try {
      const response = await api.put(`/diet/plan/${planId}`, planData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update diet plan');
    }
  },
};
