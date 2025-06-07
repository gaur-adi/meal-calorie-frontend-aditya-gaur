import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Simple in-memory store - this will reset on server restart
// In production, use a proper rate limiting solution like Redis or a database
const rateLimitStore: RateLimitStore = {};

// Rate limit configuration
interface RateLimitConfig {
  tokensPerInterval: number; // Number of allowed requests per interval
  interval: number; // Interval in milliseconds
  identifier: string; // Unique identifier for the limit type (e.g., 'login', 'register')
}

// Default rate limit settings: 10 requests per minute
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  tokensPerInterval: 10,
  interval: 60 * 1000, // 1 minute
  identifier: 'default',
};

export interface RateLimitResult {
  isLimited: boolean;
  remainingTokens: number;
  msBeforeNext: number;
}

/**
 * Simple rate limiting function suitable for Edge Runtime
 */
export async function rateLimit(
  req: NextRequest,
  config?: Partial<RateLimitConfig>
): Promise<RateLimitResult> {
  // Merge default config with provided config
  const { tokensPerInterval, interval, identifier } = {
    ...DEFAULT_RATE_LIMIT,
    ...config,
  };

  // Get client IP or fallback to a default
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'anonymous';
  
  // Create a key combining the identifier and IP
  const key = `${identifier}:${ip}`;
  
  const now = Date.now();
  
  // Initialize or get existing entry
  if (!rateLimitStore[key]) {
    rateLimitStore[key] = {
      count: tokensPerInterval,
      resetTime: now + interval,
    };
  }
  
  // Reset if interval has passed
  if (now > rateLimitStore[key].resetTime) {
    rateLimitStore[key] = {
      count: tokensPerInterval,
      resetTime: now + interval,
    };
  }
  
  // Check remaining tokens
  const remainingTokens = Math.max(0, rateLimitStore[key].count);
  const msBeforeNext = Math.max(0, rateLimitStore[key].resetTime - now);
  
  // If we have tokens, decrement and allow
  if (remainingTokens > 0) {
    rateLimitStore[key].count--;
    
    return {
      isLimited: false,
      remainingTokens: rateLimitStore[key].count,
      msBeforeNext,
    };
  }
  
  // No tokens left, rate limit
  return {
    isLimited: true,
    remainingTokens: 0,
    msBeforeNext,
  };
} 