import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Tags,
  Users,
  ShieldCheck,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: Tags,
    },
  ];

  const adminMenus = [
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: ShieldCheck,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-col h-screen bg-slate-950 text-white border-r border-slate-800 sticky top-0 overflow-y-auto">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-3xl">
              T
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              TaskFlow
            </h1>

            <p className="text-xs text-slate-400 -mt-1">
              Enterprise Edition
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 px-6 py-8">

        <div className="mb-6 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          MAIN MENU
        </div>

        <nav className="space-y-1">

          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "hover:bg-slate-800 text-slate-300 hover:text-white"
                }`
              }
            >
              <menu.icon size={22} />
              {menu.name}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="mt-8 mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                ADMIN
              </div>

              {adminMenus.map((menu) => (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "hover:bg-slate-800 text-slate-300 hover:text-white"
                    }`
                  }
                >
                  <menu.icon size={22} />
                  {menu.name}
                </NavLink>
              ))}
            </>
          )}

        </nav>
      </div>

      {/* Footer */}

      <div className="p-6 border-t border-slate-800 mt-auto">

        <div className="rounded-2xl bg-slate-900 p-5 text-sm">

          <p className="text-slate-400 text-xs mb-2">
            NEED HELP?
          </p>

          <button
            type="button"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Contact Support →
          </button>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;