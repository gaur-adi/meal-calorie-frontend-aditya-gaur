import { AuthForm } from "@/components/AuthForm";
import { Metadata } from "next";

// SEO metadata
export const metadata: Metadata = {
  title: "Register | Meal Calorie Counter",
  description: "Create a new account",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
} 