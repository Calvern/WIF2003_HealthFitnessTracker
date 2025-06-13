import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCardioWorkoutSummary = (mode, dateIndex) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState({});

  useEffect(() => {
    const computeRange = () => {
      const today = new Date();
      if (mode === "daily") {
        const start = new Date(today);
        const offset = (start.getDay() === 0 ? -6 : 1) - start.getDay(); 
        start.setDate(start.getDate() + offset + dateIndex * 7);
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

    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const r = computeRange();
        setRange(r);

        if (mode === "daily") {
          const url = `${API_BASE_URL}/api/exercises/cardio-vs-workout-summary?mode=daily&startDate=${r.startDate}&endDate=${r.endDate}`;
          const res = await axios.get(url, { withCredentials: true });
          setData(Array.isArray(res.data) ? res.data : []);
        } else {
          const url = `${API_BASE_URL}/api/exercises/cardio-vs-workout-summary?mode=weekly&startDate=2000-01-01&endDate=2100-12-31`; // Backend handles grouping by week/year
          const res = await axios.get(url, { withCredentials: true });
          setData(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Error fetching cardio/workout summary:", err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [mode, dateIndex]);

  return { data, isLoading, range };
};

