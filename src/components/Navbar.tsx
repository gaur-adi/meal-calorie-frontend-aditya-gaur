"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useAuthStore } from "@/stores/authStore";
import Cookies from 'js-cookie';
import axios from 'axios';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Determine if current page is dashboard
  const isDashboardPage = pathname === '/dashboard';

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
            {isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  href={isDashboardPage ? "/" : "/dashboard"}
                  color="primary"
                  variant="text"
                >
                  {isDashboardPage ? "Home" : "Dashboard"}
                </Button>
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
              </>
            ) : (
              <>
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
                  href="/login"
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 