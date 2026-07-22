import api from "../api";
import { API } from "../../constants/apiEndpoints";

export const getUsers = async () => {
  const response = await api.get(API.ADMIN.USERS);
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(
    `${API.ADMIN.USERS}/${id}`
  );

  return response.data;
};

export const updateRole = async (
  id,
  role
) => {

  const response = await api.put(
    `${API.ADMIN.USERS}/${id}/role`,
    {
      role,
    }
  );

  return response.data;
};

export const updateStatus = async (
  id,
  enabled
) => {

  const response = await api.put(
    `${API.ADMIN.USERS}/${id}/status`,
    {
      enabled,
    }
  );

  return response.data;
};

export const deleteUser = async (id) => {

  const response = await api.delete(
    `${API.ADMIN.USERS}/${id}`
  );

  return response.data;
};