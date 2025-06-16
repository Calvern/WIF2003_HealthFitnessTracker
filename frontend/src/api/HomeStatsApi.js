import axios from "axios";

export const useFetchCalorieStats = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [consumed, burned] = await Promise.all([
    axios.get("/api/food-diary/calorie-summary-day", { headers }),
    axios.get("/api/exercises/calorie-out-summary?mode=daily", { headers }),
  ]);

  return {
    consumed: consumed.data, 
    burned: burned.data,     
  };
};
