import api from "./api";

export const getCategories = async () => {
  const { data } = await api.get("/api/v1/categories");
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await api.get(`/api/v1/categories/${id}`);
  return data;
};

export const createCategory = async (payload) => {
  const { data } = await api.post("/api/v1/categories", payload);
  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await api.put(
    `/api/v1/categories/${id}`,
    payload
  );
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(
    `/api/v1/categories/${id}`
  );
  return data;
};