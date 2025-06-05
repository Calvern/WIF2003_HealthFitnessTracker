import { useEffect, useState, Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import { Plus, ChevronLeft, Pencil } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  const mockReminders = [
    {
      id: 1,
      title: "Gym Day",
      date: "2023-10-01",
      time: "10:00",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 2,
      title: "PushUp x 10 reps",
      date: "2023-04-01",
      time: "15:00",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notes: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Not Active",
    },
    {
      id: 3,
      title: "PushUp x 200 reps",
      date: "2023-10-01",
      time: "11:00",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 4,
      title: "Swimming Day",
      date: "2023-10-01",
      time: "08:00",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
    {
      id: 5,
      title: "Notification 5",
      date: "2023-10-01",
      time: "10:00",
      category: "General",
      leadTime: "15 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 6,
      title: "Notification 6",
      date: "2023-10-01",
      time: "06:00",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in, molestias eligendi dicta id officiis iusto eveniet, consequuntur incidunt voluptatem omnis? Molestiae sit alias veritatis esse atque, iure facilis temporibus?.",
      reminderStatus: "Active",
    },
    {
      id: 7,
      title: "Notification 7",
      date: "2023-9-01",
      time: "10:00",
      category: "General",
      leadTime: "5 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Active",
    },
    {
      id: 8,
      title: "Notification 8",
      date: "2023-9-01",
      time: "10:00",
      category: "General",
      leadTime: "10 minutes",
      recurring: "Every Monday",
      notes: "This is the first notification.",
      reminderStatus: "Not Active",
    },
  ];

  const formatTime12Hour = (timeStr) => {
    if (!timeStr) return "";

    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12; // Convert "0" to "12"

    return `${hour}:${minute} ${ampm}`;
  };

  useEffect(() => {
    setReminders(mockReminders);
  }, []);

  const handleEdit = (reminder) => {
    navigate(`/reminders/edit-reminder/${reminder.id}`, {
      state: { reminder },
    });
  };

  const renderReminders = () => {
    return (
      <div className="d-flex flex-column align-items-center mt-5 vh-100">
        {reminders.map((reminder, index) => (
          <Fragment key={reminder.id}>
            <div
              className="d-flex justify-content-between align-items-center mb-1"
              style={{ width: "80%" }}
            >
              <small
                style={{
                  cursor: "pointer",
                }}
              >
                {formatTime12Hour(reminder.time)}
              </small>
              <small
                style={{
                  cursor: "pointer",
                }}
              >
                {reminder.title}
              </small>
              <Pencil
                size={15}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(reminder)}
              />
            </div>
            {index < reminders.length - 1 && (
              <hr
                style={{
                  width: "80%",
                  margin: "10px auto",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Fragment>
        ))}
        <hr
          style={{
            width: "80%",
            margin: "10px auto",
            border: "1px solid #ccc",
          }}
        />
        <div
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ fontWeight: "bold", fontSize: "30px" }}
        >
          No More
        </div>
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div
        className="d-flex align-items-center ml-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >
        <Button
          className="border border-0"
          style={{ backgroundColor: "transparent", color: "black" }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={30}></ChevronLeft>
        </Button>
        <div>Upcoming Reminders</div>
        <div
          className="d-flex align-items-center rounded"
          style={{
            height: "40px",
            width: "40px",
            backgroundColor: "#507DBC",
            marginLeft: "15px",
          }}
        >
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
