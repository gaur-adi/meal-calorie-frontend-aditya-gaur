import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { protectRoute } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1";

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await protectRoute(request);
    if (user instanceof NextResponse) {
      return user; // Return error response if authentication failed
    }

    // Handle CORS
    const headersList = await headers();
    const origin = headersList.get("origin") || "*";

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const { dishName, servings } = await request.json();

    if (!dishName) {
      return NextResponse.json(
        { error: "Dish name is required" },
        { 
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          }
        }
      );
    }

    // Search for the food item
    const searchResponse = await fetch(
      `${USDA_API_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(
        dishName
      )}&pageSize=1`
    );

    if (!searchResponse.ok) {
      throw new Error("Failed to search for food item");
    }

    const searchData = await searchResponse.json();

    if (!searchData.foods || searchData.foods.length === 0) {
      return NextResponse.json(
        { error: "No food items found" },
        { 
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          }
        }
      );
    }

    const foodId = searchData.foods[0].fdcId;

    // Get detailed food information
    const detailsResponse = await fetch(
      `${USDA_API_URL}/food/${foodId}?api_key=${USDA_API_KEY}`
    );

    if (!detailsResponse.ok) {
      throw new Error("Failed to get food details");
    }

    const detailsData = await detailsResponse.json();

    // Calculate calories
    const energyNutrient = detailsData.foodNutrients?.find(
      (n: { nutrientName?: string; value: number }) => n.nutrientName?.toLowerCase().includes('energy')
    );

    if (!energyNutrient) {
      return NextResponse.json(
        { error: "Calorie information not available for this food item" },
        { 
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          }
        }
      );
    }

    const caloriesPerServing = energyNutrient.value;
    const totalCalories = caloriesPerServing * (servings || 1);

    // Save meal to database
    await prisma.meal.create({
      data: {
        userId: user.id,
        dishName,
        servings: servings || 1,
        calories: totalCalories,
      },
    });

    return NextResponse.json(
      {
        dish_name: dishName,
        servings: servings || 1,
        calories_per_serving: caloriesPerServing,
        total_calories: totalCalories,
        source: "USDA Food Database",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 