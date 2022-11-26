import api from "./axios";

export const getAllUsers = async (page) => {
  return api("/users", { params: { page } })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const createUser = (data) => {
  return api.post("/users", data);
};

export const findUser = (id) => {
  return api(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
