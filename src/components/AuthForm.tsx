"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser, loginUser } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthFormProps = {
  mode: "register" | "login";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
    defaultValues:
      mode === "register"
        ? { first_name: "", last_name: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const onSubmit = async (values: any) => {
    setError("");
    try {
      if (mode === "register") {
        const res = await registerUser(values);
        setAuth(res.data.user, res.data.token);
        router.push("/dashboard");
      } else {
        const res = await loginUser(values);
        setAuth(res.data.user, res.data.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {mode === "register" && (
        <>
          <Input placeholder="First Name" {...form.register("first_name")} />
          <Input placeholder="Last Name" {...form.register("last_name")} />
        </>
      )}
      <Input placeholder="Email" type="email" {...form.register("email")} />
      <Input placeholder="Password" type="password" {...form.register("password")} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full">
        {mode === "register" ? "Register" : "Login"}
      </Button>
    </form>
  );
} 