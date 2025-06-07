import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealResponse, MealHistoryItem } from '@/types/meal';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import Cookies from 'js-cookie';


interface MealState {
  loading: boolean;
  error: string | null;
  result: MealResponse | null;
  mealHistory: MealHistoryItem[];
  searchCalories: (query: string, servings: number) => Promise<void>;
  addToHistory: (meal: MealHistoryItem) => void;
  clearHistory: () => Promise<void>;
  saveMealToDb: (meal: MealHistoryItem) => Promise<void>;
  fetchMealsFromDb: () => Promise<void>;
}

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      result: null,
      mealHistory: [],
      searchCalories: async (query: string, servings: number = 1) => {
        try {
          set({ loading: true, error: null });
          console.log('Starting calorie search for:', query);

          // Set authorization header from store or cookie
          const authStore = useAuthStore.getState();
          const token = authStore.token || Cookies.get('auth-token');
          
          const headers: Record<string, string> = {};
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          // Make API call to your backend calories endpoint which handles FDA API call
          const response = await axios.post('/api/calories', {
            dishName: query,
            servings: servings
          }, { headers });
          
          console.log('Calorie API response:', response.data);
          
          const result: MealResponse = {
            dish_name: query,
            servings: servings,
            calories_per_serving: response.data.calories_per_serving,
            total_calories: response.data.total_calories,
            source: response.data.source || 'USDA Food Database'
          };

          const mealHistoryItem: MealHistoryItem = {
            dishName: query,
            servings: servings,
            caloriesPerServing: response.data.calories_per_serving,
            totalCalories: response.data.total_calories,
            timestamp: new Date().toISOString(),
          };

          set({ result, loading: false });
          get().addToHistory(mealHistoryItem);
          
          // If user is logged in, save the meal to the database
          const isAuthenticated = authStore.isAuthenticated || !!token;
          if (isAuthenticated) {
            await get().saveMealToDb(mealHistoryItem);
          }
        } catch (error: unknown) {
          console.error('Error in searchCalories:', error);
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch calories. Please try again.',
            result: null
          });
        }
      },
      addToHistory: (meal: MealHistoryItem) => {
        set((state) => ({
          mealHistory: [meal, ...state.mealHistory],
        }));
      },
      clearHistory: async () => {
        try {
          // Get token from store or cookie
          const authStore = useAuthStore.getState();
          const token = authStore.token || Cookies.get('auth-token');
          
          // If user is authenticated, clear history from DB first
          if (token) {
            await axios.delete('/api/meals/clear', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log('Meal history cleared from database');
          }
          
          // Clear local history
          set({ mealHistory: [] });
        } catch (error) {
          console.error('Error clearing meal history:', error);
          // Still clear local history even if DB clear fails
          set({ mealHistory: [] });
        }
      },
      saveMealToDb: async (meal: MealHistoryItem) => {
        try {
          // Get token from store or cookie
          const authStore = useAuthStore.getState();
          const token = authStore.token || Cookies.get('auth-token');
          
          if (!token) {
            console.log('No authentication token found, skipping meal save');
            return;
          }
          
          await axios.post('/api/meals', {
            dishName: meal.dishName,
            servings: meal.servings,
            caloriesPerServing: meal.caloriesPerServing,
            totalCalories: meal.totalCalories,
            source: 'USDA Food Database'
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          console.log('Meal saved to database successfully');
        } catch (error) {
          console.error('Error saving meal to database:', error);
        }
      },
      fetchMealsFromDb: async () => {
        try {
          // Get token from store or cookie
          const authStore = useAuthStore.getState();
          const token = authStore.token || Cookies.get('auth-token');
          
          if (!token) {
            console.log('No authentication token found, skipping meal fetch');
            return;
          }
          
          const response = await axios.get('/api/meals', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.meals) {
            // Convert database meals to MealHistoryItem format
            const meals: MealHistoryItem[] = response.data.meals.map((meal: any) => ({
              dishName: meal.dishName,
              servings: meal.servings,
              caloriesPerServing: meal.caloriesPerServing,
              totalCalories: meal.totalCalories,
              timestamp: meal.createdAt,
            }));
            
            // Update store with fetched meals
            set({ mealHistory: meals });
            console.log('Meals fetched from database successfully', meals);
          }
        } catch (error) {
          console.error('Error fetching meals from database:', error);
        }
      }
    }),
    {
      name: 'meal-storage',
    }
  )
); 