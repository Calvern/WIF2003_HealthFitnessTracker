import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChartCard = ({ title, description, summaryText, chartData, chartOptions }) => {
  return (
    <Card style={{
      width: '100%',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '1rem',
      minHeight: '320px',
    }}>
      <div style={{ height: '250px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <h6 className="mt-4 fw-semibold">{title}</h6>
      <p style={{ color: "#6c757d", fontSize: "0.85rem", marginBottom: '0.5rem' }}>
        {description}
      </p>

      <hr style={{ borderColor: "#e0e0e0", margin: '0.5rem 0' }} />

      <p className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>{summaryText}</p>
    </Card>
  );
};

export default LineChartCard;