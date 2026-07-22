import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Tags,
} from "lucide-react";

import DashboardCard from "../../components/common/DashboardCard/DashboardCard";
import useAdminDashboard from "../../hooks/admin/useAdminDashboard";
import Loader from "../../components/Loader/Loader";

const AdminDashboard = () => {
  const { dashboard, loading } = useAdminDashboard();

  if (loading) {
    return <Loader />;
  }

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.totalUsers,
      icon: <Users size={30} />,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: dashboard?.activeUsers,
      icon: <UserCheck size={30} />,
      color: "text-green-600",
    },
    {
      title: "Disabled Users",
      value: dashboard?.disabledUsers,
      icon: <UserX size={30} />,
      color: "text-red-600",
    },
    {
      title: "Admin Users",
      value: dashboard?.adminUsers,
      icon: <ShieldCheck size={30} />,
      color: "text-purple-600",
    },
    {
      title: "Projects",
      value: dashboard?.totalProjects,
      icon: <FolderKanban size={30} />,
      color: "text-indigo-600",
    },
    {
      title: "Tasks",
      value: dashboard?.totalTasks,
      icon: <ListTodo size={30} />,
      color: "text-cyan-600",
    },
    {
      title: "Completed",
      value: dashboard?.completedTasks,
      icon: <CheckCircle2 size={30} />,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: dashboard?.pendingTasks,
      icon: <Clock3 size={30} />,
      color: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: dashboard?.inProgressTasks,
      icon: <LoaderCircle size={30} />,
      color: "text-orange-600",
    },
    {
      title: "Categories",
      value: dashboard?.totalCategories,
      icon: <Tags size={30} />,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to the TaskFlow Administration Panel.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;