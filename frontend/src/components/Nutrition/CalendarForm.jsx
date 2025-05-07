import { forwardRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

const CalendarForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

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
    <Form>
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

      {/* Hidden input for backend submission */}
      <input
        type="hidden"
        name="selectedDate"
        value={formatDate(selectedDate)}
      />
    </Form>
  );
};

export default CalendarForm;
