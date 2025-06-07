"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Cookies from 'js-cookie';

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for registration validation with additional fields
const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Props for the AuthForm component
interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuthStore();
  
  // Select the appropriate schema based on the mode
  const schema = mode === "login" ? loginSchema : registerSchema;
  
  // Initialize react-hook-form with schema validation
  const { 
    register: registerField, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<any>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      let response;
      if (mode === "login") {
        response = await login(data.email, data.password);
      } else {
        response = await register(
          data.firstName, 
          data.lastName, 
          data.email, 
          data.password
        );
      }

      // Store token in cookies
      if (response?.token) {
        // Set the auth token as a cookie
        Cookies.set('auth-token', response.token, { 
          expires: 7, // 7 days
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        
        // Redirect to dashboard after a brief delay to allow cookie to be set
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); // Force a refresh to ensure middleware sees the new cookie
        }, 100);
      }
    } catch (error) {
      // Error is handled by the authStore
      console.error("Auth failed:", error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)" 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: "100%", 
          maxWidth: 500, 
          borderRadius: '16px',
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, color: "#4361ee", fontWeight: 600 }}>
          {mode === "login" ? "Login" : "Create Account"}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {/* Registration specific fields */}
          {mode === "register" && (
            <>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...registerField("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message?.toString()}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  {...registerField("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message?.toString()}
                />
              </Box>
            </>
          )}

          {/* Common fields */}
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            {...registerField("email")}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            {...registerField("password")}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            sx={{ mb: mode === "login" ? 3 : 2 }}
          />

          {/* Registration specific fields */}
          {mode === "register" && (
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              {...registerField("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message?.toString()}
              sx={{ mb: 3 }}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              bgcolor: '#4361ee',
              '&:hover': {
                bgcolor: '#3854d1',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <Link href={mode === "login" ? "/register" : "/login"} passHref>
                <MuiLink component="span" sx={{ fontWeight: 500, cursor: "pointer", color: "#4361ee" }}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </MuiLink>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 