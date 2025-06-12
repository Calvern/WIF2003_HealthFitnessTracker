import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateReminder = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const createReminderRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/reminders/create`, {
      method: "POST", // Using POST since we are creating a new reminder
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Ensure the correct content type
      },
      body: JSON.stringify(formData), // Sending form data
    });

    if (!response.ok) {
      throw new Error("Failed to create reminder");
    }

    return response.json();
  };

  const {
    mutateAsync: createReminder,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createReminderRequest,
    onSuccess: async () => {
      showToast("Reminder created successfully!");
      navigate("/reminders"); // Redirect to the reminders list after success
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    createReminder,
    isLoading,
    isSuccess,
    error,
  };
};
