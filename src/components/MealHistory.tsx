"use client";

import { useMealStore } from "@/stores/mealStore";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  useTheme
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export function MealHistory() {
  const { mealHistory = [] } = useMealStore();
  const theme = useTheme();

  if (!mealHistory || mealHistory.length === 0) {
    return null;
  }

  return (
    <Card
      sx={{
        mt: 6,
        borderRadius: 4,
        boxShadow: 6,
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: '#2563eb', mr: 2 }}>
            <HistoryIcon />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2563eb' }}>
            Meal History
          </Typography>
        </Box>
        <List>
          {mealHistory.map((meal, index) => (
            <Box key={meal.timestamp}>
              <ListItem
                sx={{
                  borderRadius: 3,
                  transition: 'background 0.2s',
                  '&:hover': { background: '#f0fdfa' },
                  mb: 1,
                  px: 2,
                }}
                disableGutters
              >
                <Avatar sx={{ bgcolor: '#3b82f6', mr: 2 }}>
                  <LocalDiningIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2563eb' }}>
                      {meal.dishName}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(meal.timestamp).toLocaleString()}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${meal.totalCalories} cal`}
                        sx={{
                          fontWeight: 700,
                          bgcolor: meal.totalCalories < 200 ? '#bbf7d0' : '#fef9c3',
                          color: meal.totalCalories < 200 ? '#059669' : '#b45309',
                        }}
                      />
                    </Box>
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