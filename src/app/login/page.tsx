"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Paper elevation={3} className="w-full max-w-md p-8">
        <Typography variant="h4" component="h1" className="text-center mb-6">
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            className="mt-4"
          >
            Login
          </Button>
        </form>

        <Box className="mt-4 text-center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
} 