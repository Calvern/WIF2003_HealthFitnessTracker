import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useRecommendMeals = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const recommendMealsRequest = async (formData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/food-diary/recommend-food`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json();
  };

  const { mutateAsync: recommendMeal, isPending } = useMutation({
    mutationFn: recommendMealsRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getDiaryByDate"] });
      showToast("Meals are recommended");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    recommendMeal,
    isPending,
  };
};

export const useGetDiaryByDate = (selectedDate) => {
  const getDiaryByDateReqeust = async () => {
    const params = new URLSearchParams();
    params.append("date", selectedDate);
    const response = await fetch(
      `${API_BASE_URL}/api/food-diary?${params.toString()}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to retrieve diary");
    }

    return response.json();
  };

  const { data: foodDiary, isPending } = useQuery({
    queryKey: ["getDiaryByDate", selectedDate],
    queryFn: getDiaryByDateReqeust,
    enabled: !!selectedDate,
  });

  return {
    foodDiary,
    isPending,
  };
};

export const useAddFoodToDiary = () => {
  const { showToast } = useAppContext();
  const addFoodToDiaryRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/food-diary`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to add food to diary");
    }
    return response.json();
  };
  const { mutateAsync: addFoodToDiary, isPending } = useMutation({
    mutationFn: addFoodToDiaryRequest,
    onSuccess: () => {
      showToast("Meal successfully added to diary");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    addFoodToDiary,
    isPending,
  };
};

export const useRemoveFoodFromDiary = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const removeFoodFromDiaryRequest = async (searchParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("date", searchParams.date);
    queryParams.append("type", searchParams.type);
    queryParams.append("mealId", searchParams.mealId);
    const response = await fetch(`${API_BASE_URL}/api/food-diary`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to remove food from diary");
    }

    return response.json();
  };
  const {
    mutateAsync: removeFoodFromDiary,
    isPending,
    isError,
  } = useMutation({
    mutationFn: removeFoodFromDiaryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDiaryByDate"] });
      showToast("Succesfully removed meal from diary");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    removeFoodFromDiary,
    isError,
    isPending,
  };
};

export const useGetCaloriesSummaryByDay = (params) => {
  const searchParams = new URLSearchParams();
  searchParams.append("date", params.date);

  const getCalorieSummaryByDayRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/food-diary/calorie-summary-day?${searchParams}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get calorie summary");
    }
    return response.json();
  };

  const { data: calorieSummary, isPending } = useQuery({
    queryKey: ["getCalorieSummaryByDay", params],
    queryFn: getCalorieSummaryByDayRequest,
  });

  return {
    calorieSummary,
    isPending,
  };
};
