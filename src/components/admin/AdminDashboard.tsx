import PerformanceChart from "../dashboard/PerformanceChart";
import {
  BadgeDollarSign,
  BarChart2,
  CheckCheck,
  DollarSign,
  MailX,
  Navigation,
  PhoneMissed,
  ShoppingCart,
  UserCheck,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { env } from "@/config/env";
import axios from "../../utils/api";
import { useAtom } from "jotai";
import { navbarHeightAtom } from "@/store/atoms";

export interface ChartProps {
  groupedByDay: Record<string, number>;
  groupedByMonth: Record<string, number>;
  groupedByYear: Record<string, number>;
}

interface AdminSummaryProps {
  summary: {
    totalUsers: number;
    activeUsers: number;
    emailUnverifiedUsers: number;
    phoneUnverifiedUsers: number;
    totalAccounts: number;
    totalSales: number;
    totalFund: number;
    totalTrade: number;
    completedTrade: number;
    openTrade: number;
  };
  groupedSoldData: ChartProps;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const AdminDashboardMainItems = [
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: t("Total Users"),
      value: "Total Users",
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: t("Active Users"),
      value: "Active Users",
    },
    {
      icon: <MailX className="h-5 w-5" />,
      title: t("Email Unverified Users"),
      value: "Email Unverified Users",
    },
    {
      icon: <PhoneMissed className="h-5 w-5" />,
      title: t("Phone Unverified Users"),
      value: "Phone Unverified Users",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t("Total Accounts"),
      value: "Total Accounts",
    },
    {
      icon: <BadgeDollarSign className="h-5 w-5" />,
      title: t("Total Revenue"),
      value: "Total Revenue",
    },
  ];

  const AdminDashboardOrderItems = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: t("Total Funds"),
      value: "Total Funds",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      title: t("Total Trade"),
      value: "Total Trade",
    },
    {
      icon: <CheckCheck className="h-5 w-5" />,
      title: t("Completed Trade"),
      value: "Completed Trade",
    },
    {
      icon: <Navigation className="h-5 w-5" />,
      title: t("Open Trade"),
      value: "Open Trade",
    },
  ];

  const [adminSummary, setAdminSummary] = useState<AdminSummaryProps | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDashboardSummary = await axios.get(
          `${env.BASE_URL}/admin/summary`
        );
        setAdminSummary(adminDashboardSummary.data.data);
      } catch (error) {
        console.error("Fetching the dashboard data", error);
      }
    };
    fetchData();
  }, []);

  const [navbarHeight] = useAtom(navbarHeightAtom);

  return (
    <div
      style={{ height: `calc(100vh - ${navbarHeight}px - 3px)` }}
      className="w-full overflow-y-auto p-5 space-y-4 "
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-between">
        {AdminDashboardMainItems.map((item, index) => (
          <div
            className="glass-panel glass-panel-hover rounded-xl p-6 flex w-full border border-dark-300/30 h-auto"
            key={`adminDashboardMainItems-${index}`}
          >
            <div className="lg:flex lg:flex-row flex flex-col lg:items-start space-x-4">
              <div className="p-3 bg-dark-200/50 rounded-lg">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 h-auto">
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-xl mt-1">
                  {item.value === "Total Users" &&
                    (adminSummary?.summary?.totalUsers || 0)}
                  {item.value === "Active Users" &&
                    (adminSummary?.summary?.activeUsers || 0)}
                  {item.value === "Email Unverified Users" &&
                    (adminSummary?.summary?.emailUnverifiedUsers || 0)}
                  {item.value === "Phone Unverified Users" &&
                    (adminSummary?.summary?.phoneUnverifiedUsers || 0)}
                  {item.value === "Total Accounts" &&
                    (adminSummary?.summary?.totalAccounts || 0)}
                  {item.value === "Total Revenue" &&
                    (adminSummary?.summary?.totalSales || 0)}
                </p>
                <button
                  className={`mt-4 w-full flex items-center justify-center `}
                ></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2 h-full">
          <PerformanceChart chartData={adminSummary?.groupedSoldData} />
        </div>

        <div className="col-span-1 flex flex-col justify-between gap-4">
          {AdminDashboardOrderItems.map((item, index) => (
            <div
              className="glass-panel glass-panel-hover rounded-xl p-6 flex w-full sm:w-[45%] md:w-full border border-dark-300/30 h-auto"
              key={`adminDashboardOrder-${index}`}
            >
              <div className="lg:flex lg:flex-row flex flex-col lg:items-start space-x-4">
                <div className="p-3 bg-dark-200/50 rounded-lg">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 h-auto">
                    <h3 className="text-lg font-medium text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xl mt-1">
                    {item.value === "Total Funds" &&
                      adminSummary?.summary?.totalFund}
                    {item.value === "Total Trade" &&
                      adminSummary?.summary?.totalTrade}
                    {item.value === "Completed Trade" &&
                      adminSummary?.summary?.completedTrade}
                    {item.value === "Open Trade" &&
                      adminSummary?.summary?.openTrade}
                  </p>
                  <button
                    className={`mt-4 w-full flex items-center justify-center `}
                  ></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
