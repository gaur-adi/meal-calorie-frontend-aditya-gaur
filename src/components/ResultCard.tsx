import { MealResponse } from '@/types/meal';

export function ResultCard({ result }: { result: MealResponse }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded shadow p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">{result.dish_name}</h2>
      <div className="mb-2">Servings: <span className="font-semibold">{result.servings}</span></div>
      <div className="mb-2">Calories per serving: <span className="font-semibold">{result.calories_per_serving}</span></div>
      <div className="mb-2">Total calories: <span className="font-semibold">{result.total_calories}</span></div>
      <div className="mb-2 text-xs text-zinc-500">Source: {result.source}</div>
      {result.ingredients && result.ingredients.length > 0 && (
        <div className="mt-4">
          <div className="font-semibold mb-1">Ingredient Breakdown:</div>
          <ul className="list-disc list-inside text-sm">
            {result.ingredients.map((ing, i) => (
              <li key={i}>{ing.name}: {ing.calories} cal</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 