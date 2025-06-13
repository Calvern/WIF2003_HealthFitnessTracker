import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import ReminderForm from "../components/Notifications/ReminderForm";
import { useUpdateReminder } from "../api/ReminderApi"; // Import the update API hook
import { useForm } from "react-hook-form";

const EditReminderPage = () => {
  const { state } = useLocation(); // Access the passed state
  const [editReminder, setEditReminder] = useState(null);
  const navigate = useNavigate();
  const { mutateAsync: updateReminder, isLoading, error } = useUpdateReminder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (state && state.reminder) {
      setEditReminder(state.reminder);
      // Reset form with the reminder data when available
      reset({
        title: state.reminder.title,
        date: state.reminder.date,
        time: state.reminder.time,
        category: state.reminder.category,
        leadTime: state.reminder.leadTime,
        recurring: state.reminder.recurring,
        notes: state.reminder.notes,
      });
    }
  }, [state, reset]);

  const handleReminderUpdate = async (data) => {
    try {
      // Update the reminder using the API
      await updateReminder({ ...data, _id: editReminder._id });
      navigate("/reminders"); // Go back to reminders list after successful update
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  if (!editReminder) {
    return <Container className="py-5">Loading...</Container>;
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center ml-5 mt-3 mb-2" style={{ fontWeight: "bold", fontSize: "20px" }}>
        <Link to={"/reminders"}>
          <ChevronLeft size={30} color="black" style={{ marginRight: "4px" }} onClick={() => navigate(-1)} />
        </Link>
        Edit Reminder
      </div>

      {console.log(editReminder)}

      <ReminderForm
        reminder={editReminder}
        handleSubmit={handleSubmit(handleReminderUpdate)} // Bind the form submission handler
        register={register}
        errors={errors}
        mode="edit"
      />
    </Container>
  );
};

export default EditReminderPage;
