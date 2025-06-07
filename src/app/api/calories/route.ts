import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const USDA_API_KEY = process.env.USDA_API_KEY || process.env.NEXT_PUBLIC_USDA_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // No authentication check required
    console.log("Processing calories request");
    
    const { dishName, servings } = await request.json();

    if (!dishName) {
      return NextResponse.json(
        { error: "Dish name is required" },
        { status: 400 }
      );
    }

    // Search for the food item using the USDA API
    console.log(`Searching for "${dishName}" using USDA API key: ${USDA_API_KEY ? "Present" : "Missing"}`);
    
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query: dishName,
        api_key: USDA_API_KEY,
        pageSize: 1,
      },
    });

    console.log('USDA API response:', response.data);

    if (!response.data.foods || response.data.foods.length === 0) {
      return NextResponse.json(
        { error: "No food items found" },
        { status: 404 }
      );
    }

    const food = response.data.foods[0];
    
    // Get the energy nutrient (calories)
    const energyNutrient = food.foodNutrients?.find(
      (n: any) => n.nutrientName?.toLowerCase().includes('energy')
    );

    if (!energyNutrient) {
      return NextResponse.json(
        { error: "Calorie information not available for this food item" },
        { status: 404 }
      );
    }

    const servingSize = food.servingSize || 100;
    const caloriesPerServing = Math.round((energyNutrient.value * servingSize) / 100);
    const totalCalories = caloriesPerServing * (servings || 1);

    // Return the calorie information
    return NextResponse.json({
      dish_name: dishName,
      servings: servings || 1,
      calories_per_serving: caloriesPerServing,
      total_calories: totalCalories,
      source: "USDA Food Database",
      foodDetails: {
        fdcId: food.fdcId,
        description: food.description,
        brandName: food.brandName,
      }
    });

  } catch (error: any) {
    console.error("Error:", error);
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key or unauthorized" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 