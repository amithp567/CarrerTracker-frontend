import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

    <div
    className={`min-h-screen flex flex-col transition-all duration-300
        ${collapsed ? "ml-20" : "ml-64"} max-md:ml-20`}
    >
    <main className="flex-1 p-4 md:p-6 min-w-0">
        <Outlet />
    </main>

    <Footer />
    </div>

    </div>
  );
};

export default MainLayout;