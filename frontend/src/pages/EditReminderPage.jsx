import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import ReminderForm from "../components/Notifications/ReminderForm";

const EditReminderPage = () => {
  const { state } = useLocation(); // <- Access the passed state
  const [editReminder, setEditReminder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    console.log(state.reminder);
    if (state && state.reminder) {
      setEditReminder(state.reminder);
    }
  }, [state]);

  //console.log("2TEst "+editReminder.title)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Reminder:", editReminder);
  };

  if (!editReminder) {
    return (
      <Container className="py-5">{/* Loading or fallback UI */}</Container>
    );
  }

  return (
    <Container className="py-5">
      <div
        className="d-flex align-items-center ml-5 mt-3 mb-2"
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >
        <Link to={"/reminders"}>
          <ChevronLeft
            size={30}
            color="black"
            style={{ marginRight: "4px" }}
            onClick={() => navigate(-1)}
          />
        </Link>
        Edit Reminder
      </div>
      {console.log(editReminder)}
      <ReminderForm
        reminder={editReminder}
        setReminder={setEditReminder}
        handleSubmit={handleSubmit}
        mode="edit"
      />
    </Container>
  );
};

export default EditReminderPage;
