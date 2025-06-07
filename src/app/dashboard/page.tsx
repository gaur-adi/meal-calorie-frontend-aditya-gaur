"use client";

import { useMealStore } from "@/stores/mealStore";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box } from "@mui/material";

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
        <MealForm />
        {result && <ResultCard result={result} />}
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <MealHistory />
      </Box>
    </Box>
  );
} 