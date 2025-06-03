import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const logExercise = async (exerciseData) => {
  console.log("Sending to backend:", exerciseData);
  const res =await fetch(`${API_BASE_URL}/api/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(exerciseData),
  });

  if (!res.ok) throw new Error("Failed to log exercise");
  return res.json();
};

export const fetchExercises = async () => {
  const res = await fetch(`${API_BASE_URL}/api/exercises`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
};
