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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ mode }) => {
  const { data, isLoading } = useCalorieSummary(mode);

  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <p>Loading chart...</p>;

  const { inData, outData } = data;

  // Align and format the data
  const labels = inData.map(item => item._id);
  const caloriesIn = inData.map(item => item.totalCalories);
  const caloriesOut = outData.map(item => {
    const match = outData.find(out => out._id === item._id);
    return match ? match.totalCaloriesOut : 0;
  });

  const chartData = {
    labels,
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
    legend: {
      position: "top",
    },
    title: {
      display: false,
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
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
