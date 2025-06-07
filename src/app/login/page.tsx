"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        // Log user data from auth store
        const user = useAuthStore.getState().user;
        console.log("Login successful! User data:", user);
        
        toast.success("Login successful!");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 100);
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 600, color: '#2563eb' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
            {...register("email")}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 3 }}
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)',
              },
            }}
          >
            Login
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 