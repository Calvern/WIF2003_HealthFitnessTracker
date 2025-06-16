// src/hooks/useStepSummaryForHome.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStepSummaryForHome = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setIsLoading(true);

        const today = new Date();
        const start = new Date(today);
        const end = new Date(today);

        const currentDay = today.getDay();
        const mondayOffset = (currentDay === 0 ? -6 : 1) - currentDay;

        start.setDate(today.getDate() + mondayOffset);
        end.setDate(start.getDate() + 6);

        const startDate = start.toISOString().split("T")[0];
        const endDate = end.toISOString().split("T")[0];

        const res = await axios.get(`${API_BASE_URL}/api/exercises/steps/summary`, {
          params: {
            mode: "daily",
            startDate,
            endDate,
          },
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        const steps = res.data;
        const keys = [...Array(7)].map((_, i) => {
          const d = new Date(start);
          d.setDate(start.getDate() + i);
          return d.toISOString().split("T")[0];
        });

        const stepMap = new Map(steps.map((s) => [s._id.date, s.totalSteps || 0]));
        const values = keys.map((k) => stepMap.get(k) || 0);

        setData(values);
        setAvg(Math.round(values.reduce((a, b) => a + b, 0) / 7));
      } catch (err) {
        console.error("Failed to fetch steps", err);
        setData([]);
        setAvg(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSteps();
  }, []);

  return { data, avg, isLoading };
};
