import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from './prismadb';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export async function verifyAuth(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return false;
  }
  
  try {
    const payload = await verifyToken(token);
    if (!payload) return false;
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    
    if (!user) {
      return false;
    }
    
    return true;
  } catch (err) {
    return false;
  }
}

// Hash password (server-side only)
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password with hash (server-side only)
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token using jose
export const generateToken = async (userId: string): Promise<string> => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
  
  return token;
};

// Verify JWT token using jose
export const verifyToken = async (token: string): Promise<{ userId: string } | null> => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.userId as string };
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};

// Extract token from request
export const getTokenFromRequest = (req: NextRequest): string | null => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

// Get user from token
export const getUserFromToken = async (token: string): Promise<any> => {
  const payload = await verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  return user;
};

// Check if request is authenticated
export const isAuthenticated = async (req: NextRequest): Promise<any> => {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return await getUserFromToken(token);
};

export async function protectRoute(req: NextRequest) {
  const authResult = await verifyAuth(req);
  
  if (!authResult) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return authResult;
} 