import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const WorkoutBarChart = ({ mode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        backgroundColor: "#507DBC",
        borderRadius: 100,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Reps",
          position: "top",
          font: {
            size: 16,
            weight: "bold",
          },
          padding: {
            top: 10,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default WorkoutBarChart;
