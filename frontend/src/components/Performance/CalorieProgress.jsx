import React, { useState } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";

const CalorieProgress = () => {
  const [caloriesBurned] = useState(2400);
  const [caloriesConsumed] = useState(2500);

  const radius = 180;
  const strokeWidth = 50;
  const circumference = 2 * Math.PI * radius;
  const total = caloriesBurned + caloriesConsumed;

  const burnedRatio = caloriesBurned / total;
  const consumedRatio = caloriesConsumed / total;

  const burnedLength = circumference * burnedRatio;
  const consumedLength = circumference * consumedRatio;
  const centerText = caloriesBurned > caloriesConsumed ? "Great!" : "Keep it up!";

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Container className="py-5 d-flex flex-column align-items-center gap-4">
        <div
          className="bg-white p-4 rounded-3 d-flex flex-column align-items-center"
          style={{ width: "440px" }}
        >
          {/* Donut Chart */}
          <svg
            width="440"
            height="440"
            viewBox="0 0 440 440"
            style={{ transform: "rotate(-90deg)" }}
          >
            <g transform="translate(220,220)">
              {/* Burned Segment */}
              <circle
                r={radius}
                fill="transparent"
                stroke="#507DBC"
                strokeWidth={strokeWidth}
                strokeDasharray={`${burnedLength} ${circumference}`}
                strokeDashoffset="0"
              />

              {/* Consumed Segment */}
              <circle
                r={radius}
                fill="transparent"
                stroke="#DAE3E5"
                strokeWidth={strokeWidth}
                strokeDasharray={`${consumedLength} ${circumference}`}
                strokeDashoffset={-burnedLength}
              />
            </g>

            {/* Center Text */}
            <text
              x="220"
              y="220"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="40"
              fontWeight="bold"
              fill="#000000"
              style={{
                transform: "rotate(90deg)",
                transformOrigin: "center",
              }}
            >
              {centerText}
            </text>
          </svg>

          {/* Legend with Tooltips */}
          <div className="d-flex justify-content-center gap-4 mt-4">
            {/* Burned */}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-burned">
                  You have burned: {caloriesBurned} calorie
                </Tooltip>
              }
            >
              <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#507DBC" }}></div>
                <span className="text-dark fw-medium">Calorie Burned</span>
              </div>
            </OverlayTrigger>

            {/* Consumed */}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-consumed">
                  You have consumed: {caloriesConsumed} calorie
                </Tooltip>
              }
            >
              <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#DAE3E5" }}></div>
                <span className="text-dark fw-medium">Calorie Consumed</span>
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CalorieProgress;
