import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealRequest, MealResponse } from '@/types/meal';
import { searchUSDAFood } from '@/lib/api';

interface Meal {
  dishName: string;
  totalCalories: number;
  timestamp: string;
}

interface MealState {
  loading: boolean;
  error: string | null;
  mealHistory: Meal[];
  searchCalories: (query: string, dishName?: string) => Promise<void>;
  addToHistory: (meal: Meal) => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      mealHistory: [],
      searchCalories: async (query: string, dishName?: string) => {
        try {
          set({ loading: true, error: null });
          console.log('Starting calorie search for:', query);

          const usdaData = await searchUSDAFood(query);
          console.log('USDA data received:', usdaData);

          if (!usdaData.foods || usdaData.foods.length === 0) {
            throw new Error('No food items found. Please try a different search term.');
          }

          const food = usdaData.foods[0];
          const energyNutrient = food.foodNutrients?.find(
            (n: any) => n.nutrientName?.toLowerCase().includes('energy')
          );

          if (!energyNutrient) {
            throw new Error('Calorie information not available for this food item.');
          }

          const servingSize = food.servingSize || 100;
          const totalCalories = Math.round((energyNutrient.value * servingSize) / 100);

          const meal: Meal = {
            dishName: dishName || query,
            totalCalories,
            timestamp: new Date().toISOString(),
          };

          get().addToHistory(meal);
          set({ loading: false });
        } catch (error: any) {
          console.error('Error in searchCalories:', error);
          set({
            loading: false,
            error: error.message || 'Failed to fetch calories. Please try again.',
          });
        }
      },
      addToHistory: (meal: Meal) => {
        set((state) => ({
          mealHistory: [meal, ...state.mealHistory],
        }));
      },
    }),
    {
      name: 'meal-storage',
    }
  )
); 