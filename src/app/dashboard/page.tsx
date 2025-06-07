"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, Button, AppBar, Toolbar, Container } from '@mui/material';
import MealForm from '@/components/MealForm';
import ResultCard from '@/components/ResultCard';
import MealHistory from '@/components/MealHistory';
import { useAuthStore } from '@/stores/authStore';
import Cookies from 'js-cookie';
import axios from 'axios';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Dashboard() {
  const { user, isAuthenticated, logout, token } = useAuthStore();
  const router = useRouter();

  // Configure axios to include token in all requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    // Get token from cookie as fallback
    const cookieToken = Cookies.get('auth-token');
    if (cookieToken && !token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookieToken}`;
    }
  }, [token]);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !Cookies.get('auth-token')) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle logout
  const handleLogout = () => {
    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Delete the cookie
    Cookies.remove('auth-token', { path: '/' });
    
    // Call logout from the store
    logout();
    
    // Redirect to login page
    router.push('/login');
  };

  // If not authenticated, show loading
  if (!isAuthenticated && !Cookies.get('auth-token')) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#f8fafc'
      }}>
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f8fafc',
      pb: 4
    }}>
      {/* Navbar */}
      <AppBar 
        position="static" 
        color="default" 
        elevation={1}
        sx={{ 
          bgcolor: 'white', 
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <RestaurantIcon sx={{ color: '#4361ee', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
              Meal Calorie Counter
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              Welcome, {user?.firstName || 'User'}!
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              size="small"
              sx={{ 
                borderColor: '#4361ee',
                color: '#4361ee',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#3730a3',
                  backgroundColor: 'rgba(67, 97, 238, 0.04)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Left column: Form and Result */}
          <Grid item xs={12} md={6} lg={5} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <MealForm />
            <ResultCard />
          </Grid>

          {/* Right column: Meal History */}
          <Grid item xs={12} md={6} lg={7} sx={{ width: '70%' }}>
            <MealHistory />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 