"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.replace('/login');
  }, [router]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)'
    }}>
      <CircularProgress size={40} sx={{ mb: 2, color: '#4361ee' }} />
      <Typography variant="body1" color="text.secondary">
        Redirecting to login...
      </Typography>
    </Box>
  );
}
