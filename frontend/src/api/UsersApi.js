import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
      showToast(error.message, "danger");
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
      showToast(error.message, "danger");
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
      showToast(error.message, "danger");
    },
  });

  return {
    createPhysicalInfo,
    isLoading,
    isSuccess,
    error,
  };
};

export const useGetProfile = () => {
  const { showToast } = useAppContext();

  const getProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    return response.json();
  };

  const {
    data: user,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getProfile,
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    user,
    isLoading,
    isSuccess,
    error,
  };
};

export const useUpdateProfile = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const updateProfileRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }
    return response.json();
  };
  const {
    mutateAsync: updateUserProfile,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: async () => {
      queryClient.invalidateQueries(["userInfo"]);
      showToast("Profile updated successfully!");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    updateUserProfile,
    isLoading,
    isSuccess,
    error,
  };
};

export const useChangePassword = () => {
  const { showToast } = useAppContext();

  const changePasswordRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/change-password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to change password");
    }
    return response.json();
  };

  const {
    mutateAsync: changeUserPassword,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: async () => {
      showToast("Password changed successfully!");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    changeUserPassword,
    isLoading,
    isSuccess,
    error,
  };
};

export const useDeactivateAccount = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const deactivateAccountRequest = async (formData) => {
    const respond = await fetch(
      `${API_BASE_URL}/api/users/deactivate-account`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await respond.json();
    if (!respond.ok) throw new Error(data.message);
    return data;
  };

  const {
    mutateAsync: deactivateUserAccount,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: deactivateAccountRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast("Account deactivated successfully!");
    },
    onError: (error) => showToast(error.message, "danger"),
  });

  return {
    deactivateUserAccount,
    isLoading,
    isSuccess,
    error,
  };
};

export const useReactivateAccount = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const reactivateRequest = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/api/users/reactivate`, {
      method: "PUT",
      credentials: "include", // ensure cookie is set
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reactivate account");
    }

    return data;
  };

  const {
    mutateAsync: reactivateUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: reactivateRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast("Account reactivated and signed in!");
      navigate("/home");
    },
    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return {
    reactivateUser,
    isLoading,
    isSuccess,
    error,
  };
};

export const getUserGoals = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/goals`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user goals");
  }

  return response.json();
};
