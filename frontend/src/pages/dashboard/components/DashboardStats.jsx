import {
  FolderKanban,
  ClipboardList,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import DashboardCard from "../../../components/DashboardCard/DashboardCard";

const DashboardStats = () => {
  const stats = [
    {
      title: "Projects",
      value: 8,
      icon: <FolderKanban size={32} />,
    },
    {
      title: "Tasks",
      value: 63,
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Completed",
      value: 45,
      icon: <CircleCheckBig size={32} />,
    },
    {
      title: "Pending",
      value: 18,
      icon: <Clock3 size={32} />,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <DashboardCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;