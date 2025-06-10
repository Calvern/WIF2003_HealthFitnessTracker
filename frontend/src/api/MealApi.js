import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMealById = (mealId) => {
  const getMealByIdRequest = async (req, res) => {
    const response = await fetch(`${API_BASE_URL}/api/meal/${mealId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch meal details");
    }
    return response.json();
  };

  const { data: mealDetails, isPending } = useQuery({
    queryKey: ["getMealById", mealId],
    queryFn: getMealByIdRequest,
    enabled: !!mealId,
  });

  return {
    mealDetails,
    isPending,
  };
};

export const useGetNutritionImage = (mealId) => {
  const getNutritionImageRequest = async (req, res) => {
    const response = await fetch(
      `${API_BASE_URL}/api/meal/nutrition/${mealId}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch nutrition image");
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob); // creates usable image URL
  };

  const { data: nutritionImageUrl, isPending } = useQuery({
    queryKey: ["getNutritionImage", mealId],
    queryFn: getNutritionImageRequest,
    enabled: !!mealId,
  });

  return {
    nutritionImageUrl,
    isPending,
  };
};

export const useGetRecipeImage = (mealId) => {
  const getRecipeImageRequest = async (req, res) => {
    const response = await fetch(`${API_BASE_URL}/api/meal/recipe/${mealId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get recipe image");
    }
    const data = await response.json();
    return data.url;
  };
  const { data: recipeUrl, isLoading } = useQuery({
    queryKey: ["getRecipeImage", mealId],
    queryFn: getRecipeImageRequest,
    enabled: !!mealId,
  });

  return {
    recipeUrl,
    isLoading,
  };
};
