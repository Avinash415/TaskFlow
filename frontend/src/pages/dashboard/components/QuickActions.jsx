import { Link } from "react-router-dom";
import {
  FolderPlus,
  ClipboardPlus,
  Tag,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "New Project",
      icon: FolderPlus,
      to: "/projects/new",
    },
    {
      title: "New Task",
      icon: ClipboardPlus,
      to: "/tasks/new",
    },
    {
      title: "New Category",
      icon: Tag,
      to: "/categories/new",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="flex items-center gap-4 rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <Icon className="text-blue-600" />

              <span className="font-medium">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;