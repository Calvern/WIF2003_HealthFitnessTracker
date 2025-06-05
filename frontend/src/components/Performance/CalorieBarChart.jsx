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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ mode }) => {
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
    labels: labels, // X-axis labels
    datasets: [
      {
        label: "Calories In",
        data: [10, 20, 30, 30, 30, 30, 70],
        backgroundColor: "#507DBC",
        borderRadius: 50,
      },
      {
        label: "Calories Out",
        data: [15, 25, 35, 5, 60, 90, 100],
        borderRadius: 50,
        backgroundColor: "#A1C6EA",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'PT Sans', sans-serif",
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Calories",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="d-flex flex-column align-items-center w-100  p-5"
      style={{ maxHeight: "600px" }}
    >
      <h3 className="text-center fw-bold">
        Calories Intake vs Calories Consumption
      </h3>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default BarChart;
