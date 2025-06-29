import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideMenuUser from "@/components/user/SideMenuUser";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/api";
import { UserParams } from "@/types/tradeLocker";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { getAccounts } from "@/app/reducers/metaAccount";
import { dispatch } from "@/app/store";

const UserLayout = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("landing");

  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useAtom(userAtom);

  useEffect(() => {
    user && dispatch(getAccounts(user?.email));
  }, [user]);

  useEffect(() => {
    setActiveView(location.pathname.replace(/^\/+/, '') || "landing");
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if no token
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const tradelockerUser: UserParams | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      if (refreshToken && tradelockerUser) {
        const response = await axios.post("tradelocker/refresh", {
          refreshToken,
          accountType: tradelockerUser.accountType,
        });
        localStorage.setItem("accessToken", response.data.data.newAccessToken);
        localStorage.setItem(
          "refreshToken",
          response.data.data.newRefreshToken
        );
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex left-0 w-full h-full items-start">
        <div className="flex w-full items-start h-full justify-start">
          <div className="hidden lg:flex h-full">
            <SideMenuUser
              activeView={activeView}
              onViewChange={setActiveView}
              isCollapsed={menuCollapsed}
              onCollapsedChange={setMenuCollapsed}
            />
          </div>
          <div className="h-full w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
