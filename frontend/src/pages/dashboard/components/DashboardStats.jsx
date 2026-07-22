import { FolderKanban, ListTodo, Tags, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardStats = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Projects",
      icon: <FolderKanban size={32} />,
      path: "/projects",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Tasks",
      icon: <ListTodo size={32} />,
      path: "/tasks",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Categories",
      icon: <Tags size={32} />,
      path: "/categories",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Users",
      icon: <Users size={32} />,
      path: "/users",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.title}
          onClick={() => navigate(card.path)}
          className="rounded-2xl border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className={`mb-5 inline-flex rounded-xl p-4 ${card.color}`}>
            {card.icon}
          </div>

          <h3 className="text-lg font-semibold">{card.title}</h3>

          <p className="mt-1 text-sm text-gray-500">
            Open {card.title.toLowerCase()} module
          </p>
        </button>
      ))}
    </div>
  );
};

export default DashboardStats;
