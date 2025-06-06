"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Meal Calorie Count Generator</h1>
      <p className="mb-8 text-zinc-500">Track your meal calories easily.</p>
      <div className="flex space-x-4">
        <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    </div>
  );
}
