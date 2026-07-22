import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as adminUserService from "../../services/admin/adminUserService";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await adminUserService.getUsers();

      setUsers(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const changeRole = async (id, role) => {
    try {
      const response =
        await adminUserService.updateRole(id, role);

      toast.success(response.message);

      await loadUsers();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update user role."
      );

      return false;
    }
  };

  const changeStatus = async (id, enabled) => {
    try {
      const response =
        await adminUserService.updateStatus(
          id,
          enabled
        );

      toast.success(response.message);

      await loadUsers();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update user status."
      );

      return false;
    }
  };

  const removeUser = async (id) => {
    try {
      const response =
        await adminUserService.deleteUser(id);

      toast.success(response.message);

      await loadUsers();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete user."
      );

      return false;
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    refresh: loadUsers,
    changeRole,
    changeStatus,
    removeUser,
  };
};

export default useAdminUsers;