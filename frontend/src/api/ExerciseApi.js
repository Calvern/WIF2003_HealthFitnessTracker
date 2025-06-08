import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const logExercise = async (exerciseData) => {
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
    cardio.forEach((c) => {
      allActivities.push({ ...c, type: "cardio", date, id: c._id });
    });

    workout.forEach((w) => {
      allActivities.push({ ...w, type: "workout", date, id: w._id });
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

export const fetchSteps = async () => {
  const response = await fetch(`${API_BASE_URL}/api/exercises/steps/today`, {
    credentials: "include",
  });

  const todayEntry = await response.json();
  if (!todayEntry) {
    return { steps: 0 };
  }

  return {
    steps: todayEntry.steps || 0,
  };
};

export const fetchCardioDuration = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/exercises/cardio/duration`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  return data.totalDuration || 0;
};

export const fetchCaloriesBurned = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/exercises/calories/burned`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();
  return data.totalCalories || 0;
};

const getThisWeekDates = () => {
  const today = new Date();
  const day = today.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }
  return dates;
};

export const fetchWeeklyAverages = async () => {
  const dates = getThisWeekDates().join(",");

  const res = await fetch(
    `${API_BASE_URL}/api/exercises/summary/weekly?dates=${dates}`,
    { credentials: "include" }
  );

  const data = await res.json();
  return data;
};

export const updateCardioExercise = async ({ id, data }) => {
  console.log("Updating exercise:", id, data);
  const res = await fetch(`${API_BASE_URL}/api/exercises/update/cardio/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update exercise");

  return res.json();
};

export const updateWorkoutExercise = async ({ id, data }) => {
  const res = await fetch(`${API_BASE_URL}/api/exercises/update/workout/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update workout exercise");

  return res.json();
};

export async function deleteCardioExercise(id) {
  const response = await fetch(`${API_BASE_URL}/api/exercises/delete/cardio/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete exercise");
    
  }

  return response.json();
}

export async function deleteWorkoutExercise(id) {
  const response = await fetch(`${API_BASE_URL}/api/exercises/delete/workout/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete workout exercise");
  }

  return response.json();
}
