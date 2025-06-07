import { MealResponse } from '@/types/meal';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

export function ResultCard({ result }: { result: MealResponse }) {
  return (
    <Card sx={{ maxWidth: 500, width: '100%', mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalDiningIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="h2">
            {result.dish_name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Chip
            icon={<PeopleIcon />}
            label={`${result.servings} Servings`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<RestaurantIcon />}
            label={`${result.calories_per_serving} cal/serving`}
            color="secondary"
            variant="outlined"
          />
        </Box>

        <Typography variant="h4" color="primary" sx={{ my: 2, textAlign: 'center' }}>
          {result.total_calories} calories
        </Typography>

        <Divider sx={{ my: 2 }} />

        {result.ingredients && result.ingredients.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon sx={{ mr: 1 }} />
              Ingredient Breakdown
            </Typography>
            <List>
              {result.ingredients.map((ing, i) => (
                <ListItem key={i} divider={i < result.ingredients!.length - 1}>
                  <ListItemText
                    primary={ing.name}
                    secondary={`${ing.calories} calories`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
          Source: {result.source}
        </Typography>
      </CardContent>
    </Card>
  );
} 