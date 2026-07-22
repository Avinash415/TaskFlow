import api from "../api";
import { API } from "../../constants/apiEndpoints";

export const getDashboard = async () => {
  const { data } = await api.get(
    API.ADMIN.DASHBOARD
  );

  return data;
};