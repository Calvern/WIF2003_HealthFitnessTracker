import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStepSummary = (mode, dateIndex = 0) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDateRange = () => {
    const today = new Date();

    if (mode === "daily") {
      const base = new Date(today);
      const day = base.getDay();
      const mondayOffset = (day === 0 ? -6 : 1) - day;

      const monday = new Date(base);
      monday.setDate(base.getDate() + mondayOffset + dateIndex * 7);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      return {
        startDate: monday.toISOString().split("T")[0],
        endDate: sunday.toISOString().split("T")[0],
        year: monday.getFullYear(),
        month: monday.getMonth() + 1,
      };
    }

    if (mode === "weekly") {
      const current = new Date(today.getFullYear(), today.getMonth() + dateIndex, 1);
      return {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
      };
    }

    if (mode === "monthly") {
      const current = new Date(today.getFullYear() + dateIndex, 0, 1);
      return {
        year: current.getFullYear(),
      };
    }

    return null;
  };

  useEffect(() => {
    const fetchSteps = async () => {
      setIsLoading(true);

      const r = getDateRange();
      setRange(r);

      try {
        let url = `${API_BASE_URL}/api/exercises/steps/summary`;
        const params = { mode };

        if (mode === "daily") {
          params.startDate = r.startDate;
          params.endDate = r.endDate;
        } else if (mode === "weekly" || mode === "monthly") {
          params.year = r.year;
        }

        const res = await axios.get(url, {
          params,
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        console.log("✅ Step Summary API response:", res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching step summary:", err.response?.data || err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSteps();
  }, [mode, dateIndex]);

  return { data, isLoading, range };
};