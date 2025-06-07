export type MealRequest = {
  dish_name: string;
  servings: number;
};

export type IngredientBreakdown = {
  name: string;
  calories: number;
};

export type MealResponse = {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
  ingredients?: IngredientBreakdown[];
};

export type MealResultType = {
  dishName: string;
  servings: number;
  caloriesPerServing: number;
  totalCalories: number;
  source?: string;
  ingredients?: IngredientBreakdown[];
}; 