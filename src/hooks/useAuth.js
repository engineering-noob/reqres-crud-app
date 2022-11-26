import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, registerUser } from "../services/auth";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth-users"]);
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth-users"]);
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth-users"]);
    },
  });
};
