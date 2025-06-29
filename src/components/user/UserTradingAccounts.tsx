import { useEffect, useState } from "react";
import { dispatch, useSelector } from "@/app/store";
import { getAccounts } from "@/app/reducers/metaAccount";
import { useAtom, useAtomValue } from "jotai";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays, User } from "lucide-react";

import tickicon from "/src/assets/Dashboard/tickicon.svg";
import tickcircleicon from "/src/assets/Dashboard/tickcircleicon.svg";
import { Copy, Trash2, Lock, X, Link } from 'lucide-react';
import { themeAtom, userAtom } from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { getMetaTotalStats } from "@/app/reducers/metaTotalStats";

interface userAccountTableDataProps {
  userList: {
    userId: number;
    login: string;
    password: string;
    platform: string;
    server: string;
    accountId: string;
  }[];
}

export default function UserTradingAccounts() {
  const [user] = useAtom(userAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const [adminSummaryTable, setAdminSummaryTable] =
    useState<userAccountTableDataProps | null>(null);
  console.log(adminSummaryTable);

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<any>({});

  const [dailySummary, setdailySummary] = useState<any>([]);
  const [recentTrades, setRecentTrades] = useState<any>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true)
  console.log(dailySummary,recentTrades,showLoader);

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


  const mapAllData = () => {
    setTimeout(() => {
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

      setRecentTrades([...temprecentTrades]); // safe now

      setShowLoader(false);
    }, 1000);
  }

  const fetchData = debounce(async () => {
    if (true) {
      try {
        // Combine related API calls into a single call
        const accountId = 'd02ae8d0-2357-4dc4-bc0a-206398abe83d';
        //const email = user.email;

        await Promise.all([
          // dispatch(getMetaStats(accountId, email)),
          dispatch(getMetaTotalStats(accountId)).then((result: any) => {
            setDashboardData(result);
            mapAllData();
          }
          ),
        ]);
      } catch (error) {
        setShowLoader(false);
        console.error("Error fetching data:", error);
      } finally {
        setShowLoader(false);
      }
    }
  }, 300);

  const data = [
    { date: "28 Jun", value: 10000 },
  ];

  useEffect(() => {
    user?.email && dispatch(getAccounts(user.email));

    fetchData();
    return () => fetchData.cancel();
  }, []);

  useEffect(() => {
    if (Array.isArray(metaAccounts) && metaAccounts.length > 0) {
      const data = metaAccounts.map((acc, index) => {
        return {
          userId: index,
          login: acc.login,
          password: acc.password,
          platform: acc.platform,
          server: acc.server,
          accountId: acc.accountId,
        };
      });
      setAdminSummaryTable({ userList: data });
    }
    // setAdminSummaryTable(metaAccounts.map((acc) => {
    //   return {

    //   }
    // }))
  }, [metaAccounts]);

  const [showNewAcc, setShowNewAcc] = useState(false);
  const themeAtomValue = useAtomValue(themeAtom);

  const accounts = [
    {
      id: '903281',
      type: 'Two Phase',
      trades: 105,
      days: 22
    },
    {
      id: '903545',
      type: 'Instant Funding',
      trades: 105,
      days: 22
    }
  ];
  const labelColor = themeAtomValue === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = themeAtomValue === 'dark' ? 'border-[#1F545B]' : 'border-gray-200';
  const bgColor = themeAtomValue === 'dark' ? 'bg-[#111]' : 'bg-white';

  const credentials = {
    id: '761478',
    username: '761478',
    password: 'd211e_@139',
    server: 'URFX-DemoServer',
    platform: 'MetaTrader 5',
  };

  return (
    <>{showNewAcc && <h1>coming soon</h1>}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 px-4">
          <div className={`w-full max-w-xl rounded-md p-6 relative ${bgColor} border ${borderColor}`}>
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-gray-400" onClick={() => setShowPopup(false)}>
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Lock className={`w-6 h-6 ${themeAtomValue === 'dark' ? 'text-white' : 'text-black'}`} />
              <h2 className={`text-xl font-semibold ${themeAtomValue === 'dark' ? 'text-white' : 'text-black'}`}>Account Credentials</h2>
            </div>
            <p className={`mb-4 ${labelColor}`}>#{credentials.id}</p>
            <hr className="border-gray-600 mb-4" />

            {/* Credential Rows */}
            <div className="space-y-4">
              {[
                { label: 'Login Username', value: credentials.username, icon: <Copy className="w-4 h-4" /> },
                { label: 'Password', value: credentials.password, icon: <Copy className="w-4 h-4" /> },
                { label: 'Server', value: credentials.server, icon: <Copy className="w-4 h-4" /> },
                { label: 'Platform', value: credentials.platform, icon: <Link className="w-4 h-4" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className={labelColor}>{item.label}</div>
                  <div className={`flex items-center gap-2 ${themeAtomValue === 'dark' ? 'text-white' : 'text-black'}`}>
                    <span>{item.value}</span>
                    {item.icon}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <div>Delete Account</div>
                <div className={`flex items-center gap-2 ${themeAtomValue === 'dark' ? 'text-white' : 'text-black'}`}>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded relative"
                  >
                    <span className="absolute top-0 left-0 w-[15%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
                    <span className="absolute top-0 right-0 w-[15%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
                    <span className="absolute bottom-0 right-0 w-[15%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
                    <span className="absolute bottom-0 left-0 w-[15%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
                    Delete Account <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showNewAcc && <div className={`${themeAtomValue == 'dark' ? "bg-[#070707] text-white" : "bg-gray-100 text-black"} p-4 min-h-screen font-sans`}>
        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel */}
          <div
            className={`max-w-md w-full space-y-4 col-span-12 sm:col-span-4 p-3 border rounded-md 
    ${themeAtomValue === 'dark' ? 'bg-[#202020] border-[#1F545B] text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <h2 className="text-lg font-semibold mb-2">Account</h2>

            {accounts.map((acc, idx) => (
              <div
                key={acc.id}
                className={`p-4 rounded-md shadow flex flex-col gap-4 border 
        ${idx === 0 ? (themeAtomValue === 'dark' ? 'border-white' : 'border-black') : 'border-transparent'} 
        ${themeAtomValue === 'dark' ? 'bg-gradient-to-br from-[#1a1a1a] to-[#111]' : 'bg-gray-100'}`}
              >
                {/* Top Row */}
                <div className="flex justify-between items-center">
                  <div className={`flex items-center gap-2 ${themeAtomValue === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                    <User className="w-5 h-5" />
                    <span>{acc.id}</span>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-md 
            ${themeAtomValue === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    {acc.type}
                  </span>
                </div>

                {/* Stats Row */}
                <div
                  className={`flex justify-between items-center border-t pt-3 
          ${themeAtomValue === 'dark' ? 'border-white/10' : 'border-gray-300'}`}
                >
                  <div className="flex items-center gap-2 flex-col">
                    <div className="flex gap-2 items-center">
                      <LineChart className={`w-4 h-4 ${themeAtomValue === 'dark' ? 'text-white/70' : 'text-black/70'}`} />
                      <span className={`text-xs ${themeAtomValue === 'dark' ? 'text-white/70' : 'text-black/70'}`}>No. of trades</span>
                    </div>
                    <span className="ml-1 font-medium">{acc.trades}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-col">
                    <div className="flex gap-2 items-center">
                      <CalendarDays className={`w-4 h-4 ${themeAtomValue === 'dark' ? 'text-white/70' : 'text-black/70'}`} />
                      <span className={`text-xs ${themeAtomValue === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Days traded</span>
                    </div>
                    <span className="ml-1 font-medium">{acc.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-300 to-yellow-300 flex items-center justify-center text-black text-xs font-bold"
                      onClick={() => navigate('/user/dashboard')}>
                      📈
                    </div>
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-300 to-yellow-300 flex items-center justify-center text-black text-xs font-bold"
                      onClick={() => setShowPopup(true)}>
                      🔑
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* New Account Button */}
            <button
              onClick={() => setShowNewAcc(true)}
              className={`w-full py-3 rounded-md text-sm border 
      ${themeAtomValue === 'dark' ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border-white/10' : 'bg-gray-200 hover:bg-gray-300 text-black border-gray-300'}`}
            >
              + New Account
            </button>
          </div>


          {/* Right Panel */}
          <div className="col-span-12 sm:col-span-8 space-y-4">
            {/* Account Overview */}
            <div
              className={`p-4 border rounded-md 
    ${themeAtomValue === 'dark' ? 'bg-black text-white border-[#1F545B]' : 'bg-white text-black border-gray-200'}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Account Overview</h2>
                  <p className={themeAtomValue === 'dark' ? 'text-gray-400' : 'text-gray-500'}>#274178</p>
                </div>
                <div className={`text-sm ${themeAtomValue === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Created: Nov 18, 2023 9:30 PM
                </div>
              </div>

              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid stroke={themeAtomValue === 'dark' ? '#333' : '#eee'} strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke={themeAtomValue === 'dark' ? '#bbb' : '#333'} />
                    <YAxis
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                      stroke={themeAtomValue === 'dark' ? '#bbb' : '#333'}
                    />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                      labelClassName={themeAtomValue === 'dark' ? 'text-white' : 'text-black'}
                    />
                    <Line
                      type="linear"
                      dataKey="value"
                      stroke="#ffff33"
                      strokeWidth={2}
                      dot={{ stroke: themeAtomValue === 'dark' ? 'white' : 'black', strokeWidth: 2, fill: '#00e1ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div
                  className={`p-4 rounded 
        ${themeAtomValue === 'dark' ? 'bg-gray-900/60 text-white' : 'bg-gray-100 text-black'}`}
                >
                  <div className="text-sm">Account balance</div>
                  <div className="text-lg font-semibold">${dashboardData.balance}</div>
                </div>
                <div
                  className={`p-4 rounded 
        ${themeAtomValue === 'dark' ? 'bg-gray-900/60 text-green-400' : 'bg-green-50 text-green-600'}`}
                >
                  <div className="text-sm">Average win</div>
                  <div className="text-lg font-semibold">${dashboardData.bestTrade}</div>
                </div>
                <div
                  className={`p-4 rounded 
        ${themeAtomValue === 'dark' ? 'bg-gray-900/60 text-red-400' : 'bg-red-50 text-red-600'}`}
                >
                  <div className="text-sm">Average loss</div>
                  <div className="text-lg font-semibold">${dashboardData.worstTrade}</div>
                </div>
              </div>
            </div>

            {/* Trading Objectives */}
            <div className="text-black dark:text-white p-3 w-full shadow-lg border border-[#1F545B] h-fit sm:h-[348px] !w-[100%] !sm:w-[100%]" style={{ background: themeAtomValue == 'dark' ? '#1e1e1e' : 'transparent' }}>
              <h2 className="text-[18px] font-medium flex items-center mb-2 gap-1">
                <img src={tickicon} alt="tick icon" /> Trading Objectives
              </h2>
              {objectives.map((obj: any, idx: any) => (
                <div key={idx} className="mb-3">
                  <div className="flex gap-2 items-start">
                    <div className="w-[170px]">
                      <div className="text-base font-medium">{obj.label}</div>
                      <div className="flex items-center text-sm bg-gradient-to-r from-cyan-700 to-yellow-700 text-black dark:text-white px-2 py-1 text-[11px] w-fit mt-2">
                        <span className="mr-1">⏱</span> {obj.time}
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
                        {obj.details.map((detail: any, i: any) => (
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
          </div>
        </div>
      </div >}
    </>
  );
}
