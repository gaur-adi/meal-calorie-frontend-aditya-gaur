"use client";

import Link from "next/link";
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export function Navbar() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <RestaurantIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Meal Calorie Counter
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              href="/"
              color="primary"
              variant="text"
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/dashboard"
              color="primary"
              variant="text"
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 