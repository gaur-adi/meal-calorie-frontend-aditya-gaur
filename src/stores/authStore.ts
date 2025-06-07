import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
}

// Mock user data
const mockUser: User = {
  id: "mock-user-id",
  email: "user@example.com",
  firstName: "Demo",
  lastName: "User"
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser, // Always authenticated for demo
  isAuthenticated: true, // Always authenticated for demo

  login: async () => {
    set({ user: mockUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: mockUser, isAuthenticated: true }); // Still keep authenticated for demo
  }
})); 