import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as userService from "../services/userService";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response =
        await userService.getUsers();

      setUsers(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    refresh: loadUsers,
  };
};

export default useUsers;