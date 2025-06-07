import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { NextRequest } from 'next/server';
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Rate limit: 10 login attempts per 15 minutes
  const rateLimitResult = await rateLimit(req, {
    tokensPerInterval: 10,
    interval: 15 * 60 * 1000, // 15 minutes
    identifier: 'login',
  });

  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { auth: true },
    });

    // If user not found or no auth record
    if (!user || !user.auth) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.auth.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await generateToken(user.id);

    // Return user data and token
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
} 