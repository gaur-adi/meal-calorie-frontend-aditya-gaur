"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Show loading or null while checking auth
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 