"use client";

import { useMealStore } from "@/stores/mealStore";
import {
  Card,
  Typography,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteIcon from '@mui/icons-material/Delete';

export function MealHistory() {
  const { mealHistory = [], clearHistory } = useMealStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: 'none',
      }}
    >
      {/* Blue header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#4361ee',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              mr: 2,
            }}
          >
            <HistoryIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'white' }}>
            Meal History
          </Typography>
        </Box>
        
        {mealHistory.length > 0 && (
          <Tooltip title="Clear history">
            <IconButton 
              size="small" 
              onClick={clearHistory}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      
      {/* Scrollable white content area */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'white',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)',
          p: 2,
        }}
      >
        {(!mealHistory || mealHistory.length === 0) ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            minHeight: '200px',
            py: 4
          }}>
            <RestaurantIcon sx={{ color: '#94a3b8', fontSize: 48, mb: 2 }} />
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              No meal history yet.
              <br />
              Calculate your first meal&apos;s calories!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
            {mealHistory.map((meal) => (
              <Box 
                key={meal.timestamp} 
                sx={{ 
                  width: '50%', 
                  p: 1,
                  boxSizing: 'border-box'
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    bgcolor: 'rgba(241, 245, 249, 0.5)',
                    borderRadius: '12px',
                    p: 1.5,
                    border: '1px solid rgba(203, 213, 225, 0.4)',
                  }}
                >
                  <Box
                    sx={{
                      mt: 0.5,
                      mr: 1.5,
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <RestaurantIcon sx={{ color: '#4361ee' }} />
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography 
                        sx={{ 
                          fontWeight: 500, 
                          color: '#1e293b',
                          fontSize: '0.95rem',
                          mb: 0.5,
                        }}
                      >
                        {meal.dishName}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: meal.totalCalories < 100 ? '#bbf7d0' : '#fef9c3',
                          color: meal.totalCalories < 100 ? '#059669' : '#b45309',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          borderRadius: '4px',
                          py: 0.5,
                          px: 1,
                          ml: 1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {meal.totalCalories} cal
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}
                      >
                        {formatDate(meal.timestamp)}, {formatTime(meal.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default MealHistory; 