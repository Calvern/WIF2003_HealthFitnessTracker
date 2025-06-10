import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchMeal = (searchParams) => {
  const searchParam = new URLSearchParams();
  searchParam.append("page", searchParams.page || "");
  searchParam.append("query", searchParams.query || "");
  const searchMealRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/meal/search?${searchParam}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to search meal");
    }

    return response.json();
  };

  const {
    data: searchResults,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["searchMeal", searchParams],
    queryFn: searchMealRequest,
  });

  return {
    searchResults,
    isPending,
    isError,
  };
};

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
  const { data: recipeUrl, isPending } = useQuery({
    queryKey: ["getRecipeImage", mealId],
    queryFn: getRecipeImageRequest,
    enabled: !!mealId,
  });

  return {
    recipeUrl,
    isPending,
  };
};

export const useAddMealToFavourite = () => {
  const { showToast } = useAppContext();
  const addMealToFavouriteRequest = async (mealData) => {
    const response = await fetch(`${API_BASE_URL}/api/meal/favourites`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealData),
    });

    if (!response.ok) {
      throw new Error("Failed to add meal to favourite");
    }
    return response.json();
  };

  const { mutateAsync: addMealToFavourite, isPending } = useMutation({
    mutationFn: addMealToFavouriteRequest,
    onSuccess: async () => {
      showToast("Added meal to favourites successfully");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    addMealToFavourite,
    isPending,
  };
};

export const useDeleteMealFromFavourite = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const deleteMealFromFavouriteRequest = async (mealId) => {
    const response = await fetch(
      `${API_BASE_URL}/api/meal/favourites/${mealId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete from favourites");
    }
    return response.json();
  };

  const { mutateAsync: deleteMealFromFavourite, isPending } = useMutation({
    mutationFn: deleteMealFromFavouriteRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries("getFavouriteMeals");
      showToast("Meal successfully removed from favourites");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    deleteMealFromFavourite,
    isPending,
  };
};

export const useGetFavouriteMeals = (page) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", page);
  const getFavouriteMealsRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/meal/favourites?${queryParams}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get favourite meals");
    }
    return response.json();
  };
  const {
    data: favouriteMeals,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getFavouriteMeals", page],
    queryFn: getFavouriteMealsRequest,
  });

  return {
    favouriteMeals,
    isPending,
    isError,
  };
};
