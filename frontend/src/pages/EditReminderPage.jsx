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
  const { updateReminder, isLoading, error } = useUpdateReminder();

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
        remainderId: state.reminder._id
      });
    }
  }, [state, reset]);

  console.log("state:", state)

  const handleReminderUpdate = async (data) => {
    try {
      // Ensure that we pass the correct reminder data with the _id
      const updatedReminder = { ...data, _id: editReminder._id };
      console.log(updatedReminder);

      // Now calling updateReminder to trigger the mutation with the updated data
      await updateReminder(updatedReminder);

      // Redirect to the reminders list page after successful update
      navigate("/reminders");
    } catch (error) {
      // Catch any errors during the update process
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

      {/* {console.log(editReminder)} */}

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
