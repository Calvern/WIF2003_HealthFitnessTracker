import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { useStepSummary } from "../../hooks/useStepSummary";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const StepBarChart = ({ mode, dateIndex }) => {
  const { data, isLoading, range } = useStepSummary(mode, dateIndex);
  const chartRef = useRef(null);

  if (isLoading || !range) return <p>Loading chart...</p>;

  // === Step 1: Convert backend _id to string keys
  const getKey = (id) => {
      if (!id) return "";

      if (id.date) {
        return id.date.toString().substring(0, 10); // safest option
      }

      if (id.week && id.year) return `${id.week}-${id.year}`;
      if (id.month && id.year) return `${id.month}-${id.year}`;
      return JSON.stringify(id);
    };


  // === Step 2: Generate full key list based on current range
  const getWeeklyDateKeys = (startDateStr) => {
    const start = new Date(startDateStr);
    const mondayOffset = (start.getDay() === 0 ? -6 : 1) - start.getDay();
    const monday = new Date(start);
    monday.setDate(start.getDate() + mondayOffset);
    return [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    });
  };

  const getWeekKeysInMonth = (year, month) => {
    const keys = new Set();
    const current = new Date(year, month - 1, 1);
    while (current.getMonth() === month - 1) {
      const week = getISOWeek(current);
      const yearNum = current.getFullYear();
      keys.add(`${week}-${yearNum}`);
      current.setDate(current.getDate() + 1);
    }
    return [...keys];
  };

  const getMonthKeysInYear = (year) => {
    return [...Array(12)].map((_, i) => `${i + 1}-${year}`);
  };

  const getISOWeek = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const keys =
    mode === "daily"
      ? getWeeklyDateKeys(range.startDate)
      : mode === "weekly"
      ? getWeekKeysInMonth(range.year, range.month)
      : getMonthKeysInYear(range.year);

  // === Step 3: Build map of backend results
  const stepArray = Array.isArray(data) ? data : [];
  const stepMap = new Map(stepArray.map(item => [getKey(item._id), item.totalSteps || 0]));


  // === Step 4: Create labels & values
  const labels = keys.map(key => {
  if (mode === "daily") {
    const d = new Date(key);
    return d.toLocaleDateString("en-GB", { weekday: "short" }); // e.g., Mon, Tue
  }
  if (mode === "weekly" && key.includes("-")) {
    const [week, year] = key.split("-");
    return `Week ${week}`;
  }
  if (mode === "monthly" && key.includes("-")) {
    const [month, year] = key.split("-");
    return new Date(year, month - 1).toLocaleString("en-GB", { month: "short" });
  }
  return key;
});


  const stepData = keys.map(k => stepMap.get(k) ?? 0);

  // === Step 5: Chart config
  const chartData = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepData,
        backgroundColor: stepData.map(steps => steps > 0 ? "#69B3E7" : "#e0e0e0"),
        borderRadius: 50,
        barThickness: 28,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} steps`,
        },
      },
      legend: { display: false },
    },
  };

  console.log("Expected keys:", keys);
  console.log("Mapped stepMap keys:", [...stepMap.keys()]);
  console.log("Final stepData:", stepData);

  return (
    <div style={{ height: "350px" }}>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default StepBarChart;
