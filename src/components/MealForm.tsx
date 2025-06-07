"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, TextField, Box, Typography } from '@mui/material';
import { useMealStore } from "@/stores/mealStore";
import toast from "react-hot-toast";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

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
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        p: 3,
        width: '100%',
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        align="center" 
        sx={{ 
          fontWeight: 600,
          color: '#4361ee',
          mb: 3,
          fontSize: '1.5rem',
        }}
      >
        Calculate Meal Calories
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
          Dish Name
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. Pizza, Salad, Pasta"
          error={!!form.formState.errors.dish_name}
          helperText={form.formState.errors.dish_name?.message as string}
          InputProps={{
            startAdornment: <RestaurantMenuIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
          }}
          variant="outlined"
          {...form.register("dish_name")}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
          Number of Servings
        </Typography>
        <TextField
          fullWidth
          type="number"
          placeholder="1"
          error={!!form.formState.errors.servings}
          helperText={form.formState.errors.servings?.message as string}
          InputProps={{
            startAdornment: <PeopleIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
          }}
          variant="outlined"
          {...form.register("servings", { valueAsNumber: true })}
        />
      </Box>

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
            mb: 2
          }}
        >
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        startIcon={loading ? null : <SearchIcon />}
        sx={{
          py: 1.25,
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.95rem',
          textTransform: 'none',
          bgcolor: '#4361ee',
          '&:hover': {
            bgcolor: '#3854d1',
          },
        }}
      >
        {loading ? "Calculating..." : "Calculate Calories"}
      </Button>
    </Box>
  );
} 