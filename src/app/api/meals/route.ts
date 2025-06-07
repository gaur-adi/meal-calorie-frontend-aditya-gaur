import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import { isAuthenticated } from "@/lib/auth";

// POST: Create a new meal
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const { dishName, servings, caloriesPerServing, totalCalories, source } = await request.json();

    // Validate input
    if (!dishName || !servings || !caloriesPerServing || !totalCalories) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create meal in database
    const meal = await prisma.meal.create({
      data: {
        dishName,
        servings,
        caloriesPerServing,
        totalCalories,
        source: source || "USDA Food Database",
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "Meal saved successfully",
      meal,
    });
  } catch (error) {
    console.error("Failed to save meal:", error);
    return NextResponse.json(
      { message: "Failed to save meal" },
      { status: 500 }
    );
  }
}

// GET: Get all meals for the current user
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all meals for the user
    const meals = await prisma.meal.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ meals });
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return NextResponse.json(
      { message: "Failed to fetch meals" },
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