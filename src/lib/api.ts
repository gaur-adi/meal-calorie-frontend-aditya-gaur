import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY;

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
    const res = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query,
        api_key: USDA_API_KEY,
        pageSize: 1,
      },
    });
    return res.data;
  } catch (err) {
    console.error('USDA API error:', err);
    throw new Error('Failed to fetch food data from USDA');
  }
}; 