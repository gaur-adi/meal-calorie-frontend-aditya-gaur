"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, Container } from '@mui/material';
import MealForm from '@/components/MealForm';
import ResultCard from '@/components/ResultCard';
import MealHistory from '@/components/MealHistory';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Dashboard() {
  const { isAuthenticated, token } = useAuthStore();
  const { fetchMealsFromDb } = useMealStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Add useEffect to handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    } else {
      setAuthChecked(true);
    }
  }, [isAuthenticated, router]);

  // Fetch meals from the database when authenticated
  useEffect(() => {
    if (isAuthenticated || Cookies.get('auth-token')) {
      fetchMealsFromDb();
    }
  }, [isAuthenticated, fetchMealsFromDb]);

  // Show loading state when checking auth or during hydration
  if (!isClient || (!authChecked && !isAuthenticated && !Cookies.get('auth-token'))) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#f8fafc'
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f8fafc',
      pb: 4
    }}>
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