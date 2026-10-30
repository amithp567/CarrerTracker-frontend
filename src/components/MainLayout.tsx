import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
        <div className="min-h-screen bg-gray-50">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div
                className={`min-h-screen flex flex-col transition-all duration-300
                ${collapsed ? "ml-20" : "ml-64"}`}
            >
                <main className="flex-1 p-6 min-w-0">
                <Outlet />
                </main>

                
            </div>
        </div>
        <Footer />
    </>
  );
};

export default MainLayout;