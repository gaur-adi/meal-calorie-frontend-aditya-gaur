"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, TextField, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { useMealStore } from "@/stores/mealStore";
import toast from "react-hot-toast";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';

const mealSchema = z.object({
  dish_name: z.string().min(2, "Enter a dish name"),
  servings: z.coerce.number().int().positive("Must be > 0"),
});

export function MealForm() {
  const { searchCalories, loading, error } = useMealStore();
  const form = useForm({
    resolver: zodResolver(mealSchema),
    defaultValues: { dish_name: "", servings: 1 },
  });

  const onSubmit = async (values: any) => {
    try {
      await searchCalories(values.dish_name);
      toast.success("Calories fetched successfully!");
    } catch (err) {
      toast.error("Failed to fetch calories. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%', mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Calculate Meal Calories
      </Typography>
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Dish Name"
          variant="outlined"
          margin="normal"
          error={!!form.formState.errors.dish_name}
          helperText={form.formState.errors.dish_name?.message as string}
          InputProps={{
            startAdornment: <RestaurantMenuIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          {...form.register("dish_name")}
        />
        <TextField
          fullWidth
          label="Number of Servings"
          type="number"
          variant="outlined"
          margin="normal"
          error={!!form.formState.errors.servings}
          helperText={form.formState.errors.servings?.message as string}
          InputProps={{
            startAdornment: <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          {...form.register("servings", { valueAsNumber: true })}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Calculate Calories"
          )}
        </Button>
      </Box>
    </Paper>
  );
} 