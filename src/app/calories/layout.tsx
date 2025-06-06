import { AuthGuard } from "@/components/AuthGuard";

export default function CaloriesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
} 