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

export const workoutService = {
  // Generate personalized workout plan
  async generateWorkoutPlan() {
    try {
      const response = await api.post('/workout/generate');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate workout plan');
    }
  },

  // Get user's workout plan
  async getWorkoutPlan() {
    try {
      const response = await api.get('/workout/plan');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get workout plan');
    }
  },

  // Update workout plan
  async updateWorkoutPlan(planId, planData) {
    try {
      const response = await api.put(`/workout/plan/${planId}`, planData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update workout plan');
    }
  },
};
