import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import { useCardioWorkoutSummary } from "../../hooks/useCardioWorkoutSummary";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const CardioVsWorkoutChart = ({ mode, dateIndex, type }) => {
  const chartRef = useRef(null);
  const { data, isLoading, range } = useCardioWorkoutSummary(mode, dateIndex);

  if (isLoading || !range) return <p>Loading chart...</p>;

  const getFullKeys = () => {
    if (mode === "daily" && range.startDate) {
      const keys = [];
      const start = new Date(range.startDate);
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        keys.push(d.toISOString().split("T")[0]);
      }
      return keys;
    }

    if (mode === "weekly" && range.month && range.year) {
      const keys = new Set();
      const current = new Date(range.year, range.month - 1, 1);
      while (current.getMonth() === range.month - 1) {
        const week = getISOWeek(current);
        const year = current.getFullYear();
        keys.add(`${week}-${year}`);
        current.setDate(current.getDate() + 7);
      }
      return [...keys];
    }

    return [];
  };

  const getISOWeek = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const keys = getFullKeys();

  const dataMap = new Map(
    data.map((entry) => {
      if (mode === "daily") return [entry._id.date, type === "cardio" ? entry.totalMinutes : entry.totalReps];
      return [`${entry._id.week}-${entry._id.year}`, type === "cardio" ? entry.totalMinutes : entry.totalReps];
    })
  );

  const values = keys.map((k) => {
    const v = dataMap.get(k);
    return type === "cardio" ? (v === undefined ? null : v) : (v || 0);
  });

  const labels = keys.map((key) => {
    if (mode === "daily") {
      const d = new Date(key);
      return d.toLocaleDateString("en-GB", { weekday: "short" }); 
    } else {
      const [week, year] = key.split("-");
      return `W${week}, ${year}`;
    }
  });

  // 🎨 Create gradient
  const chart = chartRef.current;
  let gradient = "#A0C4FF";
  if (chart?.ctx && chart.chartArea) {
    const ctx = chart.ctx;
    const area = chart.chartArea;
    gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, "#176087");
    gradient.addColorStop(0.2, "#1E7BA6");
    gradient.addColorStop(0.4, "#29A0B1");
    gradient.addColorStop(0.6, "#37B5A0");
    gradient.addColorStop(0.8, "#6EDAA3");
    gradient.addColorStop(1, "#90EE90");
  }

  const dataset = {
    label: type === "cardio" ? "Total Minutes" : "Total Reps",
    data: values,
    borderColor: gradient,
    backgroundColor: type === "workout" ? gradient : "rgba(144,238,144,0.4)",
    fill: type === "cardio",
    tension: 0.3,
    borderRadius: type === "workout" ? 100 : 0,
    pointRadius: type === "cardio" ? 4 : 0,
    pointHoverRadius: type === "cardio" ? 6 : 0,
  };

  const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
    animation: {
        onComplete: () => {
        const chart = chartRef.current;
        if (!chart) return;

        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        if (!chartArea) return;

        const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
        gradient.addColorStop(0, "#176087");
        gradient.addColorStop(0.2, "#1E7BA6");
        gradient.addColorStop(0.4, "#29A0B1");
        gradient.addColorStop(0.6, "#37B5A0");
        gradient.addColorStop(0.8, "#6EDAA3");
        gradient.addColorStop(1, "#90EE90");

        // 🔁 Apply gradient dynamically
        const dataset = chart.data.datasets[0];
        if (type === "cardio") {
            dataset.borderColor = gradient;
            dataset.backgroundColor = gradient;
        } else {
            dataset.backgroundColor = gradient;
        }

        chart.update();
        },
    },
    scales: {
        y: {
        beginAtZero: true,
        title: {
            display: true,
            text: type === "cardio" ? "Total Minutes" : "Total Reps",
            font: { size: 16, weight: "bold" },
        },
        },
    },
    };


  return (
    <div className="d-flex flex-column align-items-center w-100" style={{ height: "500px", maxHeight: "600px" }}>
      {type === "cardio" ? (
        <Line ref={chartRef} data={{ labels, datasets: [dataset] }} options={options} />
      ) : (
        <Bar ref={chartRef} data={{ labels, datasets: [dataset] }} options={options} />
      )}
    </div>
  );
};

export default CardioVsWorkoutChart;
