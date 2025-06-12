import { useMutation, useQuery  } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateReminder = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  // Function to send the POST request
  const createReminderRequest = async (reminderData) => {
    const response = await fetch(`${API_BASE_URL}/api/reminders/create`, {
      method: "POST",
      credentials: "include",  // Ensure the correct authentication
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminderData), // Sending form data
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse the response body only once
      throw new Error(errorData.error || "Failed to create reminder");
    }

    // Ensure response is parsed only once
    const data = await response.json();
    return data;
  };

  // useMutation hook to handle the creation of the reminder
  const { mutateAsync: createReminder, isLoading, isSuccess, error } = useMutation({
    mutationFn: createReminderRequest,
    onSuccess: async () => {
      showToast("Reminder created successfully!");
      navigate("/reminders");  // Redirect to reminders list after success
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

/////////////////////////////////////////////
export const useGetReminders = () => {
  const getRemindersRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/reminders`, {
      credentials: "include", // Make sure the cookie with authentication is sent
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reminders");
    }

    return response.json();
  };

  const { data: reminders, error, isLoading } = useQuery({
    queryKey: ["getReminders"], // The unique query key for caching
    queryFn: getRemindersRequest,
  });

  return { reminders, error, isLoading };
};
