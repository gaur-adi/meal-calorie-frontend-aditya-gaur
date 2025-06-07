"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation';
import { useAuthStore } from "@/stores/authStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  
  // List of public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {(isAuthenticated || isPublicRoute) && (
          <>
            {isAuthenticated && <Navbar />}
            {children}
            <Toaster position="bottom-right" />
          </>
        )}
      </body>
    </html>
  );
}
