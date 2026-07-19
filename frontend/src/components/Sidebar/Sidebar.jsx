import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Projects", path: "/projects" },
  { name: "Tasks", path: "/tasks" },
  { name: "Categories", path: "/categories" },
  { name: "Users", path: "/users" },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 bg-slate-900 text-white lg:block">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold">
          TaskFlow
        </h2>
      </div>

      <nav className="p-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 mb-2 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;