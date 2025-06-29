import { env } from "@/config/env";
import {
  BarChart2,
  Globe,
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
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SideMenu_M = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigate = (item: string) => {
    switch (item) {
      case "telegramcommunity":
        window.open(env.TELEGRAM_COMMUNITY, "_blank");
        break;
      case "telegramsupport":
        window.open(env.TELEGRAM_SUPPORT, "_blank");
        break;
      case "discordcommunity":
        window.open(env.DISCORD_COMMUNITY, "_blank");
        break;
      default:
        navigate(`/${item}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const menuItems = [
    {
      id: "user/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      id: "user/account",
      icon: <CircleUserRound className="h-5 w-5" />,
      label: "Trading Account",
    },
    {
      id: "user/billing",
      icon: <FileText className="h-5 w-5" />,
      label: "Billing",
    },
    {
      id: "telegramcommunity",
      icon: <Send className="h-5 w-5" />,
      label: "Telegram Community",
    },
    {
      id: "telegramsupport",
      icon: <HeartHandshake className="h-5 w-5" />,
      label: "Telegram Support",
    },
    {
      id: "discordcommunity",
      icon: <i className="pi pi-discord text-700" />,
      label: "Discord Community",
    },
    {
      id: "user/supportteam",
      icon: <HandHeart className="h-5 w-5" />,
      label: "Support Team",
    },
    {
      id: "user/calendarnews",
      icon: <Globe className="h-5 w-5" />,
      label: "Economic Calendar & News",
    },
    {
      id: "user/tradingtool",
      icon: <CalendarFold className="h-5 w-5" />,
      label: "Trading Tools",
    },
    {
      id: "user/leaderboard",
      icon: <SquareKanban className="h-5 w-5" />,
      label: "Leaderboard",
    },
    {
      id: "user/analyticsview",
      icon: <Globe className="h-5 w-5" />,
      label: "Analytics View",
    },
    {
      id: "user/certificates",
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Certificates",
    },
    {
      id: "user/academy",
      icon: <BookOpenText className="h-5 w-5" />,
      label: "URFX Academy",
    },
  ];

  return (
    <div
      ref={sideMenuRef}
      className={`fixed overflow-auto left-0 top-24 bg-dark/95 backdrop-blur-xl 
                border-r border-dark-300/30 transition-all duration-300 z-40 rounded-xl ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
    >
      <div className="p-4 flex flex-col overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 p-2 rounded-lg 
                             hover:bg-dark-200/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleNavigate(item.id)}
            >
              {item.icon}
              <span className="text-white">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideMenu_M;
