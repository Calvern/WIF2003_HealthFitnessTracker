import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useCalorieSummary } from "../../hooks/useCalorieSummary";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ mode, dateIndex }) => {
  const { data, isLoading, range } = useCalorieSummary(mode, dateIndex); // ✅ add range
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <p>Loading chart...</p>;

  if (!range || (mode === "daily" && !range.startDate) || (mode === "weekly" && (!range.month || !range.year))) {
  return <p>Loading range...</p>;
  }

  // Convert _id to a key string
  const getKey = (id) => {
    if (!id) return "";
    if (typeof id === "string") return id;
    if (id.date) return id.date;
    if (id.week && id.year) return `${id.week}-${id.year}`;
    return JSON.stringify(id);
  };

  // Generate all keys to always show full range
  const getWeeklyDateKeys = (startDateStr) => {
    const startDate = new Date(startDateStr);
    return [...Array(7)].map((_, i) =>
      new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
        .toISOString()
        .split("T")[0]
    );
  };

  const getMonthWeekKeys = (year, month) => {
    const keys = new Set();
    const current = new Date(year, month - 1, 1);
    while (current.getMonth() === month - 1) {
      const isoWeek = current.toLocaleDateString("en-GB", {
        week: "numeric",
        year: "numeric",
      });
      const week = current.toLocaleDateString("en-GB", { week: "numeric" });
      const yearNum = current.getFullYear();
      const weekKey = `${getISOWeek(current)}-${yearNum}`;
      keys.add(weekKey);
      current.setDate(current.getDate() + 1);
    }
    return [...keys];
  };

  const getISOWeek = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };

  const keys =
    mode === "daily"
      ? getWeeklyDateKeys(range.startDate)
      : getMonthWeekKeys(range.year, range.month);

  const inMap = new Map(data.inData.map(i => [getKey(i._id), i.totalCalories]));
  const outMap = new Map(data.outData.map(o => [getKey(o._id), o.totalCaloriesOut]));

  const displayLabels = keys.map(key => {
    if (mode === "daily") {
      const d = new Date(key);
      return d.toLocaleDateString("en-GB", { weekday: "short" }); // e.g., Mon
    }
    if (mode === "weekly" && key.includes("-")) {
      const [week, year] = key.split("-");
      return `Week ${week}, ${year}`;
    }
    return key;
  });

  const caloriesIn = keys.map(k => inMap.get(k) || 0);
  const caloriesOut = keys.map(k => outMap.get(k) || 0);

  const chartData = {
    labels: displayLabels,
    datasets: [
      {
        label: "Calories In",
        data: caloriesIn,
        backgroundColor: "#507DBC",
        borderRadius: 50,
      },
      {
        label: "Calories Out",
        data: caloriesOut,
        backgroundColor: "#A1C6EA",
        borderRadius: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 p-5" style={{ maxHeight: "600px" }}>
      <h3 className="text-center fw-bold">Calories Intake vs Calories Consumption</h3>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;