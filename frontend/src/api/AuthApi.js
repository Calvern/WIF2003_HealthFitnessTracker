import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useValidateToken = () => {
  const validateTokenRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Token invalid");
    }
    return response.json();
  };

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateTokenRequest,
    retry: false,
  });

  return {
    isError,
  };
};

export const useSignInUser = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signInUserRequest = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    return response.json();
  };

  const { mutateAsync: signIn } = useMutation({
    mutationFn: signInUserRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate("/home");
      showToast("Sign in successful!");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    signIn,
  };
};

export const useSignOutUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const signOutUserRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  };

  const { mutate: signOut } = useMutation({
    mutationFn: signOutUserRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast("Signed out");
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return {
    signOut,
  };
};
