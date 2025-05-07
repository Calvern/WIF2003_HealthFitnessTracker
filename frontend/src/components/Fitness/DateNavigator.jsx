import React from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

const brandColor = "#176087";

const DateNavigator = ({ selectedDate, setSelectedDate }) => {
  const CalendarButton = React.forwardRef(({ onClick }, ref) => (
    <Button onClick={onClick} ref={ref} variant="transparent">
      <Calendar size={25} color={brandColor} />
    </Button>
  ));

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
      <Button
        variant="transparent"
        onClick={() => changeDate(-1)}
        style={{ fontSize: "1.5rem", color: brandColor }}
      >
        &lt;
      </Button>

      <h1 className="fw-bold m-0" style={{ color: brandColor }}>
        {selectedDate.toLocaleDateString()}
      </h1>

      <Button
        variant="transparent"
        onClick={() => changeDate(1)}
        style={{ fontSize: "1.5rem", color: brandColor }}
      >
        &gt;
      </Button>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={<CalendarButton />}
      />
    </div>
  );
};

export default DateNavigator;