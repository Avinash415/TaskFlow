import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Tags,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, isAdmin } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

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
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600">

              <span className="text-2xl font-bold text-white">
                T
              </span>

            </div>

            <div>

              <h1 className="text-2xl font-bold">
                TaskFlow
              </h1>

              <p className="-mt-1 text-xs text-gray-500">
                Enterprise
              </p>

            </div>

          </div>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 md:flex">

            {menus.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
              >
                {menu.name}
              </Link>
            ))}

          </nav>

          {/* Desktop User */}

          <div className="hidden items-center gap-4 md:flex">

            <div
              onClick={() =>
                setShowUserMenu(!showUserMenu)
              }
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="text-right">

                <p className="text-sm font-semibold">

                  {user?.fullName}

                </p>

                <p className="text-xs text-gray-500">

                  {user?.email}

                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">

                {user?.fullName?.charAt(0)}

              </div>

              <ChevronDown size={18} />

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2 text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

          {/* Mobile Button */}

          <button
            className="rounded-xl p-2 hover:bg-gray-100 md:hidden"
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
          >
            {isMobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (

        <div className="border-t bg-white md:hidden">

          {/* User */}

          <div className="border-b p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">

                {user?.fullName?.charAt(0)}

              </div>

              <div>

                <h3 className="font-semibold">

                  {user?.fullName}

                </h3>

                <p className="text-sm text-gray-500">

                  {user?.email}

                </p>

              </div>

            </div>

          </div>

          {/* Main Menu */}

          <div className="p-5">

            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">

              Main Menu

            </p>

            <div className="space-y-2">

              {menus.map((menu) => (

                <Link
                  key={menu.path}
                  to={menu.path}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-gray-100"
                >
                  <menu.icon size={20} />

                  {menu.name}

                </Link>

              ))}

            </div>

            {isAdmin && (

              <>

                <div className="my-6 border-t" />

                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">

                  Admin

                </p>

                <div className="space-y-2">

                  {adminMenus.map((menu) => (

                    <Link
                      key={menu.path}
                      to={menu.path}
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="flex items-center gap-4 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <menu.icon size={20} />

                      {menu.name}

                    </Link>

                  ))}

                </div>

              </>

            )}

            <div className="my-6 border-t" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>

      )}

    </header>
  );
};

export default Navbar;