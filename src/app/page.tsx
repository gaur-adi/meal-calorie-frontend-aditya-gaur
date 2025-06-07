"use client";

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

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
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
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
                  maxWidth: 700,
                  margin: '0 auto',
                }}
              >
                Simplify your nutrition tracking with our intelligent calorie calculator.
                Quick, accurate, and easy to use.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f1f5f9', py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Meal Calorie Tracker. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
