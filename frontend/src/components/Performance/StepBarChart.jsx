// components/StepBarChart.jsx
import { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip,} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const StepBarChart = ({ data }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Steps",
        data: data.map((d) => d.steps),
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "#507DBC";
          }

          // Create horizontal gradient left to right
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
        borderRadius: 50,
        barThickness: 28,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {grid: { display: false }, ticks: { font: { size: 12 } },},
      y: {beginAtZero: true, ticks: { font: { size: 12 } },},
    },
    plugins: {
      tooltip: {
        callbacks: {label: (context) => `${context.parsed.y} steps`,},
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default StepBarChart;
