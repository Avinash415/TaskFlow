import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TaskForm from "./TaskForm";
import * as taskService from "../../services/taskService";

const CreateTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await taskService.createTask(data);

      toast.success("Task created successfully.");

      navigate("/tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default CreateTask;