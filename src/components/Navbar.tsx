"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';

export function Navbar() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
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
            <Button
              component={Link}
              href="/dashboard"
              color="primary"
              variant="text"
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              href="/calories"
              color="primary"
              variant="text"
            >
              Calories
            </Button>
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              color="error"
              variant="outlined"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 