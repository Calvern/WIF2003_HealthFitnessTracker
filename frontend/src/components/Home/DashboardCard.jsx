// src/components/Home/DashboardCard.js
import React from "react";
import { Card } from "react-bootstrap";

const DashboardCard = ({ icon, title, value, percentageText, iconBgColor = "#176087" }) => {
  return (
   <Card
  style={{
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
    height: "100%" // Ensure full height inside Col
  }}
>

      {/* Icon Overlay */}
      <div
        className="p-2"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: iconBgColor,
          padding: "0.6rem",
          borderRadius: "50%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {icon}
      </div>

      {/* Card Content */}
      <Card.Body style={{height: "100%", width: "100%"}}>
        <Card.Title className="text-end" style={{ fontSize: "1rem", color: "#6c757d" }}>
          <h4>{title}</h4>
        </Card.Title>

        <Card.Text className="text-end" style={{ marginBottom: "0.5rem" }}>
          <h2 className="fw-bold">{value}</h2>
        </Card.Text>

        <hr style={{ borderColor: "#e0e0e0", margin: "1rem 0" }} />

        <Card.Text style={{ fontSize: "0.9rem", color: "#28a745" }}>{percentageText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
