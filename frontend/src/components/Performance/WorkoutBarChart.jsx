import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WorkoutBarChart = ({ mode, dateRange }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchAndSetChart = async () => {
      try {
        const res = await axios.get("/api/exercises/cardio-vs-workout-summary", {
          params: {
            mode,
            startDate: dateRange.start,
            endDate: dateRange.end,
          },
          withCredentials: true,
        });

        const data = res.data;

        const values = data.map((entry) => entry.totalReps || 0);
        const labels = data.map((entry) =>
          mode === "daily" ? entry._id.date.slice(5) : `W${entry._id.week}`
        );

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

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Reps",
              data: values,
              backgroundColor: gradient,
              borderRadius: 100,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to load workout data:", error);
      }
    };
    setTimeout(fetchAndSetChart, 200); // slight delay to ensure chart is mounted
  }, [mode]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Reps",
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };


  return (
    <div style={{ height: "500px" }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default WorkoutBarChart;

