import {
  FolderKanban,
  ListTodo,
  CheckCircle,
  Layers
} from "lucide-react";

import DashboardCard from "../../../components/common/DashboardCard/DashboardCard";
import useDashboard from "../../../hooks/useDashboard";

const DashboardStats = () => {

  const {
    dashboard,
    loading,
  } = useDashboard();

  if (loading) return null;

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Projects"
        value={dashboard.totalProjects}
        icon={<FolderKanban size={30} />}
      />

      <DashboardCard
        title="Tasks"
        value={dashboard.totalTasks}
        icon={<ListTodo size={30} />}
      />

      <DashboardCard
        title="Completed"
        value={dashboard.completedTasks}
        icon={<CheckCircle size={30} />}
      />

      <DashboardCard
        title="Categories"
        value={dashboard.totalCategories}
        icon={<Layers size={30} />}
      />

    </div>

  );

};

export default DashboardStats;