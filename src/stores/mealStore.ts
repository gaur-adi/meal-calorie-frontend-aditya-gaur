import { create } from 'zustand';
import { MealRequest, MealResponse } from '@/types/meal';
import { getCalories, searchUSDAFood } from '@/lib/api';

export type MealState = {
  loading: boolean;
  error: string | null;
  result: MealResponse | null;
  history: MealResponse[];
  fetchCalories: (data: MealRequest, token?: string) => Promise<void>;
  addToHistory: (meal: MealResponse) => void;
};

export const useMealStore = create<MealState>((set) => ({
  loading: false,
  error: null,
  result: null,
  history: [],
  fetchCalories: async (data, token) => {
    set({ loading: true, error: null });
    try {
      // Call USDA API
      const usdaData = await searchUSDAFood(data.dish_name);
      const food = usdaData.foods[0];
      if (!food) {
        throw new Error('Food not found');
      }
      const caloriesPer100g = food.foodNutrients.find((n: any) => n.nutrientName === 'Energy')?.value || 0;
      const caloriesPerServing = (caloriesPer100g * food.servingSize) / 100;
      const totalCalories = caloriesPerServing * data.servings;

      const result: MealResponse = {
        dish_name: data.dish_name,
        servings: data.servings,
        calories_per_serving: Math.round(caloriesPerServing),
        total_calories: Math.round(totalCalories),
        source: 'USDA FoodData Central',
      };

      set((state) => ({ result, history: [...state.history, result], loading: false }));
    } catch (err: any) {
      set({ error: err?.message || 'Failed to fetch calories', loading: false });
    }
  },
  addToHistory: (meal) => set((state) => ({ history: [...state.history, meal] })),
})); 