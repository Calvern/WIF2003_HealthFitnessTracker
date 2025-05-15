import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export const CardioLineChart = ({ mode }) => {
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
            ? [30, 45, 35, 50, 40, 60, 25]
            : [200, 150, 180, 170],
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#507DBC";

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
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "rgba(80, 125, 188, 0.2)";

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );
          gradient.addColorStop(0, "rgba(23, 96, 135, 0.2)");
          gradient.addColorStop(1, "rgba(144, 238, 144, 0.2)");
          return gradient;
        },
        tension: 0,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
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
          text: "Total Minutes",
          position: "top",
          font: { size: 16, weight: "bold" },
          padding: { top: 10 },
        },
      },
    },
  };

  return (
    <div
      className="d-flex flex-column align-items-center w-100"
      style={{ height: "550px", maxHeight: "600px" }}
    >
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default CardioLineChart;
