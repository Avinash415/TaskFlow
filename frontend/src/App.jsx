import MainLayout from "./layouts/MainLayout";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import { FolderKanban } from "lucide-react";

function App() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-4xl font-bold">
          TaskFlow Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Projects"
            value={12}
            icon={<FolderKanban size={34} />}
          />

          <DashboardCard
            title="Tasks"
            value={56}
            icon={<FolderKanban size={34} />}
          />

          <DashboardCard
            title="Completed"
            value={40}
            icon={<FolderKanban size={34} />}
          />

          <DashboardCard
            title="Pending"
            value={16}
            icon={<FolderKanban size={34} />}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;