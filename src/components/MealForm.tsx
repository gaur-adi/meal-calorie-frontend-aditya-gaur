"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMealStore } from "@/stores/mealStore";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const mealSchema = z.object({
  dish_name: z.string().min(2, "Enter a dish name"),
  servings: z.coerce.number().int().positive("Must be > 0"),
});

export function MealForm() {
  const { fetchCalories, loading, error } = useMealStore();
  const token = useAuthStore((s) => s.token);
  const form = useForm({
    resolver: zodResolver(mealSchema),
    defaultValues: { dish_name: "", servings: 1 },
  });

  const onSubmit = async (values: any) => {
    try {
      await fetchCalories(values, token || undefined);
      toast.success("Calories fetched successfully!");
    } catch (err) {
      toast.error("Failed to fetch calories. Please try again.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <Input placeholder="Dish Name" {...form.register("dish_name")} />
      <Input placeholder="Servings" type="number" min={1} {...form.register("servings", { valueAsNumber: true })} />
      {form.formState.errors.dish_name && (
        <div className="text-red-500 text-sm">{form.formState.errors.dish_name.message as string}</div>
      )}
      {form.formState.errors.servings && (
        <div className="text-red-500 text-sm">{form.formState.errors.servings.message as string}</div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Calculating..." : "Get Calories"}
      </Button>
    </form>
  );
} 