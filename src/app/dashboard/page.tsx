"use client";

import { useMealStore } from "@/stores/mealStore";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import { Box } from "@mui/material";

export default function DashboardPage() {
  const { result } = useMealStore();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: 8,
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <h1>Meal Calorie Dashboard</h1>
      </Box>
      <MealForm />
      {result && <ResultCard result={result} />}
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <MealHistory />
      </Box>
    </Box>
  );
} 