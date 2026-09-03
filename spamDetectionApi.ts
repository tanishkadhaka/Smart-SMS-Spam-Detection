import axios from 'axios';
import { PredictionResult, ModelMetrics, MessageExample } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const spamDetectionApi = {
  /**
   * Check if the backend API is running
   */
  checkStatus: async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      return response.status === 200;
    } catch (error) {
      console.error('Error checking API status:', error);
      return false;
    }
  },

  /**
   * Get model metrics
   */
  getMetrics: async (): Promise<ModelMetrics> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  /**
   * Get example messages
   */
  getExamples: async (): Promise<MessageExample[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/examples`);
      return response.data;
    } catch (error) {
      console.error('Error fetching examples:', error);
      return [];
    }
  },

  /**
   * Predict if a message is spam
   */
  predictSpam: async (message: string): Promise<PredictionResult> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, { message });
      return response.data;
    } catch (error) {
      console.error('Error predicting spam:', error);
      throw error;
    }
  }
};