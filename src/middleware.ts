import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Function to verify JWT token without bcrypt
async function verifyJWT(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    // Using jose library for JWT verification in Edge Runtime
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return false;
  }
}

// Simplified middleware - no authentication checks for now
export async function middleware(request: NextRequest) {
  // Get path
  const path = request.nextUrl.pathname;
  
  // Define public routes that don't require authentication
  const isPublicRoute = path === '/' || path === '/login' || path === '/register';
  
  // Define protected routes that require authentication
  const isProtectedRoute = path === '/dashboard' || path.startsWith('/dashboard/');
  
  // Get token from authorization header or cookies
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth-token')?.value;
  
  // The token to verify (prioritize header over cookie)
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : cookieToken;
    
  // Check if the token is valid
  const isAuthenticated = token ? await verifyJWT(token) : false;
  
  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // Redirect to dashboard if accessing login/register when already authenticated
  if (isPublicRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
  
  // Allow the request to continue for all other scenarios
  return NextResponse.next();
}

// Update matcher to only handle necessary paths
export const config = {
  matcher: [
    '/', 
    '/login', 
    '/register', 
    '/dashboard/:path*'
  ],
} 