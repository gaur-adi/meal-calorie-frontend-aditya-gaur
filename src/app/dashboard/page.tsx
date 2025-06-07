"use client";

import { useMealStore } from "@/stores/mealStore";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { result } = useMealStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-start pt-12">
      <h1 className="text-3xl font-bold mb-2">Meal Calorie Count Generator</h1>
      <div className="w-full max-w-4xl p-4">
        <MealForm />
        {result && <ResultCard result={result} />}
        <MealHistory />
      </div>
    </div>
  );
} 