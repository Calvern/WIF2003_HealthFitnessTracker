import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const WorkoutBarChart = ({ mode }) => {
  const chartRef = useRef(null);

  const labels =
    mode === "daily"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Apr 1–7", "Apr 8–14", "Apr 15–21", "Apr 22–28"];

  const data = {
    labels,
    datasets: [
      {
        data:
          mode === "daily"
            ? [10, 20, 15, 25, 18, 30, 22]
            : [120, 150, 130, 160],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#507DBC"; // fallback before chart is ready

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );
          gradient.addColorStop(0, "#176087");
          gradient.addColorStop(0.2, "#1E7BA6");
          gradient.addColorStop(0.4, "#29A0B1");
          gradient.addColorStop(0.6, "#37B5A0");
          gradient.addColorStop(0.8, "#6EDAA3");
          gradient.addColorStop(1, "#90EE90");
          return gradient;
        },
        borderRadius: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Reps",
          position: "top",
          font: { size: 16, weight: "bold" },
          padding: { top: 10 },
        },
      },
    },
  };

  return (
    <div
      className="d-flex flex-column align-items-center w-100 p-5"
      style={{ height: "550px", maxHeight: "600px" }}
    >
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default WorkoutBarChart;
