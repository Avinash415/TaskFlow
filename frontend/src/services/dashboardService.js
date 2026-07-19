import api from "./api";

export const getDashboard = async () => {
  const { data } = await api.get("/api/v1/dashboard");
  return data;
};