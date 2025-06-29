import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
} from "lucide-react";
import { dispatch, useSelector } from "@/app/store";
import { navbarHeightAtom, themeAtom, userAtom } from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import { getVisualStats } from "@/app/reducers/metaStats";
import {
  getMetaTotalStats,
  updateAnalysis,
} from "@/app/reducers/metaTotalStats";
import { getMetaVisualTrades } from "@/app/reducers/metaVisualTrades";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import "react-loading-skeleton/dist/skeleton.css";

import transfericon from "/src/assets/Dashboard/transfericon.svg";
import transferred from "/src/assets/Dashboard/transferred.svg";
import bookicon from "/src/assets/Dashboard/bookicon.svg";
import summaryicon from "/src/assets/Dashboard/summaryicon.svg";
import analysisicon from "/src/assets/Dashboard/analysisicon.svg";
import equityicon from "/src/assets/Dashboard/equityicon.svg";
import billicon from "/src/assets/Dashboard/billicon.svg";
import bookiconlight from "/src/assets/Dashboard/bookiconlight.svg";
import timeicon from "/src/assets/Dashboard/timeicon.svg";
import timeiconblack from "/src/assets/Dashboard/timeiconblack.svg";
import summaryiconlight from "/src/assets/Dashboard/summaryiconlight.svg";
import analysisiconlight from "/src/assets/Dashboard/analysisiconlight.svg";
import equityiconlight from "/src/assets/Dashboard/equityiconlight.svg";
import billiconlight from "/src/assets/Dashboard/billiconlight.svg";
import lineupicon from "/src/assets/Dashboard/lineupicon.png";
import tickicon from "/src/assets/Dashboard/tickicon.svg";
import tickcircleicon from "/src/assets/Dashboard/tickcircleicon.svg";
import depositicon from "/src/assets/mydepoicon.png";
import GeneralButtonWithCss from "@/components/landing/GeneralButtonWithCss";
import { useNavigate } from "react-router-dom";


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-gray-500 dark:bg-black text-white dark:text-white text-sm border border-cyan-400 p-3 rounded shadow-md">
        <p>Number of trades: <strong>{d.trades}</strong></p>
        <p>Balance: <strong>${(d.value / 1000)?.toFixed(0)}k</strong></p>
        <p>Time: <span>{d.time}</span></p>
      </div>
    );
  }
  return null;
};

export default function DashboardView() {
  const { t } = useTranslation();
  const [loadingTotal, setLoadingTotal] = useState<boolean>(true);
  const [loadingTrades, setLoadingTrades] = useState<boolean>(true);

  console.log(loadingTotal);
  console.log(loadingTrades);

  const [dashboardData, setDashboardData] = useState<any>({});

  const [dailySummary, setdailySummary] = useState<any>([]);
  const [recentTrades, setRecentTrades] = useState<any>([]);

  const mapAllData = () => {
    const tempdailySummary = Array.isArray(dashboardData.dailyGrowth)
      ? dashboardData.dailyGrowth.map((entry: any) => ({
        date: new Date(entry.date).toLocaleDateString("en-US"),
        trades: dashboardData.trades || 0,
        lots: Math.round(entry.lots * 100),
        result: `$${Math.abs(entry.profit)?.toFixed(2)}`
      }))
      : [];

    setdailySummary([...tempdailySummary]); // safe now

    const temprecentTrades = Array.isArray(dashboardData.monthlyAnalytics)
      ? dashboardData.monthlyAnalytics.flatMap((month: any) => {
        return month.currencies?.map((currency: any) => ({
          symbol: currency.currency || "N/A",
          type: `$${currency.rewardToRiskRatio?.toFixed(2) ?? "0.00"}`,
          lots: month.lots?.toFixed(2),
          openPrice: "$100.00",
          closePrice: "$90.00",
          openTime: new Date(`${month.date}-01`).toDateString(),
          closeTime: new Date(`${month.date}-28`).toDateString(),
          profit: `$${month.profit?.toFixed(2)}`,
          dynamic: month.gains >= 0 ? "up" : "down",
        })) || []; // fallback for missing month.currencies
      })
      : [];

    setRecentTrades([...temprecentTrades]); // safe now  }
  }
  
  const [index] = useState<string>("month");
  const [user] = useAtom(userAtom);
  const [accountIndex] = useState<number>(0);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);

  useEffect(() => { mapAllData() }, [dashboardData]);

  // Debounced function to fetch data
  const fetchData = debounce(async () => {
    if (true) {
      setLoadingTrades(true);
      setLoadingTotal(true);

      try {
        // Combine related API calls into a single call
        const accountId = 'd02ae8d0-2357-4dc4-bc0a-206398abe83d';
        //const email = user.email;

        await Promise.all([
          // dispatch(getMetaStats(accountId, email)),
          dispatch(getMetaTotalStats('d02ae8d0-2357-4dc4-bc0a-206398abe83d')).then((result: any) => {
            setDashboardData(result);
            mapAllData();
            dispatch(updateAnalysis(accountId))
          }
          ),
          dispatch(getVisualStats(accountId)),
        ]);

        // Update analysis after fetching stats
      } catch (error) {
        setShowLoader(false);
        console.error("Error fetching data:", error);
      } finally {
        setShowLoader(false);
        setLoadingTrades(false);
        setLoadingTotal(false);
      }
    }
  }, 300); // Debounce with a 300ms delay

  // Fetch visual trades data
  const fetchVisualTrades = debounce(async () => {
    if (metaAccounts[accountIndex]?.accountId && user) {
      try {
        const accountId = metaAccounts[accountIndex].accountId;
        const email = user.email;

        await dispatch(getMetaVisualTrades(email, index, accountId));
      } catch (error) {
        console.error("Error fetching visual trades:", error);
      }
    }
  }, 300); // Debounce with a 300ms delay

  useEffect(() => {
    fetchData();
    return () => fetchData.cancel(); // Cancel debounced calls on cleanup
  }, [metaAccounts, accountIndex]);

  useEffect(() => {
    fetchData();
    return () => fetchData.cancel(); // Cancel debounced calls on cleanup
  }, []);

  useEffect(() => {
    fetchVisualTrades();
    return () => fetchVisualTrades.cancel(); // Cancel debounced calls on cleanup
  }, [metaAccounts, index, accountIndex]);

  const [chartWidth, setChartWidth] = useState(700);

  console.log(chartWidth);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? window.innerWidth - 40 : 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [navbarHeight] = useAtom(navbarHeightAtom);
  const equityStats = dashboardData.dailyGrowth?.map((item: any) => {
    const normalized = Math.round((item.balance / dashboardData.highestBalance) * 100);
    return { value: normalized };
  });


  const winningData = [
    { value: 20 },
    { value: 40 },
    { value: 65 },
    { value: 60 },
    { value: 90 },
    { value: 80 },
    { value: 100 }
  ];

  const losingData = [
    { value: 100 },
    { value: 80 },
    { value: 90 },
    { value: 60 },
    { value: 65 },
    { value: 40 },
    { value: 20 }
  ];

  const objectives = [
    {
      label: "Daily Loss Limit",
      valueLeft: `$${(5000 - (dashboardData.dailyGrowth?.[0]?.profit || 0))?.toFixed(2)} Left`,
      percentage: Math.max(
        0,
        100 - Math.abs((dashboardData.dailyGrowth?.[0]?.profit || 0) / 5000) * 100
      ),
      time: "18:19:20", // placeholder
      details: [
        { label: "Maximum daily loss", value: "$5,000.00" },
        { label: "Today’s starting balance/ equity", value: `$${dashboardData.balance?.toFixed(2)}` },
        {
          label: "Threshold at",
          value: `$${(dashboardData.balance - 5000)?.toFixed(2)}`
        }
      ],
      completed: dashboardData.dailyGain >= 0
    },
    {
      label: "Max Loss Limit",
      valueLeft: `$${(10000 + dashboardData.profit)?.toFixed(2)} Left`,
      percentage: Math.max(0, 100 - Math.abs((dashboardData.profit / 10000) * 100)),
      time: "18:19:20",
      details: [
        { label: "Maximum loss", value: "$10,000.00" },
        {
          label: "Threshold at",
          value: `$${(dashboardData.deposits - 10000)?.toFixed(2)}`
        }
      ],
      completed: dashboardData.profit > -10000
    },
    {
      label: "Profit Target",
      valueLeft: `$${(8000 + dashboardData.profit)?.toFixed(2)} Left`,
      percentage: Math.min(100, ((dashboardData.profit + 8000) / 8000) * 100),
      time: "18:19:20",
      details: [{ label: "Profit target", value: "$8000.00" }],
      completed: dashboardData.profit >= 8000,
      highlight: true
    }
  ];

  const accountAnalytics = [
    { label: "Number of days", value: dashboardData.daysSinceTradingStarted?.toFixed(0) },
    { label: "Total trades taken", value: dashboardData.trades },
    { label: "Average trades per day", value: dashboardData.trades / Number(dashboardData.daysSinceTradingStarted?.toFixed(0)) },
    { label: "Total lots used", value: dashboardData.lots },
    { label: "Average lots used", value: dashboardData.lots / Number(dashboardData.daysSinceTradingStarted?.toFixed(0)) },
    { label: "Biggest win", value: dashboardData.bestTrade, color: "text-green-500" },
    { label: "Biggest loss", value: dashboardData.worstTrade, color: "text-red-500" },
  ];

  const tabsforbar = ["All time", "Last Month", "This Week"];

  const [activeTab, setActiveTab] = useState("All time");

  const themeAtomValue = useAtomValue(themeAtom);

  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState<boolean>(true);

  return (
    <div style={{ height: `calc(100vh - ${navbarHeight}px - 3px)`, background: themeAtomValue == 'dark' ? '#070707' : '#F5F5F5' }} className="w-full overflow-y-auto">
      {showLoader ? <div className="flex items-center justify-center h-full w-full">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-gray-300 border-t-blue-500 dark:border-gray-600 dark:border-t-blue-400"></div>
      </div> : <div className="w-full h-full py-6 p-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative text-black dark:text-white px-4 py-6 w-full max-w-md shadow-lg overflow-hidden h-[177px]" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            {/* Top Row */}
            <span className="absolute top-0 left-0 w-[15%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
            <span className="absolute top-0 right-0 w-[15%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
            <span className="absolute bottom-0 right-0 w-[15%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
            <span className="absolute bottom-0 left-0 w-[15%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
            <div className="flex justify-between items-start mb-[48px]">
              <GeneralButtonWithCss
                blur={true}
                onClick={() => navigate("/user/account")}
                className="text-[14px] sm:text-[15px] md:text-[14px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[133px] md:h-[33px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
                bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
              >
                {t("Account")} <ArrowRight className="ml-2 w-4 h-4" />
              </GeneralButtonWithCss>
              <div className="text-right flex gap-1 items-center">
                <p className="text-zinc-400 text-xs">Equity</p>
                <p className="text-base font-semibold">{dashboardData.equityPercent}%</p>
              </div>
            </div>

            {/* Balance Info */}
            <div>
              <p className="text-zinc-400 text-sm">Balance</p>
              <p className="text-2xl font-bold">{dashboardData.balance}</p>
            </div>

            {/* Logo Bottom Right */}
            <div className="absolute bottom-[30px] right-[30px] transform translate-x-1/4 translate-y-1/4">
              <img src={depositicon} alt="depost icon" />
            </div>
          </div>

          <div className="text-black dark:text-white px-4 py-5 shadow-lg w-full max-w-sm h-[177px] border border-gray-300" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
              <img src={transfericon} alt="transfer icon" />
              <div className="w-[107px] h-[41px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={winningData}>
                    <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Middle Section */}
            <div>
              <p className="text-gray-400 text-[14px]">Highest Winning Trade</p>
              <h2 className="text-[24px] font-semibold text-green-400">${dashboardData.bestTrade}</h2>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-gray-400 text-sm">Number of Trades</p>
              <div className="flex items-center space-x-1 text-black dark:text-white font-semibold gap-1">
                <span>{dashboardData.trades}</span>
                <img src={lineupicon} alt="line up icon" />
              </div>
            </div>
          </div>

          <div className="text-black dark:text-white px-4 py-5 shadow-lg w-full max-w-sm h-[177px] border border-gray-300" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
              <img src={transferred} alt="transfer red" />
              <div className="w-[107px] h-[41px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={losingData}>
                    <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Middle Section */}
            <div>
              <p className="text-gray-400 text-[14px]">Lowest Losing Trade</p>
              <h2 className="text-[24px] font-semibold text-red-400">${dashboardData.worstTrade}</h2>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-gray-400 text-sm">Number of Trades</p>
              <div className="flex items-center space-x-1 text-black dark:text-white font-semibold gap-1">
                <span>{dashboardData.trades}</span>
                <img src={lineupicon} alt="line up icon" />
              </div>
            </div>
          </div>

          <div className="text-black dark:text-white px-4 py-4 w-full max-w-md shadow-lg h-[177px] relative" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            <span className="absolute top-0 left-0 w-[15%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
            <span className="absolute top-0 right-0 w-[15%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
            <span className="absolute bottom-0 right-0 w-[15%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
            <span className="absolute bottom-0 left-0 w-[15%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="rounded">
                  <img src={themeAtomValue == 'dark' ? bookicon : bookiconlight} alt="bookicon" />
                </div>
                <h2 className="text-[16px] font-semibold">Account Details</h2>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Funding Type</span>
                <span className="text-[10px] font-medium px-1 bg-gradient-to-r from-cyan-400 to-yellow-300 text-black">
                  Two Phase
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Trading Platform</span>
                <span className="text-black dark:text-white font-medium">MetaTrader4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Account Size</span>
                <span className="text-black dark:text-white font-medium">${dashboardData.highestBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Start trade period</span>
                <span className="text-black dark:text-white font-medium">{dashboardData.tradingStartBrokerTime?.split(" ")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">End trade period</span>
                <span className="text-black dark:text-white font-medium">{new Date().toISOString()?.split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row  mt-[20px] gap-4">
          <div className="text-black dark:text-white p-3 w-full shadow-lg border border-cyan-500 h-fit sm:h-[348px] !w-[100%] !sm:w-[69%]" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            <h2 className="text-[18px] font-medium flex items-center mb-2 gap-1">
              <img src={tickicon} alt="tick icon" /> Trading Objectives
            </h2>
            {objectives?.map((obj, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex gap-2 items-start">
                  <div className="w-[170px]">
                    <div className="text-base font-medium">{obj.label}</div>
                    <div className="flex items-center text-sm bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389] dark:from-[rgba(125,222,233,0.2)] dark:via-[rgba(187,224,165,0.2)] dark:to-[rgba(228,227,137,0.2)] text-black px-2 py-1 text-[11px] w-fit mt-2 text-black dark:text-white">
                      <span className="mr-1"><img src={themeAtomValue == 'dark' ? timeicon : timeiconblack} alt='time icon' /></span> {obj.time}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="text-base text-black dark:text-white font-medium">{obj.valueLeft}</div>
                      <p className="text-base font-medium">{obj.percentage}%</p>
                    </div>
                    <div className="w-full h-[5px] rounded-full bg-zinc-700 mt-2 mb-2 relative overflow-hidden">
                      <div
                        className="h-[5px] rounded-full"
                        style={{
                          width: `${obj.percentage}%`,
                          backgroundImage:
                            "linear-gradient(to right, #00FFFF, #D4FC79, #FEDA75)"
                        }}
                      />
                    </div>
                    <div className="space-y-1 text-sm text-zinc-400">
                      {obj.details.map((detail, i) => (
                        <p key={i} className="text-[16px]">
                          {detail.label}:{" "}
                          <span className="text-black dark:text-white font-medium">{detail.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 w-[40px] mt-1">
                    <img src={tickcircleicon} alt="tick circle" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-black dark:text-white shadow-lg w-full max-w-md p-3 !w-[100%] !sm:w-[35%] border border-cyan-500" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            <h2 className="text-xl font-semibold pb-2 mb-4 flex gap-2">
              <img src={themeAtomValue == 'dark' ? analysisicon : analysisiconlight} alt="analysis icon" /> Account Analysis
            </h2>
            <div className="space-y-3">
              {accountAnalytics?.map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b border-gray-500 pb-1 last:border-b-0 pb-2"
                >
                  <span className="text-gray-400 ml-1 w-[55%]">{stat.label}</span>
                  <span className={`${stat.color || "text-black dark:text-white"} w-[45%]`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-[20px]">
          <div className="text-black dark:text-white p-3 border border-cyan-900 w-[100%] sm:w-[60%]" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <img src={themeAtomValue == 'dark' ? equityicon : equityiconlight} alt="equity icon" /> Equity Statistics
              </h2>
              <div className="flex space-x-2 bg-[#2a2a2a] p-1 rounded-sm">
                {tabsforbar?.map((tab) => (
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
            </div>

            {/* Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equityStats}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="date"
                    stroke="#aaa"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#aaa"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#333", opacity: 0.1 }} />
                  <Bar
                    dataKey="value"
                    radius={[2, 2, 0, 0]}
                    fill="#999"
                    shape={(props: any) => {
                      const { x, y, width, height, payload } = props;
                      const barFill = payload.highlight
                        ? "url(#highlightGradient)"
                        : "#999";
                      return <rect x={x} y={y} width={width} height={height} fill={barFill} />;
                    }}
                  />
                  <defs>
                    <linearGradient id="highlightGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#E6FF00" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-black dark:text-white p-3 shadow-xl w-[100%] sm:w-[40%] border border-cyan-900" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-medium flex items-center gap-2">
                <img src={themeAtomValue == 'dark' ? summaryicon : summaryiconlight} alt="summary icon" />
                Daily Summary
              </h2>
              <span className="text-gray-400 text-[14px]">Weekly Summary</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-600 to-yellow-500 text-black dark:text-white text-left">
                    <th className="px-4 py-2 font-medium text-[12px]">Date</th>
                    <th className="px-4 py-2 font-medium text-[12px]">Trades</th>
                    <th className="px-4 py-2 font-medium text-[12px]">Lots</th>
                    <th className="px-4 py-2 font-medium text-[12px]">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {dailySummary?.map((row: any, i: any) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-800 transition"
                      style={{
                        border: i % 2 !== 0 ? "1px solid #506640" : undefined,
                        background: i % 2 !== 0 && themeAtomValue == 'dark' ? "#2c2c2c" : undefined
                      }}
                    >
                      <td className="px-4 py-3 text-[12px]">{row.date}</td>
                      <td className="px-4 py-3 text-[12px]">{row.trades}</td>
                      <td className="px-4 py-3 text-[12px]">{row.lots}</td>
                      <td className="px-4 py-3 text-[12px]">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-[20px] p-4 text-black dark:text-white border border-cyan-900" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
          <div className="flex justify-between items-center mb-4 pb-2">
            <div className="flex gap-2">
              <img src={themeAtomValue == 'dark' ? billicon : billiconlight} alt="bill icon" />
              <h2 className="text-lg font-medium">Recent Trades</h2>
            </div>
            <a href="#" className="text-base font-medium text-gray-400 hover:underline">
              View all
            </a>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gradient-to-r from-cyan-600 to-yellow-500 text-black dark:text-white text-[14px]text-gray-300 uppercase bg-gradient-to-r from-emerald-800 to-green-700">
                <tr>
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Lots</th>
                  <th className="px-4 py-2">Open Price</th>
                  <th className="px-4 py-2">Close Price</th>
                  <th className="px-4 py-2">Open Time</th>
                  <th className="px-4 py-2">Close Time</th>
                  <th className="px-4 py-2">Profit</th>
                  <th className="px-4 py-2">Dynamic</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades?.map((trade: any, idx: any) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-800 transition"
                    style={{
                      border: idx % 2 !== 0 ? "1px solid #506640" : undefined,
                      background: idx % 2 !== 0 && themeAtomValue == 'dark' ? "#2c2c2c" : undefined
                    }}
                  >
                    <td className="px-4 py-2">{trade.symbol}</td>
                    <td className="px-4 py-2">{trade.type}</td>
                    <td className="px-4 py-2">{trade.lots}</td>
                    <td className="px-4 py-2">{trade.openPrice}</td>
                    <td className="px-4 py-2">{trade.closePrice}</td>
                    <td className="px-4 py-2">{trade.openTime}</td>
                    <td className="px-4 py-2">{trade.closeTime}</td>
                    <td className="px-4 py-2">{trade.profit}</td>
                    <td className="px-4 py-2">
                      {trade.dynamic === "up" ? (
                        <ArrowUpRight className="text-green-400 w-4 h-4 inline" />
                      ) : (
                        <ArrowDownRight className="text-red-500 w-4 h-4 inline" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
    </div>
  );
}