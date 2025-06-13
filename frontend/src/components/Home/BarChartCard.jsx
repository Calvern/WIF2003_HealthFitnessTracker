import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChartCard = ({ title, description, summaryText, chartData, chartOptions }) => {
  return (
        <Card
      style={{
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "1rem",
        minHeight: "320px", 
      }}
    >
      <div style={{ height: "250px", marginBottom: "0.5rem" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <h6 className="mt-2 mb-1 fw-semibold">{title}</h6>
      <p
        style={{
          color: "#6c757d",
          fontSize: "0.85rem",
          marginBottom: "0.25rem",
        }}
      >
        {description}
      </p>

      <p className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
        {summaryText}
      </p>
    </Card>
  );
};

export default BarChartCard;
