import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface StoredUser extends User {
  password: string;
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
        const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
        const user = users.find((u) => u.email === email && u.password === password);
        
        if (user) {
          set({ user: { email: user.email, name: user.name }, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (email: string, password: string, name: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
        
        if (users.some((u) => u.email === email)) {
          return false;
        }
        
        users.push({ email, password, name });
        localStorage.setItem("users", JSON.stringify(users));
        
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