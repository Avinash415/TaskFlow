import api from "./api";

export const getUsers = async () => {
  const { data } = await api.get("/api/v1/users");
  return data;
};

export const getUser = async (id) => {
  const { data } = await api.get(`/api/v1/users/${id}`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await api.post("/api/v1/users", payload);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/api/v1/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/api/v1/users/${id}`);
  return data;
};