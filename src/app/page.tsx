"use client";

import { Box, Button, Container, Grid, Typography, Card, CardContent, Stack } from '@mui/material';
import Link from 'next/link';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimerIcon from '@mui/icons-material/Timer';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function HomePage() {

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
          pt: { xs: 10, md: 16 },
          pb: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden',
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
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', md: '90%' },
                  height: { xs: 300, md: 400 },
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Food image */}
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Healthy meal with fresh vegetables"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
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

      {/* Testimonials Section */}
      <Box
        sx={{
          bgcolor: '#f1f5f9',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1e293b',
            }}
          >
            What Our Users Say
          </Typography>
          <Typography
            variant="h6"
            component="p"
            align="center"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 8,
              color: '#64748b',
              fontWeight: 400,
            }}
          >
            Hear from people who have transformed their relationship with food
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                quote: "This app has completely changed how I track my nutrition. It's so easy to use and the calorie estimates are very accurate.",
                author: "Sarah J.",
                role: "Fitness Enthusiast",
              },
              {
                quote: "I've lost 15 pounds since I started using this app. Being able to quickly check calories for any meal has made healthy eating so much easier.",
                author: "Michael T.",
                role: "Software Developer",
              },
              {
                quote: "As a nutritionist, I recommend this app to all my clients. The interface is clean and the data is reliable.",
                author: "Dr. Lisa Wang",
                role: "Certified Nutritionist",
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontSize: '1.1rem',
                        fontStyle: 'italic',
                        color: '#475569',
                        flexGrow: 1,
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
