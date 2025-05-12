import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const BottomMoodToggle = ({ type, setType }) => (
  <div className="d-flex justify-content-center mt-3">
    <div className="d-flex gap-4">
      <span
        role="button"
        onClick={() => setType("cardio")}
        style={{
          fontSize: "20px",
          fontWeight: type === "cardio" ? "bold" : "normal",
          color: type === "cardio" ? "black" : "grey",
          borderBottom: type === "cardio" ? "3px solid black" : "none",
          paddingBottom: "4px",
          cursor: "pointer",
        }}
      >
        Cardio
      </span>
      <span
        role="button"
        onClick={() => setType("workout")}
        style={{
          fontSize: "20px",
          fontWeight: type === "workout" ? "bold" : "normal",
          color: type === "workout" ? "black" : "grey",
          borderBottom: type === "workout" ? "3px solid black" : "none",
          paddingBottom: "4px",
          cursor: "pointer",
        }}
      >
        Workout
      </span>
    </div>
  </div>
);

export default BottomMoodToggle;
