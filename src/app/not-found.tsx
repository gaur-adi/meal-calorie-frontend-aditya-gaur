import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8 text-zinc-500">The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">Go back home</Link>
    </div>
  );
} 