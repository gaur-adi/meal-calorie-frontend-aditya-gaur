"use client";

import { useMealStore } from "@/stores/mealStore";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export function MealHistory() {
  const { mealHistory = [] } = useMealStore();

  if (!mealHistory || mealHistory.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HistoryIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Meal History</Typography>
        </Box>
        <List>
          {mealHistory.map((meal, index) => (
            <Box key={meal.timestamp}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalDiningIcon fontSize="small" />
                      <Typography variant="body1">{meal.dishName}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography component="div">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                          {new Date(meal.timestamp).toLocaleString()}
                        </Box>
                        <Chip
                          size="small"
                          label={`${meal.totalCalories} calories`}
                          variant="outlined"
                        />
                      </Box>
                    </Typography>
                  }
                />
              </ListItem>
              {index < mealHistory.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
} 