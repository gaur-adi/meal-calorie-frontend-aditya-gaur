import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchUSDAFood } from '@/lib/api';
import { MealResponse } from '@/types/meal';

interface Nutrient {
  nutrientName?: string;
  value: number;
}

interface Meal {
  dishName: string;
  totalCalories: number;
  timestamp: string;
}

interface MealState {
  loading: boolean;
  error: string | null;
  result: MealResponse | null;
  mealHistory: Meal[];
  searchCalories: (query: string, dishName?: string) => Promise<void>;
  addToHistory: (meal: Meal) => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      loading: false,
      error: null,
      result: null,
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
            (n: Nutrient) => n.nutrientName?.toLowerCase().includes('energy')
          );

          if (!energyNutrient) {
            throw new Error('Calorie information not available for this food item.');
          }

          const servingSize = food.servingSize || 100;
          const totalCalories = Math.round((energyNutrient.value * servingSize) / 100);

          const result: MealResponse = {
            dish_name: dishName || query,
            servings: 1,
            calories_per_serving: totalCalories,
            total_calories: totalCalories,
            source: 'USDA Food Database'
          };

          const meal: Meal = {
            dishName: dishName || query,
            totalCalories,
            timestamp: new Date().toISOString(),
          };

          set({ result, loading: false });
          get().addToHistory(meal);
        } catch (error: unknown) {
          console.error('Error in searchCalories:', error);
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch calories. Please try again.',
            result: null
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