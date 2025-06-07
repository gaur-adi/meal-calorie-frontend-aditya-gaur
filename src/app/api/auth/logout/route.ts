import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = req.cookies.get('session-token')?.value;

    if (sessionToken) {
      // Find auth record with this session token and clear it
      await prisma.auth.updateMany({
        where: { sessionToken },
        data: {
          sessionToken: null,
          tokenExpiry: null,
        },
      });
    }

    // Create response that clears the session token cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.delete('session-token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 