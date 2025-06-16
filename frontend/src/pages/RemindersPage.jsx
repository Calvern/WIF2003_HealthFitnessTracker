import { useState, useEffect, Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import { Plus, ChevronLeft, Pencil } from "react-bootstrap-icons";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/Notifications/DeleteConfirmationModal"; // Import the delete confirmation modal
import { useGetReminders, useDeleteReminder } from "../api/ReminderApi"; // Import the updated hook
import PushNotification from "../components/Notifications/PushNotification";

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to show modal
  const [reminderToDelete, setReminderToDelete] = useState(null); // State to store the reminder to be deleted
  const navigate = useNavigate();

  // Use the custom hook to fetch reminders from the backend
  const {
    reminders: fetchedReminders,
    isLoading,
    error,
    refetch,
  } = useGetReminders(); // Fetch reminders
  const { deleteReminder } = useDeleteReminder();

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
      <h1
        style={{
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
          backgroundColor: "#ffeeee",
          padding: "20px 10px 10px 10px", // top, right, bottom, left
        }}
      >
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

  const handleDelete = (id) => {
    setReminderToDelete(id); // Set the reminder ID to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReminder(reminderToDelete); // Delete the reminder
      setShowModal(false); // Close the modal after deletion

      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder._id !== reminderToDelete)
      );
    } catch (error) {
      console.error("Error deleting reminder:", error);
      setShowModal(false);
    }
  };

  const renderReminders = () => {
    return (
      <div
        className="d-flex flex-column align-items-center mt-5"
        style={{
          overflowY: "auto",
          maxHeight: "400px",
          width: "100%",
          paddingRight: "30px",
          scrollBehavior: "smooth",
        }}
      >
        {reminders.map((reminder, index) => (
          <Fragment key={reminder._id}>
            {" "}
            {/* Use reminder._id to map */}
            <div
              className="d-flex align-items-center mb-1"
              style={{ width: "100%" }}
            >
              <div style={{ width: "20%" }}>
                <small style={{ cursor: "pointer" }}>
                  {formatTime12Hour(reminder.time)}
                </small>
              </div>
              <div style={{ flex: 1 }}>
                <small style={{ cursor: "pointer", align: "start" }}>
                  {reminder.title}
                </small>
              </div>
              <div
                className="d-flex align-items-center gap-4"
                style={{ width: "10%", justifyContent: "end" }}
              >
                <MdDeleteForever
                  size={15}
                  style={{ cursor: "pointer", color: "#dc3545" }}
                  onClick={() => handleDelete(reminder._id)}
                />
                <Pencil
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(reminder)}
                />
              </div>
            </div>
            {index < reminders.length - 1 && (
              <hr
                style={{
                  width: "100%",
                  margin: "10px auto",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Fragment>
        ))}
        <hr
          style={{
            width: "100%",
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

  const NoReminder = () => {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1
          className="text-center"
          style={{ color: "#507DBC", fontWeight: "bold" }}
        >
          No Reminders Yet
        </h1>
        <p className="text-center" style={{ color: "#888", fontSize: "18px" }}>
          Click the plus icon to create a new reminder.
        </p>
      </div>
    );
  };

  return (
    <>
      <Container className="py-5">
        <div
          className="d-flex align-items-center ml-5 mt-3"
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          <Button
            className="border border-0"
            style={{ backgroundColor: "transparent", color: "black" }}
            onClick={() => navigate("/home")}
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

        {reminders.length > 0 ? renderReminders() : NoReminder()}

        {/* Confirmation modal */}
        <DeleteConfirmationModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={handleConfirmDelete}
        />
      </Container>
    </>
  );
};

export default RemindersPage;
