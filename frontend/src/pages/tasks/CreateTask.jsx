import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TaskForm from "./TaskForm";
import * as taskService from "../../services/taskService";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await taskService.createTask(data);
      toast.success("Task created successfully! 🎉");
      navigate("/tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task."
      );
    }
  };

  return <TaskForm onSubmit={handleSubmit} />;
};

export default CreateTask;