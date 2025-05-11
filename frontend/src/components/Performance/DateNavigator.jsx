import React from "react";

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
      <span
        role="button"
        onClick={() => changeDate(-1)}
        style={{ fontSize: "3rem", cursor: "pointer", userSelect: "none" }}
      >
        &#8249;
      </span>
      <h3 className="fw-bold mb-0">{formatDate(date)}</h3>
      <span
        role="button"
        onClick={() => changeDate(1)}
        style={{ fontSize: "3rem", cursor: "pointer", userSelect: "none" }}
      >
        &#8250;
      </span>
    </div>
  );
};

export default DateNavigator;