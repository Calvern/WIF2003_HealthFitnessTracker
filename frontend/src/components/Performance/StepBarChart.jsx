import { useEffect, useRef, useState } from "react";
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


  useEffect(() => {
    const handleResize = () => {
      if (!chartRef.current) return;
      const canvas = chartRef.current.canvas;
      const ctx = chartRef.current.ctx;

      if (!canvas || !ctx) return;

      const width = canvas.offsetWidth;
      const g = ctx.createLinearGradient(0, 0, width, 0);
      colors.forEach((color, i) => {
        g.addColorStop(i / (colors.length - 1), color);
      });

      setGradient(g);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  if (isLoading || !range) return <p>Loading chart...</p>;

  const getKey = (id) => {
    if (!id) return "";
    if (id.date) return id.date.toString().substring(0, 10);
    if (id.week && id.year) return `${id.week}-${id.year}`;
    if (id.month && id.year) return `${id.month}-${id.year}`;
    return JSON.stringify(id);
  };

  const getWeeklyDateKeys = (startDateStr) => {
    const start = new Date(startDateStr);
    const mondayOffset = (start.getDay() === 0 ? -6 : 1) - start.getDay();
    const monday = new Date(start);
    monday.setDate(start.getDate() + mondayOffset);
    return [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  };

  const getISOWeek = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const getWeekKeysInMonth = (year, month) => {
    const keys = new Set();
    const current = new Date(year, month - 1, 1);
    while (current.getMonth() === month - 1) {
      keys.add(`${getISOWeek(current)}-${current.getFullYear()}`);
      current.setDate(current.getDate() + 1);
    }
    return [...keys];
  };

  const getMonthKeysInYear = (year) => {
    return [...Array(12)].map((_, i) => `${i + 1}-${year}`);
  };

  const keys =
    mode === "daily"
      ? getWeeklyDateKeys(range.startDate)
      : mode === "weekly"
      ? getWeekKeysInMonth(range.year, range.month)
      : getMonthKeysInYear(range.year);

  const stepArray = Array.isArray(data) ? data : [];
  const stepMap = new Map(stepArray.map(item => [getKey(item._id), item.totalSteps || 0]));
  const stepData = keys.map(k => stepMap.get(k) ?? 0);

  const labels = keys.map(key => {
    if (mode === "daily") return new Date(key).toLocaleDateString("en-GB", { weekday: "short" });
    if (mode === "weekly") return `Week ${key.split("-")[0]}`;
    if (mode === "monthly") {
      const [month, year] = key.split("-");
      return new Date(year, month - 1).toLocaleString("en-GB", { month: "short" });
    }
    return key;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepData,
        backgroundColor: "#176087",
        borderRadius: 50,
        barThickness: 60,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart', 
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
      y: { beginAtZero: true, ticks: { font: { size: 12 } } },
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

  return (
    <div style={{ height: "350px" }}>
      <Bar data={chartData}options={chartOptions} 
      ref={(chart) => {if (!chart) return; chartRef.current = chart;}}/>
    </div>
  );
};

export default StepBarChart;