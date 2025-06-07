import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          set({ user: { email: user.email, name: user.name }, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (email: string, password: string, name: string) => {
        // Get existing users
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        // Check if user already exists
        if (users.some((u: any) => u.email === email)) {
          return false;
        }
        
        // Add new user
        users.push({ email, password, name });
        localStorage.setItem("users", JSON.stringify(users));
        
        // Auto login after registration
        set({ user: { email, name }, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
); 