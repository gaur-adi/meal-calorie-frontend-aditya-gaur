import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simplified middleware - no authentication checks for now
export async function middleware(request: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next();
}

// Update matcher to only handle necessary paths
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