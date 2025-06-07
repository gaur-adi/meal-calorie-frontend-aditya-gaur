import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { rateLimit } from '@/lib/rateLimit';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  // Rate limit: 5 registration attempts per hour
  const rateLimitResult = await rateLimit(req, {
    tokensPerInterval: 5,
    interval: 60 * 60 * 1000, // 1 hour
    identifier: 'register',
  });

  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  try {
    const { email, password, firstName, lastName } = await req.json();

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { auth: true }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate session token
    const sessionToken = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '15d' }
    );

    // Calculate token expiry (15 days from now)
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 15);

    // Create user and auth record in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create user first
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });

      // Create auth record
      const auth = await prisma.auth.create({
        data: {
          userId: user.id,
          password: hashedPassword,
          sessionToken,
          tokenExpiry,
        },
      });

      return { user, auth };
    });

    // Create response with session token cookie
    const response = NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      },
      token: sessionToken,
    });

    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: tokenExpiry,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 