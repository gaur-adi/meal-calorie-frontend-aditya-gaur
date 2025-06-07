"use client";

import { useMealStore } from "@/stores/mealStore";
import { MealForm } from "@/components/MealForm";
import { ResultCard } from "@/components/ResultCard";
import { MealHistory } from "@/components/MealHistory";
import { Box, Container } from "@mui/material";
import { MealResultType } from "@/types/meal";

export default function DashboardPage() {
  const { result } = useMealStore();
  
  // Transform MealResponse to MealResultType
  const formattedResult: MealResultType | null = result ? {
    dishName: result.dish_name,
    servings: result.servings,
    caloriesPerServing: result.calories_per_serving,
    totalCalories: result.total_calories,
    source: result.source
  } : null;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
        py: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Main layout container */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, height: '100%' }}>
          {/* Left column for form and results */}
          <Box sx={{ 
            width: { xs: '100%', md: '450px' }, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            flexShrink: 0
          }}>
            {/* Form at top */}
            <MealForm />
            
            {/* Results below form */}
            {formattedResult && <ResultCard result={formattedResult} />}
          </Box>
          
          {/* Right column for history */}
          <Box sx={{ 
            flexGrow: 1,
            minHeight: '500px',
            maxWidth: { md: 'calc(100% - 270px)' }
          }}>
            <MealHistory />
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 