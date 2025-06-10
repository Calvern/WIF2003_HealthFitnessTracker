import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchCalories = async (mode) => {
  const [inRes, outRes] = await Promise.all([
    fetch(`${API_BASE_URL}/api/food-diary/calorie-summary?mode=${mode}`, { credentials: "include" }),
    fetch(`${API_BASE_URL}/api/exercises/calorie-out-summary?mode=${mode}`, { credentials: "include" }),
  ]);

  if (!inRes.ok || !outRes.ok) {
    throw new Error("Failed to load calorie data");
  }

  const [inData, outData] = await Promise.all([inRes.json(), outRes.json()]);
  return { inData, outData };
};

export const useCalorieSummary = (mode) => {
  return useQuery({
    queryKey: ["calorie-summary", mode],
    queryFn: () => fetchCalories(mode),
  });
};