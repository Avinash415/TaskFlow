import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useTasks from "../../hooks/useTasks";
import * as taskService from "../../services/taskService";

import DataTable from "../../components/common/Table/DataTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

import TaskFilters from "./components/TaskFilters";
import StatusBadge from "./components/StatusBadge";
import PriorityBadge from "./components/PriorityBadge";

import { TASK_STATUS } from "../../utils/constants";
import { formatDate } from "../../utils/date";

const TaskList = () => {
  const navigate = useNavigate();

  const { tasks, loading, refresh } = useTasks();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "" || task.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, status]);

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(deleteId);

      toast.success("Task deleted successfully.");

      setDeleteId(null);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete task."
      );
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await taskService.updateTaskStatus(id, newStatus);

      toast.success("Status updated.");

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update status."
      );
    }
  };

 const columns = [
  {
    key: "title",
    title: "Task",
  },
  {
    key: "projectName",
    title: "Project",
    render: (task) => task.projectName || "-",
  },
  {
    key: "category",
    title: "Category",
    render: (task) => task.categoryName || "-",
  },
  {
    key: "priority",
    title: "Priority",
    render: (task) => (
      <PriorityBadge priority={task.priority} />
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (task) => (
      <StatusBadge status={task.status} />
    ),
  },
];

  return (
    <>
      <PageHeader
        title="Tasks"
        buttonText="New Task"
        onClick={() =>
          navigate("/tasks/new")
        }
      />

      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <DataTable
        columns={columns}
        data={filteredTasks}
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TaskList;