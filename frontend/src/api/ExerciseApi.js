import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const logExercise = async (exerciseData) => {
  console.log("Sending to backend:", exerciseData);
  const res = await fetch(`${API_BASE_URL}/api/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(exerciseData),
  });

  if (!res.ok) throw new Error("Failed to log exercise");
  return res.json();
};

export const fetchExercisesRequest = async () => {
  const res = await fetch(`${API_BASE_URL}/api/exercises`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch exercises");

  const data = await res.json();
  return flattenExercises(data);
};

export const setDailyTarget = async (targetData) => {
  const res = await fetch(`${API_BASE_URL}/api/exercises/target`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(targetData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update target");
  }

  return res.json();
};

const flattenExercises = (data) => {
  const allActivities = [];

  data.forEach((entry) => {
    const { date, cardio = [], workout = [], steps = 0 } = entry;

    // if (steps > 0) {
    //   allActivities.push({
    //     name: `${steps.toLocaleString()} steps`,
    //     type: "steps",
    //     date,
    //   });
    // }

    cardio.forEach((c) => {
      allActivities.push({ ...c, type: "cardio", date });
    });

    workout.forEach((w) => {
      allActivities.push({ ...w, type: "workout", date });
    });
  });

  return allActivities.sort((a, b) => {
    const dateCompare = new Date(b.date) - new Date(a.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime?.localeCompare(b.startTime ?? "") ?? 0;
  });
};

export const logDailySteps = async (stepData) => {
  const res = await fetch(`${API_BASE_URL}/api/exercises/steps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(stepData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to log daily steps");
  }

  return res.json();
};