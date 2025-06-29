import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { collapsedAtom, navbarHeightAtom } from "@/store/atoms";
import { SideMenuProps } from "@/types/sidemenu";
import 'primeicons/primeicons.css';
import {
  BarChart2,
  ChevronLeft,
  Globe,
  ChevronRight,
  CircleUserRound,
  FileText,
  Send,
  HeartHandshake,
  HandHeart,
  CalendarFold,
  SquareKanban,
  TrendingUp,
  BookOpenText,
} from "lucide-react";
import { env } from "@/config/env";
import { useTranslation } from "react-i18next";

const SideMenuUser = ({
  activeView,
  onViewChange,
  isCollapsed,
  onCollapsedChange,
}: SideMenuProps) => {
  const { t } = useTranslation();
  const setCollapsedGlobal = useSetAtom(collapsedAtom);
  const handleNavigate = (item: string) => {
    switch (item) {
        case "telegramcommunity":
          window.open(env.TELEGRAM_COMMUNITY, '_blank');
          break;
        case "telegramsupport":
          window.open(env.TELEGRAM_SUPPORT, '_blank');
          break;
        case "discordcommunity":
          window.open(env.DISCORD_COMMUNITY, '_blank');
          break;
        default:
          navigate(`/${item}`);
      }
    
  };

  const navigate = useNavigate();
  const menuItems = [
    {
      id: "user/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      label: t("Dashboard"),
    },
    {
      id: "user/account",
      icon: <CircleUserRound className="h-5 w-5" />,
      label: t("Trading Account"),
      badge: "3",
    },
    {
      id: "user/billing",
      icon: <FileText className="h-5 w-5" />,
      label: t("Billing"),
    },
    {
      id: "telegramcommunity",
      icon: <Send className="h-5 w-5" />,
      label: t("Telegram Community"),
      badge: "5",
    },
    {
      id: "telegramsupport",
      icon: <HeartHandshake className="h-5 w-5" />,
      label: t("Telegram Support"),
    },
    {
      id: "discordcommunity",
      icon:<i className = "pi pi-discord text-700"/>,
      label: t("Discord Community"),
    },
    {
      id: "user/supportteam",
      icon: <HandHeart className="h-5 w-5" />,
      label: t("Support Team"),
    },
    {
      id: "user/calendarnews",
      icon: <Globe className="h-5 w-5" />,
      label: t("Economic Calendar & News"),
    },
    {
      id: "user/tradingtool",
      icon: <CalendarFold className="h-5 w-5" />,
      label: t("Trading Tools"),
    },
    {
      id: "user/leaderboard",
      icon: <SquareKanban className="h-5 w-5" />,
      label: t("Leaderboard"),
    },
    {
      id: "user/analyticsview",
      icon: <Globe className="h-5 w-5" />,
      label: t("Analytics View"),
    },
    {
      id: "user/certificates",
      icon: <TrendingUp  className="h-5 w-5" />,
      label: t("Certificates"),
    },
    { 
      id: "user/academy",
      icon: <BookOpenText className="h-5 w-5" />,
      label: t("URFX Academy"),
    },
  ];

  const [navbarHeight] = useAtom(navbarHeightAtom);
  console.log("navbarHeight ===>", navbarHeight);
  return (
    <div
      style={{ height: `calc(100vh - ${navbarHeight}px - 3px)` }}
      className={`bg-dark/95 dark:bg-dark/95 bg-white/95 backdrop-blur-xl 
            border-r border-dark-300/30 dark:border-dark-300/30 border-gray-200 transition-all duration-300 z-40 h-full
            ${isCollapsed ? "w-20" : "w-80"}`}
    >
      <button
        onClick={() => {
          onCollapsedChange(!isCollapsed);
          setCollapsedGlobal(!isCollapsed);
        }}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-dark-200 dark:bg-dark-200 bg-gray-100 border border-dark-300/30 dark:border-dark-300/30 border-gray-200
      text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors duration-300"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div
        className="p-4 h-full flex flex-col overflow-y-auto border-r-2 border-gray-200 dark:border-dark-500/50"
        style={{
          scrollbarColor: "rgba(31, 41, 55, 0.5) rgba(243, 244, 246, 0.7)", // thumb, track
          scrollbarWidth: "thin",
        }}
      >
        <style>
          {`
            .light-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .light-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(31, 41, 55, 0.3);
              border-radius: 8px;
            }
            .light-scrollbar::-webkit-scrollbar-track {
              background: rgba(243, 244, 246, 0.7);
              border-radius: 8px;
            }
            .dark .light-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(55, 65, 81, 0.7);
            }
            .dark .light-scrollbar::-webkit-scrollbar-track {
              background: rgba(31, 41, 55, 0.3);
            }
          `}
        </style>
        <nav className="space-y-2 light-scrollbar">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onViewChange(item.id);
                handleNavigate(item.id);
              }}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } p-3 text-gray-300 dark:text-gray-300 text-gray-700 hover:bg-dark-100/80 dark:hover:bg-dark-100/80 hover:bg-gray-100 transition-all duration-300
          ${
            activeView === item.id
              ? "bg-dark-100/80 dark:bg-dark-100/80 bg-gray-200 text-gray-900 bg-gradient-to-r from-cyan-400 to-yellow-300 !text-black"
              : ""
          }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={
                    activeView === item.id
                      ? "text-gray-900"
                      : "text-gray-500 dark:text-gray-500 text-gray-400"
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

export default SideMenuUser;
