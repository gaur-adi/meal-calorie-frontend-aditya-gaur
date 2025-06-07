import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY;

if (!USDA_API_KEY) {
  console.error('USDA API key is not set in environment variables');
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: any) => api.post('/auth/login', data);

// Calories endpoint
export const getCalories = (data: any, token?: string) =>
  api.post('/get-calories', data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

// USDA FoodData Central API call
export const searchUSDAFood = async (query: string) => {
  try {
    console.log('Searching USDA API for:', query);
    console.log('Using API key:', USDA_API_KEY ? 'Present' : 'Missing');

    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query,
        api_key: USDA_API_KEY,
        pageSize: 1,
      },
    });

    console.log('USDA API Response:', response.data);

    if (!response.data.foods || response.data.foods.length === 0) {
      throw new Error('No food items found');
    }

    return response.data;
  } catch (error: any) {
    console.error('USDA API error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    if (error.response?.status === 401) {
      throw new Error('Invalid USDA API key');
    } else if (error.response?.status === 404) {
      throw new Error('Food not found');
    } else {
      throw new Error(error.response?.data?.message || 'Failed to fetch food data from USDA');
    }
  }
}; 