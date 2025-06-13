import { useEffect, useRef } from "react";
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
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const ctx = chart.ctx;

    // Create horizontal gradient from left to right
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

    const colors = [
      "#176087",
      "#1E7BA6",
      "#29A0B1",
      "#37B5A0",
      "#55C89F",
      "#6EDAA3",
      "#90EE90",
    ];
    const step = 1 / (colors.length - 1);
    colors.forEach((color, i) => {
      gradient.addColorStop(i * step, color);
    });

    chart.data.datasets[0].borderColor = gradient;
    chart.data.datasets[0].backgroundColor = "transparent"; 
    chart.update();
  }, [chartData]);

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
        <Line
          ref={chartRef}
          data={chartData}
          options={{
            ...chartOptions,
            elements: {
              line: { tension: 0 },
              point: { radius: 3 },
            },
          }}
        />
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

export default LineChartCard;
