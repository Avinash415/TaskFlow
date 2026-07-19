import api from "./api";

export const getTasks = async () => {
  const { data } = await api.get("/api/v1/tasks");
  return data;
};

export const getTask = async (id) => {
  const { data } = await api.get(
    `/api/v1/tasks/${id}`
  );

  return data;
};

export const createTask = async (
  payload
) => {
  const { data } = await api.post(
    "/api/v1/tasks",
    payload
  );

  return data;
};

export const updateTask = async (
  id,
  payload
) => {
  const { data } = await api.put(
    `/api/v1/tasks/${id}`,
    payload
  );

  return data;
};

export const updateTaskStatus = async (
  id,
  status
) => {
  const { data } = await api.patch(
    `/api/v1/tasks/${id}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return data;
};

export const deleteTask = async (
  id
) => {
  const { data } = await api.delete(
    `/api/v1/tasks/${id}`
  );

  return data;
};