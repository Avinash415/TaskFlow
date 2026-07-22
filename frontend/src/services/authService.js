import api from "./api";
import { API } from "../constants/apiEndpoints";

export const login = async (data) => {
  const { data: response } = await api.post(
    API.AUTH.LOGIN,
    data
  );

  return response;
};

export const register = async (data) => {
  const { data: response } = await api.post(
    API.AUTH.REGISTER,
    data
  );

  return response;
};