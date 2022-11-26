import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  findUser,
  getAllUsers,
  updateUser,
} from "../services/users";

export const useUsers = (page) => {
  return useQuery(["users", page], () => getAllUsers(page), {
    enabled: !!page,
    refetchOnWindowFocus: false,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export function useFindUser(id) {
  return useQuery(["users", id], () => findUser(id), {
    enabled: !!id,
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateUser(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(({ id }) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}

export default useUsers;
