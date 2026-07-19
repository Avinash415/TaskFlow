import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as taskService from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const response =
        await taskService.getTasks();

      setTasks(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    refresh: loadTasks,
  };
};

export default useTasks;