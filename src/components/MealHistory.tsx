"use client";

import { useMealStore } from "@/stores/mealStore";

export function MealHistory() {
  const { history } = useMealStore();

  if (history.length === 0) {
    return <div className="text-center text-zinc-500">No meal history yet.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Meal History</h2>
      <ul className="space-y-2">
        {history.map((meal, i) => (
          <li key={i} className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
            <div className="font-semibold">{meal.dish_name}</div>
            <div>Servings: {meal.servings}</div>
            <div>Total Calories: {meal.total_calories}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 