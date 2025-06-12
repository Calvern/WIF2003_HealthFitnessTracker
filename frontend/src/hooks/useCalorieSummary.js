import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCalorieSummary = (mode, dateIndex) => {
  const [data, setData] = useState({ inData: [], outData: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState({});

  useEffect(() => {
    const computeRange = () => {
      const today = new Date();
      if (mode === "daily") {
        const start = new Date(today);
        const dayOfWeek = start.getDay(); // 0=Sun, 1=Mon
        const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        start.setDate(start.getDate() + mondayOffset + dateIndex * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return {
          startDate: start.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        };
      }

      if (mode === "weekly") {
        const base = new Date(today.getFullYear(), today.getMonth() + dateIndex, 1);
        return {
          month: base.getMonth() + 1,
          year: base.getFullYear(),
        };
      }

      return {};
    };

    const fetchSummaries = async () => {
      try {
        setIsLoading(true);
        const r = computeRange();
        setRange(r);

        const foodUrl =
          mode === "daily"
            ? `${API_BASE_URL}/api/food-diary/calorie-summary?mode=daily&startDate=${r.startDate}&endDate=${r.endDate}`
            : `${API_BASE_URL}/api/food-diary/calorie-summary?mode=weekly&month=${r.month}&year=${r.year}`;

        const exerciseUrl =
          mode === "daily"
            ? `${API_BASE_URL}/api/exercises/calorie-out-summary?mode=daily`
            : `${API_BASE_URL}/api/exercises/calorie-out-summary?mode=weekly`;

        const [foodRes, exerciseRes] = await Promise.all([
          axios.get(foodUrl, { withCredentials: true }),
          axios.get(exerciseUrl, { withCredentials: true }),
        ]);

        setData({
          inData: Array.isArray(foodRes.data) ? foodRes.data : [],
          outData: Array.isArray(exerciseRes.data) ? exerciseRes.data : [],
        });
      } catch (err) {
        console.error("Error fetching summaries:", err.message);
        setData({ inData: [], outData: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, [mode, dateIndex]);

  return { data, isLoading, range };
};