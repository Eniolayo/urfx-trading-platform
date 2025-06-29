import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../utils/api";
import { UserParams } from "@/types/tradeLocker";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { getAccounts } from "@/app/reducers/metaAccount";
import { dispatch } from "@/app/store";

export default function Layout() {
  const [user] = useAtom(userAtom);

  useEffect(() => {
    user && dispatch(getAccounts(user?.email));
  }, [user]);

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
      <div
        className={`flex-1 z-10`}
      >
        <Outlet />
      </div>
    </div>
  );
}
