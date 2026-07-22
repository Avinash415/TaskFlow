import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as adminDashboardService from "../../services/admin/adminDashboardService";

const useAdminDashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await adminDashboardService.getDashboard();

      setDashboard(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    refresh: loadDashboard,
  };
};

export default useAdminDashboard;