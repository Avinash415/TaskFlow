import {
  FolderKanban,
  ListTodo,
  CheckCircle,
  Layers,
} from "lucide-react";

import DashboardCard from "../../../components/common/DashboardCard/DashboardCard";
import useDashboard from "../../../hooks/useDashboard";

const DashboardStats = () => {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Projects"
        value={dashboard.totalProjects ?? 0}
        icon={<FolderKanban size={30} />}
      />

      <DashboardCard
        title="Tasks"
        value={dashboard.totalTasks ?? 0}
        icon={<ListTodo size={30} />}
      />

      <DashboardCard
        title="Completed"
        value={dashboard.completedTasks ?? 0}
        icon={<CheckCircle size={30} />}
      />

      <DashboardCard
        title="Categories"
        value={dashboard.totalCategories ?? 0}
        icon={<Layers size={30} />}
      />
    </div>
  );
};

export default DashboardStats;