"use client";

import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { RestaurantMenu, TrendingUp, Timer, Lock } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

const demoFoods = [
  { name: 'Grilled Chicken Breast', calories: 165 },
  { name: 'Caesar Salad', calories: 230 },
  { name: 'Spaghetti Bolognese', calories: 340 },
  { name: 'Vegetable Stir Fry', calories: 250 },
  { name: 'Salmon Fillet', calories: 290 },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCalculating(true);
      setShowResult(false);
      
      // Show calculating state for 1 second
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
        
        // Show result for 2 seconds before moving to next food
        setTimeout(() => {
          setCurrentFoodIndex((prev) => (prev + 1) % demoFoods.length);
        }, 2000);
      }, 1000);
    }, 4000); // Complete cycle every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4361ee 0%, #4895ef 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Track Your Meal Calories
                <br />
                <Box
                  component="span"
                  sx={{
                    color: '#bfdbfe',
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  With Ease
                </Box>
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 500,
                }}
              >
                Simplify your nutrition tracking with our intelligent calorie calculator.
                Quick, accurate, and easy to use.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {isAuthenticated ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/dashboard')}
                    sx={{
                      bgcolor: 'white',
                      color: '#4361ee',
                      fontSize: '1.1rem',
                      py: 1.5,
                      px: 4,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255,255,255,0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router.push('/login')}
                      sx={{
                        bgcolor: 'white',
                        color: '#4361ee',
                        fontSize: '1.1rem',
                        py: 1.5,
                        px: 4,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#f8fafc',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(255,255,255,0.2)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/register')}
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        fontSize: '1.1rem',
                        py: 1.5,
                        px: 4,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    transform: 'rotate(-3deg)',
                  },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    transform: 'rotate(3deg)',
                    bgcolor: 'white',
                    p: 3,
                  }}
                >
                  {/* Animated calculator preview */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: '#4361ee', mb: 3, fontWeight: 600 }}
                    >
                      Calculate Meal Calories
                    </Typography>
                    
                    {/* Dish Name Input */}
                    <Box
                      sx={{
                        height: '48px',
                        bgcolor: '#f1f5f9',
                        borderRadius: '12px',
                        mb: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <RestaurantMenu sx={{ color: '#64748b', mr: 1 }} />
                      <Typography
                        sx={{
                          color: '#1e293b',
                          opacity: 0.9,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        {demoFoods[currentFoodIndex].name}
                      </Typography>
                    </Box>

                    {/* Servings Input */}
                    <Box
                      sx={{
                        height: '48px',
                        bgcolor: '#f1f5f9',
                        borderRadius: '12px',
                        mb: 3,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#64748b' }}>1 Serving</Typography>
                    </Box>

                    {/* Result/Button */}
                    <Box
                      sx={{
                        height: '48px',
                        bgcolor: '#4361ee',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {isCalculating ? (
                        <Typography
                          sx={{
                            animation: 'pulse 1s infinite',
                            '@keyframes pulse': {
                              '0%, 100%': { opacity: 1 },
                              '50%': { opacity: 0.5 },
                            },
                          }}
                        >
                          Calculating...
                        </Typography>
                      ) : showResult ? (
                        <Typography
                          sx={{
                            animation: 'fadeIn 0.3s ease',
                            '@keyframes fadeIn': {
                              from: { opacity: 0 },
                              to: { opacity: 1 },
                            },
                          }}
                        >
                          {demoFoods[currentFoodIndex].calories} calories
                        </Typography>
                      ) : (
                        <Typography>Calculate Calories</Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 8,
            color: '#1e293b',
          }}
        >
          Why Choose Our App?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <RestaurantMenu sx={{ fontSize: 40 }} />,
              title: 'Extensive Food Database',
              description:
                'Access a comprehensive database of foods with accurate calorie information.',
            },
            {
              icon: <TrendingUp sx={{ fontSize: 40 }} />,
              title: 'Track Progress',
              description:
                'Monitor your daily calorie intake and track your nutrition goals easily.',
            },
            {
              icon: <Timer sx={{ fontSize: 40 }} />,
              title: 'Quick Results',
              description:
                'Get instant calorie calculations for your meals with just a few clicks.',
            },
            {
              icon: <Lock sx={{ fontSize: 40 }} />,
              title: 'Secure & Private',
              description:
                'Your data is protected with industry-standard security measures.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '16px',
                  bgcolor: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: '12px',
                    bgcolor: '#eff6ff',
                    color: '#4361ee',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontWeight: 600, color: '#1e293b' }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#64748b', lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
