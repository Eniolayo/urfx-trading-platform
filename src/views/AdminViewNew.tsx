import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import SideMenuAdmin from "@/components/SideMenuAdmin";

const AdminViewNew = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("landing");

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex left-0 w-full h-full">
        <div className="flex w-full items-start ">
          <SideMenuAdmin
            activeView={activeView}
            onViewChange={setActiveView}
            isCollapsed={menuCollapsed}
            onCollapsedChange={setMenuCollapsed}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminViewNew;
