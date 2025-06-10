import { forwardRef } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

const CalendarForm = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const CalendarButton = forwardRef(({ onClick }, ref) => (
    <Button
      style={{
        backgroundColor: "transparent",
        color: "#176087",
        border: "none",
      }}
      onClick={onClick}
      ref={ref}
    >
      <Calendar size={30} />
    </Button>
  ));
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
      <span className="fw-bold h1 m-0" style={{ color: "#176087" }}>
        {selectedDate.toLocaleDateString()}
      </span>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CalendarButton />}
        // Optional: forces portal rendering
        withPortal
      />
    </div>
  );
};

export default CalendarForm;
