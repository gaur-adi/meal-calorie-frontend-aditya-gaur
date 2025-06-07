import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || path === '/login' || path === '/register';

  // Get the token from the cookies
  const isAuthenticated = request.cookies.has('auth-storage');

  // If the path is public and user is authenticated, redirect to dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the path is protected and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 