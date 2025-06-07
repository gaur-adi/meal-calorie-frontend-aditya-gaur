import { AuthForm } from "@/components/AuthForm";
import { Metadata } from "next";

// SEO metadata
export const metadata: Metadata = {
  title: "Login | Meal Calorie Counter",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
} 