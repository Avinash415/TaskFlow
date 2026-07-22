import WelcomeBanner from "./components/WelcomeBanner";
import QuickActions from "./components/QuickActions";
import RecentProjects from "./components/RecentProjects";
import RecentTasks from "./components/RecentTasks";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <QuickActions />

      <div className="grid gap-8 xl:grid-cols-2">
        <RecentProjects />
        <RecentTasks />
      </div>

    </div>
  );
};

export default Dashboard;