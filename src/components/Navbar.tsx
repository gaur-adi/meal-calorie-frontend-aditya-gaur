"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
          <Link href="/calories" className="text-blue-500 hover:underline">Calories</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
        </div>
      </div>
    </nav>
  );
} 