// src/hooks/useWeeklyCaloriesSummary.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useWeeklyCaloriesSummary = () => {
  const [inData, setInData] = useState([]);
  const [outData, setOutData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [avgIn, setAvgIn] = useState(0);
  const [avgOut, setAvgOut] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWeekRange = () => {
      const today = new Date();
      const start = new Date(today);
      const dayOfWeek = start.getDay(); // 0=Sun
      const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
      start.setDate(start.getDate() + mondayOffset);
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d.toISOString().split("T")[0];
      });
      return dates;
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dates = getWeekRange();

        const startDate = dates[0];
        const endDate = dates[6];

        const foodUrl = `${API_BASE_URL}/api/food-diary/calorie-summary?mode=daily&startDate=${startDate}&endDate=${endDate}`;
        const exerciseUrl = `${API_BASE_URL}/api/exercises/calorie-out-summary?mode=daily`;

        const [foodRes, exerciseRes] = await Promise.all([
          axios.get(foodUrl, { withCredentials: true }),
          axios.get(exerciseUrl, { withCredentials: true }),
        ]);

        const labelList = dates.map(d =>
          new Date(d).toLocaleDateString("en-GB", { weekday: "short" })
        );

        const foodMap = new Map(foodRes.data.map(d => [d._id.date, d.totalCalories]));
        const exerciseMap = new Map(exerciseRes.data.map(d => [d._id.date, d.totalCaloriesOut]));

        const caloriesIn = dates.map(d => foodMap.get(d) || 0);
        const caloriesOut = dates.map(d => exerciseMap.get(d) || 0);

        setInData(caloriesIn);
        setOutData(caloriesOut);
        setLabels(labelList);
        setAvgIn(Math.round(caloriesIn.reduce((a, b) => a + b, 0) / 7));
        setAvgOut(Math.round(caloriesOut.reduce((a, b) => a + b, 0) / 7));
      } catch (err) {
        console.error("Failed to fetch weekly calorie summary:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { inData, outData, labels, avgIn, avgOut, isLoading };
};
