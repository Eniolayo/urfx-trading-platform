import UserManagementButton from "./UserManagementButton";
import axios from "../../utils/api"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { navbarHeightAtom } from "@/store/atoms";

interface userAccountTableDataProps {
  userList: {
    userId: number;
    userName: string;
    totalFee: number;
    totalFund: number;
    status: boolean;
  }[];
}

export default function UserAccountTable() {
  const { t } = useTranslation();
  const [adminSummaryTable, setAdminSummaryTable] =
    useState<userAccountTableDataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDashboardSummaryData = await axios.get(
          `${env.BASE_URL}/admin/summary`
        );
        setAdminSummaryTable(adminDashboardSummaryData.data.data);
      } catch (error) {
        console.error("Fetching the dashboard data", error);
      }
    };
    fetchData();
  }, []);

  const [navbarHeight] = useAtom(navbarHeightAtom);

  return (
    <div style = {{height: `calc(100vh - ${navbarHeight}px - 3px)`}} className="p-6 w-full">
      <div className="glass-panel rounded-xl w-full p-4">
        <div className="overflow-auto h-full w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4 text-md text-center font-medium text-gray-400">
                  {t("NoOrder")}
                </th>
                <th className="pb-4 text-md text-center font-medium text-gray-400">
                  {t("Name")}
                </th>
                <th className="pb-4 text-md text-center font-medium text-gray-400">
                  {t("Price")}
                </th>
                <th className="pb-4 text-md text-center font-medium text-gray-400">
                  {t("Fund")}
                </th>
                {/* <th className="pb-4 text-md text-center font-medium text-gray-400">
                Leverage
              </th> */}
                <th className="pb-4 text-md text-center font-medium text-gray-400">
                  {t("Status")}
                </th>
                <th className="pb-4 text-md text-center font-medium text-gray-400 w-[20%]">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300/30">
              {adminSummaryTable?.userList.map((stats, index) => (
                <tr key={index} className="text-md">
                  <td className="py-4 text-white text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 text-center">
                    <div className="text-center text-emerald-400">
                      {stats.userName}
                    </div>
                  </td>
                  <td className="py-4 text-center text-gray-300">
                    {stats.totalFee}
                  </td>
                  <td className="py-4 text-center text-gray-300">
                    {stats.totalFund}
                  </td>
                  {/* <td className="py-4 text-center text-gray-300">
                  {stats.leverage}
                </td> */}
                  <td className="py-4 text-center text-gray-300 ">
                    {stats.status == true && "Active"}
                  </td>
                  <td className="py-4 text-center text-gray-300 flex flex-row justify-center ">
                    <UserManagementButton
                      buttonName="Edit"
                      handleClick={() => {}}
                    />
                    <UserManagementButton
                      buttonName="Disable"
                      handleClick={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
