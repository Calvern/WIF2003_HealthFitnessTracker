import React from "react";
import {
  ChevronCompactLeft,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";

const DateNavigator = ({ date, setDate }) => {
  const formatDate = (d) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const changeDate = (direction) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + direction);
    setDate(newDate);
  };

  return (
    <div className="d-flex align-items-center gap-4">
      {/*<span
        
        onClick={() => changeDate(-1)}
        style={{ fontSize: "3rem", cursor: "pointer", userSelect: "none" }}
      >
        &#8249;
      </span>*/}
      <ChevronLeft
        size={35}
        strokeWidth={4}
        onClick={() => changeDate(-1)}
        style={{ cursor: "pointer" }}
      />

      <h3 className="fw-bold mb-0">{formatDate(date)}</h3>
      <ChevronRight
        size={35}
        strokeWidth={4}
        onClick={() => changeDate(1)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default DateNavigator;
