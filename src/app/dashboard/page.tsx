import { MealForm } from '@/components/MealForm';
import { ResultCard } from '@/components/ResultCard';
import { MealHistory } from '@/components/MealHistory';
import { useMealStore } from '@/stores/mealStore';

export default function DashboardPage() {
  const { result } = useMealStore();
  return (
    <div className="flex flex-col min-h-screen items-center justify-start pt-12">
      <h1 className="text-3xl font-bold mb-2">Meal Calorie Count Generator</h1>
      <p className="mb-8 text-zinc-500">Enter a dish and servings to get calorie info.</p>
      <MealForm />
      {result && <ResultCard result={result} />}
      <MealHistory />
    </div>
  );
} 