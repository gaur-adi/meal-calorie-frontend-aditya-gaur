import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export async function verifyAuth(
  req: NextRequest
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    // Get session token from cookie
    const sessionToken = req.cookies.get('session-token')?.value;

    if (!sessionToken) {
      return { success: false, error: 'No session token found' };
    }

    // Verify JWT token
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

    if (!auth) {
      return { success: false, error: 'Invalid or expired session' };
    }

    // Return user data without sensitive information
    return {
      success: true,
      user: {
        id: auth.user.id,
        email: auth.user.email,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
      },
    };
  } catch (error) {
    return { success: false, error: 'Invalid session token' };
  }
}

export async function protectRoute(req: NextRequest) {
  const authResult = await verifyAuth(req);

  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  return authResult.user;
} 