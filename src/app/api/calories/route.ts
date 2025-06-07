import { NextResponse } from "next/server";
import axios from "axios";

const USDA_API_KEY = process.env.USDA_API_KEY || "DEMO_KEY";
const USDA_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

interface Nutrient {
  nutrientName?: string;
  nutrientId?: number;
  value: number;
}

export async function POST(request: Request) {
  try {
    // Get food query from request
    const { dishName, servings = 1 } = await request.json();
    
    if (!dishName) {
      return NextResponse.json(
        { message: "Dish name is required" },
        { status: 400 }
      );
    }

    // Make request to USDA API
    const response = await axios.get(USDA_SEARCH_URL, {
      params: {
        api_key: USDA_API_KEY,
        query: dishName,
        pageSize: 1,
        dataType: "Foundation,SR Legacy"
      }
    });

    const data = response.data;
    
    // Check if foods were found
    if (!data.foods || data.foods.length === 0) {
      return NextResponse.json(
        { message: "No nutritional data found for this dish" },
        { status: 404 }
      );
    }

    const food = data.foods[0];
    
    // Find calories nutrient (energy)
    const caloriesNutrient = food.foodNutrients.find(
      (nutrient: Nutrient) => 
        nutrient.nutrientName === "Energy" || 
        nutrient.nutrientName?.includes("Energy") ||
        nutrient.nutrientId === 1008
    );

    if (!caloriesNutrient) {
      return NextResponse.json(
        { message: "No calorie data found for this dish" },
        { status: 404 }
      );
    }

    const caloriesPerServing = caloriesNutrient.value;
    const totalCalories = caloriesPerServing * servings;

    return NextResponse.json({
      calories_per_serving: caloriesPerServing,
      total_calories: totalCalories,
      servings: servings,
      dish_name: dishName,
      source: "USDA Food Database"
    });
  } catch (error) {
    console.error("Calories API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch calorie data" },
      { status: 500 }
    );
  }
} 