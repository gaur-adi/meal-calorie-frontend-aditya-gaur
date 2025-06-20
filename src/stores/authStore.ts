import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthResponse = {
  token: string;
  user: User;
  [key: string]: string | number | boolean | User | null | undefined;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  checkAuth: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });
          
          set({ 
            token: response.data.token, 
            user: response.data.user, 
            isAuthenticated: true, 
            isLoading: false 
          });

          return response.data;
        } catch (error: unknown) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed. Please try again.' 
          });
          throw error;
        }
      },

      register: async (firstName: string, lastName: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await axios.post<AuthResponse>('/api/auth/register', { 
            firstName, 
            lastName, 
            email, 
            password 
          });
          
          set({
            token: response.data.token,
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false
          });

          return response.data;
        } catch (error: unknown) {
          const errorMessage = 
            error instanceof AxiosError 
              ? error.response?.data?.message || 'Registration failed. Please try again.'
              : 'Registration failed. Please try again.';
              
          set({
            isLoading: false,
            error: errorMessage
          });
          throw error;
        }
      },

      logout: () => {
        // Clear the auth-token cookie
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        set({ token: null, user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const state = get();
        return !!state.token && !!state.user;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 