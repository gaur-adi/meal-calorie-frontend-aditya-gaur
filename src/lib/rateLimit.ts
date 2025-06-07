import { RateLimiter } from 'limiter';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Store for rate limiters
const limiters = new Map<string, RateLimiter>();

interface RateLimitConfig {
  tokensPerInterval: number;
  interval: number; // in milliseconds
  identifier: string;
}

export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<{ success: boolean; response?: NextResponse }> {
  const { tokensPerInterval, interval, identifier } = config;
  
  // Get IP address
  const ip = req.ip || 'anonymous';
  const key = `${identifier}-${ip}`;

  // Get or create limiter for this IP
  if (!limiters.has(key)) {
    limiters.set(
      key,
      new RateLimiter({
        tokensPerInterval,
        interval,
      })
    );
  }

  const limiter = limiters.get(key)!;
  const hasToken = await limiter.tryRemoveTokens(1);

  if (!hasToken) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(interval / 1000).toString(),
          }
        }
      ),
    };
  }

  return { success: true };
} 