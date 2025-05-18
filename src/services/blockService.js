import axios from 'axios';
import { API_URL } from '../config/env';

// Get the authentication token from wherever you store it 
// (e.g., localStorage, context, or state management)
const getAuthToken = () => {
  // Replace this with your actual token retrieval method
  return localStorage.getItem('token');
};

export const blockService = {
  // Upload images for a block
  uploadBlockImages: async (images) => {
    // Validate input
    if (!images || images.length === 0) {
      throw new Error('No images selected');
    }

    // Create FormData object
    const formData = new FormData();
    
    // Append each image to FormData
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(`${API_URL}/blocks`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}` // Dynamic token retrieval
        }
      });
      return response.data;
    } catch (error) {
      console.error('Image upload error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getBlocks: async () => {
    try {
      const response = await axios.get(`${API_URL}/blocks`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Fetch blocks error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Additional block-related service methods can be added here
  createBlock: async (blockData) => {
    try {
      const response = await axios.post(`${API_URL}/blocks`, blockData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Block creation error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};