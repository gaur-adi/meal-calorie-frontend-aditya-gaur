import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectRoute, verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check if session token exists
    const sessionToken = request.cookies.get('session-token')?.value;
    console.log('ME endpoint: Session token exists:', !!sessionToken);
    
    // Use verifyAuth to get more detailed auth result
    const authResult = await verifyAuth(request);
    console.log('ME endpoint: Auth verification result:', authResult);
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error, authenticated: false },
        { status: 401 }
      );
    }

    // Return user data if authentication successful
    return NextResponse.json({ 
      user: authResult.user,
      authenticated: true 
    });
  } catch (error) {
    console.error('ME endpoint error:', error);
    return NextResponse.json(
      { error: "Unauthorized", authenticated: false },
      { status: 401 }
    );
  }
} 