import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { collapsedAtom, navbarHeightAtom } from "@/store/atoms";
import { SideMenuProps } from "@/types/sidemenu";
import { useTranslation } from "react-i18next";
import {
  BarChart2,
  ChevronLeft,
  Globe,
  Webhook,
  ChevronRight,
  LineChart,
  Bell,
} from "lucide-react";

const SideMenuAdmin = ({
  activeView,
  onViewChange,
  isCollapsed,
  onCollapsedChange,
}: SideMenuProps) => {
  const { t } = useTranslation();
  const setCollapsedGlobal = useSetAtom(collapsedAtom);
  const handleNavigate = (item: string) => {
    navigate(`/${item}`);
  };


  const navigate = useNavigate();
  const menuItems = [
    {
      id: "admin/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      label: t("Dashboard"),
    },
    {
      id: "admin/useraccount",
      icon: <Bell className="h-5 w-5" />,
      label: t("User Account"),
      badge: "3",
    },
    { id: "#", icon: <LineChart className="h-5 w-5" />, label: t("Coming soon")},
    {
      id: "#",
      icon: <Webhook className="h-5 w-5" />,
      label: t("Coming soon"),
      badge: "5",
    },
    { id: "#", icon: <Globe className="h-5 w-5" />, label: t("Coming soon")},
  ];

  const [navbarHeight] = useAtom(navbarHeightAtom);

  return (
    <div
      style={{height : `calc(100vh - ${navbarHeight}px - 3px)`}}
      className={`bg-dark/95 backdrop-blur-xl 
                  border-r border-dark-300/30 transition-all duration-300 z-40
                  ${isCollapsed ? "w-20" : "w-80"}`}
    >
      <button
        onClick={() => {
          onCollapsedChange(!isCollapsed);
          setCollapsedGlobal(!isCollapsed);
        }}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-dark-200 border border-dark-300/30
        text-gray-400 hover:text-white transition-colors duration-300"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div className="p-4 h-full flex flex-col overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onViewChange(item.id);
                handleNavigate(item.id);
              }}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } p-3 text-gray-300 hover:bg-dark-100/80 rounded-lg transition-all duration-300
                ${activeView === item.id ? "bg-dark-100/80 text-white" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={
                    activeView === item.id ? "text-white" : "text-gray-500"
                  }
                >
                  {item.icon}
                </div>
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideMenuAdmin;
