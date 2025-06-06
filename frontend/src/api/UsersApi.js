import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRegister = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return response.json();
  };
  const {
    mutateAsync: registerUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: registerRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast("Registration successful");
      navigate("/create-profile");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    registerUser,
    isLoading,
    isSuccess,
    error,
  };
};

export const useCreateProfile = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const createProfileRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/create-profile`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create user profile");
    }
    return response.json();
  };
  const {
    mutateAsync: createUserProfile,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createProfileRequest,
    onSuccess: async () => {
      navigate("/calorie-calculator");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    createUserProfile,
    isLoading,
    isSuccess,
    error,
  };
};

export const useCreatePhysicalInfo = () => {
  const { showToast } = useAppContext();

  const createPhysicalInfoRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/create-physical`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to create physical info");
    }
    return response.json();
  };
  const {
    mutateAsync: createPhysicalInfo,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createPhysicalInfoRequest,
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    createPhysicalInfo,
    isLoading,
    isSuccess,
    error,
  };
};
