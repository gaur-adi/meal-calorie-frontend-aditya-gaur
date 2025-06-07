import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || path === '/login' || path === '/register';

  // Get the session token from the cookies
  const sessionToken = request.cookies.get('session-token')?.value;

  // If there's no session token and the path is not public, redirect to login
  if (!sessionToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there is a session token
  if (sessionToken) {
    try {
      // Verify the token
      jwt.verify(sessionToken, JWT_SECRET);

      // Find auth record with this session token
      const auth = await prisma.auth.findFirst({
        where: {
          sessionToken,
          tokenExpiry: {
            gt: new Date(), // Token hasn't expired
          },
        },
        include: {
          user: true,
        },
      });

      // If no auth record found or token expired, clear the cookie and redirect to login
      if (!auth && !isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session-token');
        return response;
      }

      // If user is authenticated and trying to access public routes, redirect to dashboard
      if (auth && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If token is invalid, clear it and redirect to login
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session-token');
        return response;
      }
    }
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