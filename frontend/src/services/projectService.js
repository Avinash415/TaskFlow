import api from "./api";

export const getProjects = async () => {
  const { data } = await api.get("/api/v1/projects");
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await api.get(`/api/v1/projects/${id}`);
  return data;
};

export const createProject = async (payload) => {
  const { data } = await api.post("/api/v1/projects", payload);
  return data;
};

export const updateProject = async (id, payload) => {
  const { data } = await api.put(`/api/v1/projects/${id}`, payload);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/api/v1/projects/${id}`);
  return data;
};