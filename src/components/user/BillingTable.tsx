import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { useAtom, useAtomValue } from "jotai";
import { navbarHeightAtom, themeAtom, userAtom } from "@/store/atoms";
import axios from "../../utils/api";
import { useTranslation } from "react-i18next";
import GeneralButtonWithCss from "../landing/GeneralButtonWithCss";
import billingicon from "/src/assets/Dashboard/billingicon.svg";
import downloadicon from "/src/assets/Dashboard/downloadicon.svg";
import billingiconlight from "/src/assets/Dashboard/billingiconlight.svg";
import downloadiconlight from "/src/assets/Dashboard/downloadiconlight.svg";

interface userAccountTableDataProps {
  date: Date;
  amount: number;
  type: string;
  status: string;
  accountId: string;
}
[];

export default function BillingTable() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);

  const [adminBillTable, setAdminBillTable] = useState<
    userAccountTableDataProps[] | null
  >(null);
  console.log(adminBillTable);
  const themeAtomValue = useAtomValue(themeAtom);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return;
        const adminDashboardBillData = await axios.post(
          `${env.BASE_URL}/payment/get-balance`,
          { email: user.email }
        );
        console.log("Response", adminDashboardBillData);
        setAdminBillTable(adminDashboardBillData.data.result);
      } catch (error) {
        console.error("Fetching the dashboard data", error);
      }
    };
    fetchData();
  }, [user]);

  const [navbarHeight] = useAtom(navbarHeightAtom);

  const invoices = [
    {
      phase: "Two Phase",
      accountSize: "$200,000",
      proforma: "123456789",
      status: "Unpaid",
      date: "Dec 7, 2025",
      time: "23:26",
      amount: "$250.00",
      platform: "MetaTrader4",
      downloadable: false,
    },
    {
      phase: "Two Phase",
      accountSize: "$200,000",
      proforma: "123456789",
      status: "Paid",
      date: "Dec 7, 2025",
      time: "23:26",
      amount: "$250.00",
      platform: "MetaTrader4",
      downloadable: true,
    },
    {
      phase: "Two Phase",
      accountSize: "$200,000",
      proforma: "123456789",
      status: "Unpaid",
      date: "Dec 7, 2025",
      time: "23:26",
      amount: "$250.00",
      platform: "MetaTrader4",
      downloadable: false,
    },
  ];

  const getStatusColor = (status: any) =>
    status === "Paid"
      ? "bg-green-600/50 text-green-500"
      : "bg-red-600/50 text-red-500";

  const [activeTab, setActiveTab] = useState("All");

  return (
    <div style={{ height: `calc(100vh - ${navbarHeight}px - 3px)` }} className="glass-panel h-full w-full">
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">
        <h1 className="text-[24px] font-semibold mb-6 flex items-center gap-3">
          <span><img src={themeAtomValue=='dark'?billingicon:billingiconlight} alt="billing icon" /></span> Billing
        </h1>

        {/* Tabs */}
        <div className="flex space-x-2 bg-[#2a2a2a] p-1 mb-2 w-fit">
          {["All", "Paid", "Unpaid"]?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm font-medium ${tab === activeTab
                ? "bg-gradient-to-r from-lime-400 to-cyan-400 text-black rounded-sm"
                : "text-gray-300 hover:text-black dark:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-8 bg-gradient-to-r from-green-900 to-yellow-600 text-white py-3 px-4 font-semibold mb-2 dark:from-green-900 dark:to-yellow-700">
          <div className="col-span-3">Pay</div>
          <div className="col-span-2 sm:col-span-1">Status</div>
          <div className="col-span-2 sm:col-span-1">Date</div>
          <div className="hidden sm:block">Amount</div>
          <div className="hidden sm:block col-span-2">Platform</div>
          <div className="block sm:hidden"></div>
        </div>

        {/* Entries */}
        {invoices.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-8 items-center p-4 mb-2 ${item.status === "Paid"
              ? "bg-gray-100 dark:bg-[#1A1A1A]"
              : "bg-white dark:bg-black dark:border-gray-700"
              }`}
          >
            <div className="col-span-3">
              <div>{item.phase}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Account size: {item.accountSize}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Proforma No: {item.proforma}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className={`px-3 py-1 rounded text-xs sm:text-sm font-bold ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="text-xs sm:text-sm col-span-2 sm:col-span-1">
              {item.date}
              <br />
              {item.time}
            </div>

            <div className="font-semibold hidden sm:block">{item.amount}</div>

            <GeneralButtonWithCss
              blur={true}
              className="text-[14px] sm:text-[15px] md:text-[14px] w-[40px] h-[32px] sm:w-[152] sm:h-[36.816px] md:w-[162px] md:h-[42px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
              bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
            >
              <span className="mr-2 hidden sm:block">{t("Download Invoice")}</span> <img src={themeAtomValue=='dark'?downloadicon:downloadiconlight} alt="download icon" />
            </GeneralButtonWithCss>
          </div>
        ))}
      </div>
    </div>
  );
}
