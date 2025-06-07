"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useMealStore } from "@/stores/mealStore";
import toast from "react-hot-toast";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';

const mealSchema = z.object({
  dish_name: z.string().min(2, "Enter a dish name"),
  servings: z.coerce.number().int().positive("Must be > 0"),
});

interface MealFormValues {
  dish_name: string;
  servings: number;
}

export function MealForm() {
  const { searchCalories, loading, error } = useMealStore();
  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: { dish_name: "", servings: 1 },
  });

  const onSubmit = async (values: MealFormValues) => {
    try {
      console.log('Submitting meal form with values:', values);
      await searchCalories(values.dish_name, values.servings);
      toast.success("Calories fetched successfully!");
    } catch {
      toast.error("Failed to fetch calories. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
        p: { xs: 3, sm: 4 },
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient accent bar */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        height: '8px', 
        background: 'linear-gradient(90deg, #4361ee 0%, #4895ef 100%)',
      }} />

      <Typography 
        variant="h4" 
        component="h2" 
        align="center" 
        sx={{ 
          fontWeight: 600,
          color: '#4361ee',
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
        }}
      >
        Calculate Meal Calories
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3
        }}
      >
        <TextField
          fullWidth
          label="Dish Name"
          variant="outlined"
          error={!!form.formState.errors.dish_name}
          helperText={form.formState.errors.dish_name?.message as string}
          InputProps={{
            startAdornment: <RestaurantMenuIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
            sx: {
              borderRadius: '12px',
              backgroundColor: 'rgba(67, 97, 238, 0.03)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(67, 97, 238, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4361ee',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4361ee',
              },
            }
          }}
          {...form.register("dish_name")}
        />

        <TextField
          fullWidth
          label="Number of Servings"
          type="number"
          variant="outlined"
          error={!!form.formState.errors.servings}
          helperText={form.formState.errors.servings?.message as string}
          InputProps={{
            startAdornment: <PeopleIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
            sx: {
              borderRadius: '12px',
              backgroundColor: 'rgba(67, 97, 238, 0.03)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(67, 97, 238, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4361ee',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4361ee',
              },
            }
          }}
          {...form.register("servings", { valueAsNumber: true })}
        />

        {error && (
          <Typography 
            color="error" 
            sx={{ 
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: 500,
              p: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
            }}
          >
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            background: 'linear-gradient(90deg, #4361ee 0%, #4895ef 100%)',
            boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #4361ee 0%, #4895ef 100%)',
              boxShadow: '0 6px 20px rgba(67, 97, 238, 0.4)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&.Mui-disabled': {
              background: 'linear-gradient(90deg, #94a3b8 0%, #cbd5e1 100%)',
            }
          }}
        >
          {loading ? (
            <CircularProgress 
              size={24} 
              sx={{ 
                color: 'white',
              }} 
            />
          ) : (
            "Calculate Calories"
          )}
        </Button>
      </Box>
    </Box>
  );
} 