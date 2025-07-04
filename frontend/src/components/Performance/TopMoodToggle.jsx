import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

const getCurrentLabel = (mode, index) => {
  const today = new Date();
  let label = "";

  if (mode === "daily") {
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1 + index * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    label = `${startOfWeek.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })} - ${endOfWeek.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })}`;
  } else {
    // Monthly label
    const monthDate = new Date(today.getFullYear(), today.getMonth() + index, 1);
    label = monthDate.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }

  return label;
};

const TopMoodToggle = ({ mode, setMode, dateIndex, setDateIndex }) => {
  const handlePrev = () => setDateIndex((prev) => prev - 1);
  const handleNext = () => setDateIndex((prev) => prev + 1);

  return (
    <Row className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4">
      <Col sm={12} lg={3} className="d-flex justify-content-center">
        <h4 className="mb-0 fw-bold fs-3">
          {mode === "daily" ? "Daily Activity" : "Weekly Activity"}
        </h4>
      </Col>

      <Col sm={12} lg={3} className="d-flex justify-content-center">
        <div className="d-flex gap-4">
          <span
            role="button"
            onClick={() => {
              setMode("daily");
              setDateIndex(0);
            }}
            style={{
              fontSize: "20px",
              fontWeight: mode === "daily" ? "bold" : "normal",
              color: mode === "daily" ? "black" : "grey",
              borderBottom: mode === "daily" ? "3px solid black" : "none",
              paddingBottom: "4px",
              cursor: "pointer",
            }}
          >
            Daily
          </span>
          <span
            role="button"
            onClick={() => {
              setMode("weekly");
              setDateIndex(0); // reset to current month
            }}
            style={{
              fontSize: "20px",
              fontWeight: mode === "weekly" ? "bold" : "normal",
              color: mode === "weekly" ? "black" : "grey",
              borderBottom: mode === "weekly" ? "3px solid black" : "none",
              paddingBottom: "4px",
              cursor: "pointer",
            }}
          >
            Weekly
          </span>
        </div>
      </Col>

      <Col sm={12} lg={3} className="d-flex justify-content-center">
        <div className="d-flex align-items-center justify-content-end gap-3 fs-4">
          <ChevronLeft
            size={35}
            strokeWidth={4}
            onClick={handlePrev}
            style={{ cursor: "pointer" }}
          />
          <strong className="mb-0">{getCurrentLabel(mode, dateIndex)}</strong>
          <ChevronRight
            size={35}
            strokeWidth={4}
            onClick={handleNext}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default TopMoodToggle;
