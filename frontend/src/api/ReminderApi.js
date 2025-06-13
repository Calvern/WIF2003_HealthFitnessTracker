import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["getReminders"], // The unique query key for caching
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/reminders/get-reminders`, {
        credentials: "include", // Make sure to include cookies if your auth token is stored in cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reminders");
      }

      return response.json();
    },
  });

  return { reminders: data, error, isLoading };
};



export const useGetNotifications = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getNotifications"], // The unique query key for caching
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/reminders/get-notifications`, {
        credentials: "include", // Make sure to include cookies if your auth token is stored in cookies
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      return response.json();
    },
  });

  return { notifications: data, error, isLoading };
};





// Function to delete a reminder
export const useDeleteReminder = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  // Function to send the DELETE request
  const deleteReminderRequest = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${id}`, {
      method: "DELETE",
      credentials: "include", // Ensure authentication is passed with the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete reminder");
    }

    return response.json(); // Return the response (the deleted reminder)
  };

  // useMutation hook to handle the deletion of the reminder
  const { mutateAsync: deleteReminder, isLoading, isSuccess, error } = useMutation({
    mutationFn: deleteReminderRequest,
    onSuccess: () => {
      showToast("Reminder deleted successfully!");
      navigate("/reminders"); // Redirect to reminders list after deletion
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    deleteReminder,
    isLoading,
    isSuccess,
    error,
  };
};


export const useHandleShowNotifications = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const handleShowNotifications = async (notification) => {
    // Call the API to update the readStatus to true
    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders/${notification._id}/read`, {
        method: "PUT",
        credentials: "include", // Include authentication token
      });

      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }

      // Update the state to reflect the change (local UI update)
      // You can pass your state update function to reflect the changes in your component
      // like setNotifications in NotificationsPage

      // Navigate to the notification details page
      navigate(`/notifications/show-notification/${notification._id}`, {
        state: { notification },
      });
    } catch (error) {
      console.error(error);
      showToast("Error marking notification as read");
    }
  };

  return handleShowNotifications;
};


// Function to update the reminder
export const useUpdateReminder = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  // Mutation hook to handle the update request
  const updateReminderRequest = async (reminderData) => {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${reminderData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update reminder");
    }

    return response.json(); // Return the updated reminder data
  };

  const { mutateAsync: updateReminder, isLoading, isSuccess, error } = useMutation({
    mutationFn: updateReminderRequest,
    onSuccess: async (data) => {
      showToast("Reminder updated successfully!");
      navigate("/reminders"); // Redirect to reminders list after success
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    updateReminder,
    isLoading,
    isSuccess,
    error,
  };
};
