import { MealForm } from '@/components/MealForm';
import { ResultCard } from '@/components/ResultCard';
import { useMealStore } from '@/stores/mealStore';

export default function CaloriesPage() {
  const { result } = useMealStore();
  return (
    <div className="flex flex-col min-h-screen items-center justify-start pt-12">
      <h1 className="text-3xl font-bold mb-2">Meal Calorie Lookup</h1>
      <p className="mb-8 text-zinc-500">Find calories for your favorite dishes.</p>
      <MealForm />
      {result && <ResultCard result={result} />}
    </div>
  );
} 