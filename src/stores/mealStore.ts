import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchUSDAFood } from '@/lib/api';
import { MealResponse, MealHistoryItem } from '@/types/meal';
import axios from 'axios';

interface Nutrient {
  nutrientName?: string;
  value: number;
}

interface MealState {
  loading: boolean;
  error: string | null;
  result: MealResponse | null;
  mealHistory: MealHistoryItem[];
  searchCalories: (query: string, servings: number) => Promise<void>;
  addToHistory: (meal: MealHistoryItem) => void;
  clearHistory: () => void;
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

          // Make API call to your backend calories endpoint which handles FDA API call
          // This will use the session token cookie automatically
          const response = await axios.post('/api/calories', {
            dishName: query,
            servings: servings
          });
          
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
      clearHistory: () => {
        set({ mealHistory: [] });
      }
    }),
    {
      name: 'meal-storage',
    }
  )
); 