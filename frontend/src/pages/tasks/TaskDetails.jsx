import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as taskService from "../../services/taskService";

import Card from "../../components/common/Card/Card";

import StatusBadge from "./components/StatusBadge";
import PriorityBadge from "./components/PriorityBadge";

import { formatDate } from "../../utils/date";

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const response =
        await taskService.getTask(id);

      setTask(response.data);
    } catch {
      toast.error("Unable to load task.");
    }
  };

  if (!task) return null;

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold">
        {task.title}
      </h2>

      <div className="space-y-4">

        <div>
          <strong>Description</strong>

          <p>{task.description || "-"}</p>
        </div>

        <div>
          <strong>Project</strong>

          <p>{task.projectName}</p>
        </div>

        <div>
          <strong>Priority</strong>

          <PriorityBadge
            priority={task.priority}
          />
        </div>

        <div>
          <strong>Status</strong>

          <StatusBadge
            status={task.status}
          />
        </div>

        <div>
          <strong>Due Date</strong>

          <p>{formatDate(task.dueDate)}</p>
        </div>

      </div>
    </Card>
  );
};

export default TaskDetails;