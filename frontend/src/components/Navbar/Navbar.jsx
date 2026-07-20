import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-2xl tracking-tighter">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">TaskFlow</h1>
              <p className="text-xs text-gray-500 -mt-1">Enterprise</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
            <a href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="/projects" className="hover:text-indigo-600 transition-colors">Projects</a>
            <a href="/tasks" className="hover:text-indigo-600 transition-colors">Tasks</a>
          </nav>

          {/* User Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {user?.fullName ?? "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold text-lg">
                {user?.fullName?.charAt(0) ?? "U"}
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-8">
          <nav className="flex flex-col gap-6 text-lg">
            <a href="/dashboard" className="font-medium">Dashboard</a>
            <a href="/projects" className="font-medium">Projects</a>
            <a href="/tasks" className="font-medium">Tasks</a>
          </nav>

          <div className="mt-8 pt-8 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 text-white rounded-2xl font-medium"
            >
              <LogOut size={22} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;