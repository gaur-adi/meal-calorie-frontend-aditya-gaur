import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import { isAuthenticated } from "@/lib/auth";

// DELETE: Clear all meals for the current user
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Delete all meals for the user
    await prisma.meal.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "All meal history cleared" 
    });
  } catch (error) {
    console.error("Failed to clear meal history:", error);
    return NextResponse.json(
      { message: "Failed to clear meal history" },
      { status: 500 }
    );
  }
} 