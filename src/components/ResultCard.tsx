"use client";

import { Card, Typography, Box, Stack } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useMealStore } from "@/stores/mealStore";

export default function ResultCard() {
  const { result } = useMealStore();
  
  // If no result, show empty state
  if (!result) {
    return (
      <Card
        sx={{
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          overflow: 'visible',
          p: 3,
          pt: 4,
          position: 'relative',
          background: '#fff',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary" textAlign="center">
          Calculate a meal to see results
        </Typography>
      </Card>
    );
  }

  // Extract data from result
  const dishName = result?.dish_name || "";
  const servings = result?.servings || 0;
  const caloriesPerServing = result?.calories_per_serving || 0;
  const totalCalories = result?.total_calories || 0;
  
  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        overflow: 'visible',
        p: 3,
        pt: 4,
        position: 'relative',
        background: '#fff',
        height: '100%',
        width: '100%',
      }}
    >
      {/* Icon at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20px',
          left: '20px',
          backgroundColor: '#4361ee',
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(67, 97, 238, 0.3)',
        }}
      >
        <RestaurantIcon sx={{ color: 'white' }} />
      </Box>
      
      {/* Meal name */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 500, 
          mb: 2, 
          color: '#1e293b'
        }}
      >
        {dishName}
      </Typography>
      
      {/* Stats */}
      <Stack spacing={1} mb={3}>
        {/* Servings */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}>
          <PeopleIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{servings} Servings</Typography>
        </Box>
        
        {/* Calories per serving */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: '#ef4444',
          fontSize: '0.875rem',
        }}>
          <LocalFireDepartmentIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#ef4444',
              fontWeight: 500,
            }}
          >
            {caloriesPerServing} cal/serving
          </Typography>
        </Box>
      </Stack>
      
      {/* Total calories */}
      <Box 
        sx={{ 
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="caption" 
          component="div"
          sx={{ 
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: 0.5,
          }}
        >
          TOTAL CALORIES
        </Typography>
        
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: '#4361ee',
          }}
        >
          {totalCalories}
        </Typography>
      </Box>
      
      <Typography 
        variant="caption" 
        component="div" 
        sx={{ 
          mt: 2,
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.75rem',
        }}
      >
        Source: USDA Food Database
      </Typography>
    </Card>
  );
} 