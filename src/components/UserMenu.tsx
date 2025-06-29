import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronRight, FileSliders } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { adminEmails } from "@/utils/format";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  badge?: string;
  chevron?: boolean;
}

function MenuItem({
  icon,
  text,
  onClick,
  badge,
  chevron = false,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 text-gray-300 
                 hover:bg-dark-100/80 rounded-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-500">{icon}</div>
        <span>{text}</span>
      </div>
      <div className="flex items-center space-x-3">
        {badge && (
          <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
            {badge}
          </span>
        )}
        {chevron && <ChevronRight className="h-4 w-4 text-gray-500" />}
      </div>
    </button>
  );
}

export default function UserMenu({
  isOpen,
  onClose,
  email,
  picture,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  picture: string;
}) {
  // const [darkMode, setDarkMode] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const getFirstLetterUppercase = (str: string) => {
    if (str.length === 0) return ""; // Return empty if the string is empty
    return str.charAt(0).toUpperCase(); // Get the first character and convert to uppercase
  };
  const handleProfile = () => {
    navigate("/profilesetting");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    localStorage.removeItem("platform");
    localStorage.removeItem("fee");
    localStorage.removeItem("challenge");
    window.location.href = "/login";
  };
  // console.log("----->picture----->", picture);
  return (
    <div className="absolute top-20 right-16 z-50 border border-secondary">
      <div className="inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        ref={menuRef}
        className="right-4 top-16 w-80 bg-dark/95 backdrop-blur-xl border border-dark-300/30 shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Profile Section */}
        <div className="p-4 border-b border-dark-300/30 bg-dark-100/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {picture ? (
                <img
                  src={`${picture}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-accent/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center border border-accent/20 text-xl">
                  {getFirstLetterUppercase(email)}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark" />
            </div>
            <div>
              <h3 className="text-white font-medium">{email}</h3>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1 bg-dark-50/30">
          <MenuItem
            icon={<User className="h-5 w-5" />}
            text="Profile"
            onClick={handleProfile}
          />
        </div>

        {/* Admin Dashboard */}
        {user && adminEmails.includes(user?.email) && (
          <div className="p-2 space-y-1 bg-dark-50/30">
            <MenuItem
              icon={<FileSliders className="h-5 w-5" />}
              text="Admin Dashboard"
              onClick={handleAdmin}
            />
          </div>
        )}

        {/* Footer */}
        <div className="p-2 border-t border-dark-300/30 bg-dark-50/30">
          <MenuItem
            icon={<LogOut className="h-5 w-5" />}
            text="Sign Out"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
    </div>
  );
}
