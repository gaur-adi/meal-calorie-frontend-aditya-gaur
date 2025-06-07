import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import { NextRequest } from 'next/server';
import { hashPassword, generateToken } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { PrismaClient } from '@prisma/client';

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req);
  
  if (rateLimitResult.isLimited) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { firstName, lastName, email, password } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and auth record in a transaction
    const user = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
        },
      });

      // Create auth record
      await tx.auth.create({
        data: {
          userId: newUser.id,
          password: hashedPassword,
        },
      });

      return newUser;
    });

    // Generate JWT token
    const token = await generateToken(user.id);

    // Return user data and token
    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
} 