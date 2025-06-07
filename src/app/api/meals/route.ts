import { NextResponse } from "next/server";
import { protectRoute } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await protectRoute(request);
    if (user instanceof NextResponse) {
      return user; // Return error response if authentication failed
    }

    // Get meals for the authenticated user
    const meals = await prisma.meal.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Failed to fetch meals" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const user = await protectRoute(request);
    if (user instanceof NextResponse) {
      return user; // Return error response if authentication failed
    }

    const { searchParams } = new URL(request.url);
    const mealId = searchParams.get('id');

    if (!mealId) {
      return NextResponse.json(
        { error: "Meal ID is required" },
        { status: 400 }
      );
    }

    // Verify the meal belongs to the user before deleting
    const meal = await prisma.meal.findFirst({
      where: {
        id: mealId,
        userId: user.id,
      },
    });

    if (!meal) {
      return NextResponse.json(
        { error: "Meal not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the meal
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting meal:", error);
    return NextResponse.json(
      { error: "Failed to delete meal" },
      { status: 500 }
    );
  }
} 