import { useEffect, useState, Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import { Plus, ChevronLeft, Pencil } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetReminders } from "../api/ReminderApi"; // Import the updated hook

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  // Use the custom hook to fetch reminders from the backend
  const { reminders: fetchedReminders, isLoading, error } = useGetReminders(); // Fetch reminders

  // When the data is fetched, update the reminders state
  useEffect(() => {
    if (fetchedReminders) {
      setReminders(fetchedReminders); // Update state with fetched data
    }
  }, [fetchedReminders]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  if (error) {
    return (
      <h1 style={{
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        backgroundColor: '#ffeeee',
        padding: '20px 10px 10px 10px' // top, right, bottom, left
      }}>
        Error loading reminders: {error.message}
      </h1>
    );
  }

  const formatTime12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert "0" to "12"
    return `${hour}:${minute} ${ampm}`;
  };

  const handleEdit = (reminder) => {
    navigate(`/reminders/edit-reminder/${reminder._id}`, {
      state: { reminder }, // Pass reminder data to edit page
    });
  };

  const renderReminders = () => {
    return (
      <div className="d-flex flex-column align-items-center mt-5 vh-100">
        {reminders.map((reminder, index) => (
          <Fragment key={reminder._id}> {/* Use reminder._id to map */}
            <div className="d-flex justify-content-between align-items-center mb-1" style={{ width: "80%" }}>
              <small style={{ cursor: "pointer" }}>
                {formatTime12Hour(reminder.time)}
              </small>
              <small style={{ cursor: "pointer" }}>
                {reminder.title}
              </small>
              <Pencil size={15} style={{ cursor: "pointer" }} onClick={() => handleEdit(reminder)} />
            </div>
            {index < reminders.length - 1 && (
              <hr style={{ width: "80%", margin: "10px auto", border: "1px solid #ccc" }} />
            )}
          </Fragment>
        ))}
        <hr style={{ width: "80%", margin: "10px auto", border: "1px solid #ccc" }} />
        <div className="d-flex justify-content-center align-items-center mt-3" style={{ fontWeight: "bold", fontSize: "30px" }}>
          No More
        </div>
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center ml-5 mt-3" style={{ fontWeight: "bold", fontSize: "20px" }}>
        <Button className="border border-0" style={{ backgroundColor: "transparent", color: "black" }} onClick={() => navigate(-1)}>
          <ChevronLeft size={30}></ChevronLeft>
        </Button>
        <div>Upcoming Reminders</div> 
        <div className="d-flex align-items-center rounded" style={{ height: "40px", width: "40px", backgroundColor: "#507DBC", marginLeft: "15px" }}>
          <Link to={"/create-reminder"} aria-label="Create New Reminder">
            <Plus size={40} style={{ color: "white" }} />
          </Link>
        </div>
      </div>

      {reminders.length > 0 ? renderReminders() : ""}
    </Container>
  );
};

export default RemindersPage;
