import { NextResponse } from "next/server";
import { headers } from "next/headers";

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1";

export async function POST(request: Request) {
  try {
    // Handle CORS
    const headersList = headers();
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
    const foodResponse = await fetch(
      `${USDA_API_URL}/food/${foodId}?api_key=${USDA_API_KEY}`
    );

    if (!foodResponse.ok) {
      throw new Error("Failed to get food details");
    }

    const foodData = await foodResponse.json();

    // Calculate calories
    const caloriesPerServing = foodData.foodNutrients.find(
      (nutrient: any) => nutrient.nutrientId === 1008
    )?.value || 0;

    const totalCalories = caloriesPerServing * (servings || 1);

    return NextResponse.json(
      {
        dishName,
        servings: servings || 1,
        caloriesPerServing,
        totalCalories,
        ingredients: [dishName],
      },
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      }
    );
  } catch (error) {
    console.error("Error in calories API:", error);
    return NextResponse.json(
      { error: "Failed to calculate calories" },
      { 
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      }
    );
  }
} 