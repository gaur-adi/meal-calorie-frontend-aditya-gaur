"use client";

import { Box, Button, Container, Grid, Typography, Card, CardContent, Stack, TextField, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimerIcon from '@mui/icons-material/Timer';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';

export default function HomePage() {
  // State for demo calculator
  const [displayText, setDisplayText] = useState('');
  const [dishIndex, setDishIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sample dishes with categories and calories
  const sampleDishes = [
    { name: 'Pizza', category: 'Fast Food', calories: 250 },
    { name: 'Salad', category: 'Healthy', calories: 120 },
    { name: 'Burger', category: 'Fast Food', calories: 88 },
    { name: 'Pasta', category: 'Italian', calories: 340 },
    { name: 'Chicken Curry', category: 'Indian', calories: 107 },
    { name: 'Sushi', category: 'Japanese', calories: 94 },
  ];

  // Animation function for typing effect
  const animateTyping = (text: string) => {
    setIsTyping(true);
    setDisplayText('');
    let i = 0;
    
    typingInterval.current = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text);
        i++;
      } else {
        clearInterval(typingInterval.current!);
        setIsTyping(false);
        
        // Start calculating animation after typing completes
        setIsCalculating(true);
        
        // Show result after a delay
        transitionTimeout.current = setTimeout(() => {
          setIsCalculating(false);
          setShowResult(true);
          
          // Move to next dish after showing result
          animationTimeout.current = setTimeout(() => {
            setShowResult(false);
            setDishIndex((prevIndex) => (prevIndex + 1) % sampleDishes.length);
          }, 3000); // Show result for 3 seconds
        }, 1500); // Calculate for 1.5 seconds
      }
    }, 150); // Type each character with 150ms delay
  };

  // Start animation when component mounts or dish changes
  useEffect(() => {
    // Start typing the current dish name
    animateTyping(sampleDishes[dishIndex].name);
    
    // Cleanup function to clear all timeouts and intervals
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, [dishIndex]);

  const features = [
    {
      icon: <LocalDiningIcon sx={{ fontSize: 40, color: '#4361ee' }} />,
      title: 'Track Meals',
      description: 'Easily log your meals and track calorie intake throughout the day.'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40, color: '#4361ee' }} />,
      title: 'Visualize Progress',
      description: 'View detailed charts and analytics to monitor your nutrition goals.'
    },
    {
      icon: <TimerIcon sx={{ fontSize: 40, color: '#4361ee' }} />,
      title: 'Save Time',
      description: 'Quick search for foods and their nutritional information in seconds.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4361ee 0%, #3730a3 100%)',
          color: 'white',
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Abstract Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-5%',
            right: '-5%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Track Your Meals With Precision
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  mb: 4,
                  maxWidth: '90%',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Make healthier choices with our intuitive meal calorie tracker. 
                Get accurate nutrition information for any meal in seconds.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '10px',
                    bgcolor: 'white',
                    color: '#4361ee',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '10px',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Log In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* Demo Calculator - MealForm Style */}
              <Box
                sx={{
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  p: 3,
                  width: '100%',
                  maxWidth: '450px',
                  height: '350px', // Fixed height to prevent resizing
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
                    Dish Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g. Pizza, Salad, Pasta"
                    value={displayText}
                    InputProps={{
                      readOnly: true,
                      endAdornment: isTyping ? <span className="cursor">|</span> : null,
                      startAdornment: <RestaurantMenuIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
                    }}
                    variant="outlined"
                  />
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#64748b' }}>
                    Demo showing: Pizza, Salad, Burger, Pasta, Chicken Curry, Sushi
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>
                    Number of Servings
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value="1"
                    InputProps={{
                      readOnly: true,
                      startAdornment: <PeopleIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />,
                    }}
                    variant="outlined"
                  />
                </Box>

                {/* Results or Calculating State with fixed height */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '76px' }}>
                  {isCalculating ? (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '8px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <CircularProgress size={20} sx={{ mr: 2, color: '#4361ee' }} />
                      <Typography>Calculating calories...</Typography>
                    </Box>
                  ) : showResult ? (
                    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: '8px', textAlign: 'center', width: '100%' }}>
                      <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
                        {sampleDishes[dishIndex].name}: {sampleDishes[dishIndex].calories} calories
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box
          id="features"
          sx={{
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: '#1e293b',
            }}
          >
            Make Healthy Choices
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 8,
              color: '#64748b',
              fontWeight: 400,
            }}
          >
            Our meal calorie tracker helps you stay on top of your nutrition
            goals with powerful yet easy-to-use features.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: '#f8fafc',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#1e293b',
              }}
            >
              Start Your Journey Today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: '#64748b',
                fontSize: '1.125rem',
              }}
            >
              Join thousands of users who have transformed their eating habits with our meal calorie tracker.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/register"
                variant="contained"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '10px',
                  bgcolor: '#4361ee',
                  '&:hover': {
                    bgcolor: '#3854d1',
                  },
                }}
              >
                Create Free Account
              </Button>
              <Button
                component="a"
                href="#features"
                variant="outlined"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '10px',
                  borderColor: '#4361ee',
                  color: '#4361ee',
                  '&:hover': {
                    borderColor: '#3854d1',
                    bgcolor: 'rgba(67, 97, 238, 0.04)',
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
