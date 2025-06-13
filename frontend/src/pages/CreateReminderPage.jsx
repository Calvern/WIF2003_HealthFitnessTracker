import { useState } from "react";
import { Container } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm
import ReminderForm from "../components/Notifications/ReminderForm";
import { useCreateReminder } from "../api/ReminderApi";

const CreateReminderPage = () => {
  const [reminder, setReminder] = useState({
  title: "",
  date: "",
  time: "",
  category: "",
  leadTime: "",
  recurring: "",
  notes: "",  // Remove notificationMethod from here
  });

  const navigate = useNavigate();

  // Using useForm for form management
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: reminder, // Initialize form with reminder data (if editing)
  });

  // Using the useCreateReminder hook
  const { createReminder, isLoading, isSuccess, error } = useCreateReminder();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Sending form data to backend via the useCreateReminder hook
      console.log("Form Data:", data); // Debugging log
      await createReminder(data); // This triggers the mutation in the hook
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="py-5">
      <div
        className="d-flex align-items-center ml-5 mt-3 mb-2"
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >
        <Link to={"/reminders"}>
          <ChevronLeft size={30} color="black" style={{ marginRight: "4px" }} />
        </Link>
        Create New Reminder
      </div>
      {/* Pass necessary props to ReminderForm */}
      <ReminderForm
        reminder={reminder}
        setReminder={setReminder}
        register={register}
        handleSubmit={handleSubmit(onSubmit)} // On form submit, handle the data
        errors={errors}
        mode="create"
        reset={reset} // Optionally you can reset form after submission if needed
      />
    </Container>
  );
};

export default CreateReminderPage;
