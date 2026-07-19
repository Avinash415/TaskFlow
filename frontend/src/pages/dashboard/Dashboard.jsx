import WelcomeBanner from "./components/WelcomeBanner";
import DashboardStats from "./components/DashboardStats";
import QuickActions from "./components/QuickActions";
import RecentProjects from "./components/RecentProjects";
import RecentTasks from "./components/RecentTasks";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <DashboardStats />

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects />

        <RecentTasks />
      </div>
    </div>
  );
};

export default Dashboard;