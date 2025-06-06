import { AuthForm } from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <AuthForm mode="register" />
      </div>
    </div>
  );
} 