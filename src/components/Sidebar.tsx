import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";

import { LogoutAPI } from "../api/auth";
import { getErrorMessage } from "./ErrorCatcher";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate()
  const name = localStorage.getItem("name");

  const menuItems = [
    { name: "Dashboard", path: "/home", icon: LayoutDashboard },
    { name: "Companies", path: "/companies", icon: Building2 },
    { name: "Career Page Tracker", path: "/notes", icon: NotebookPen },
    {name: "Application Tracker", path:"/application", icon:NotebookPen}
  ];

  const handleLogout = async() => {
    const refresh = localStorage.getItem('refresh')?.toString() ?? "";
    try{
        const response = await LogoutAPI({refresh})

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("name");

        toast.success(response.message || "Logout successfully.")
        navigate('/')
    }catch(error){
        toast.error(getErrorMessage(error))
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white
      transition-all duration-300 p-4 z-50 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between mb-10">
        {!collapsed && (
          <h1 className="text-xl font-bold whitespace-nowrap">
            CareerTracker
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-700"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : ""}
              className="flex items-center gap-4 p-3 rounded-lg
              hover:bg-gray-700 transition-colors"
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {name && (
        <div className="border-t border-gray-700 pt-4 mt-auto">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 min-w-10 rounded-full bg-blue-600
            flex items-center justify-center font-bold text-white uppercase">
              {name.slice(0, 1)}
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {name}
                </p>
                <p className="text-xs text-gray-400">
                  Account
                </p>
              </div>
            )}

            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>

          {collapsed && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="mt-3 w-full flex justify-center p-2
              rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
