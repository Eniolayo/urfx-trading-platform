import { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import "../../style/StyleLeaderborad.css";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { navbarHeightAtom } from "@/store/atoms";

interface Trader {
  rank: number;
  name: string;
  accountSize: string;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  monthlyReturn: number;
  status: "increasing" | "decreasing";
  badge: "elite" | "advanced" | "regular" | null;
}

function Leaderboard() {
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<keyof Trader>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tradersPerPage = 10;

  const traders: Trader[] = [
    {
      rank: 1,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 2,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 3,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 4,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 5,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 6,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 7,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 8,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 9,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 10,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 11,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 12,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 13,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 14,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 15,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 16,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 17,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 18,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 19,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 20,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 21,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 22,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 23,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 24,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 25,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 26,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 27,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 28,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 29,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 30,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 31,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 32,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 33,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 34,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 35,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 36,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 37,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 38,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 39,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 40,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 41,
      name: "Alex Thompson",
      accountSize: "$250,000",
      winRate: 68.5,
      profitFactor: 2.8,
      totalTrades: 425,
      monthlyReturn: 15.2,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 42,
      name: "Sarah Chen",
      accountSize: "$150,000",
      winRate: 65.2,
      profitFactor: 2.5,
      totalTrades: 312,
      monthlyReturn: 12.8,
      status: "increasing",
      badge: "elite",
    },
    {
      rank: 43,
      name: "Michael Rodriguez",
      accountSize: "$100,000",
      winRate: 62.1,
      profitFactor: 2.3,
      totalTrades: 289,
      monthlyReturn: 11.5,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 44,
      name: "Emma Wilson",
      accountSize: "$100,000",
      winRate: 59.8,
      profitFactor: 2.1,
      totalTrades: 256,
      monthlyReturn: 9.7,
      status: "increasing",
      badge: "advanced",
    },
    {
      rank: 45,
      name: "David Kim",
      accountSize: "$75,000",
      winRate: 58.4,
      profitFactor: 2.0,
      totalTrades: 198,
      monthlyReturn: 8.9,
      status: "decreasing",
      badge: "advanced",
    },
    {
      rank: 46,
      name: "Lisa Anderson",
      accountSize: "$50,000",
      winRate: 56.2,
      profitFactor: 1.9,
      totalTrades: 167,
      monthlyReturn: 7.8,
      status: "increasing",
      badge: "regular",
    },
    {
      rank: 47,
      name: "James Parker",
      accountSize: "$50,000",
      winRate: 54.8,
      profitFactor: 1.8,
      totalTrades: 145,
      monthlyReturn: 6.9,
      status: "decreasing",
      badge: "regular",
    },
    {
      rank: 48,
      name: "Nina Patel",
      accountSize: "$25,000",
      winRate: 53.5,
      profitFactor: 1.7,
      totalTrades: 134,
      monthlyReturn: 6.2,
      status: "increasing",
      badge: "regular",
    },
  ];

  const handleSort = (field: keyof Trader) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(traders.length / tradersPerPage);

  const paginatedTraders = [...traders]
    .filter((trader) =>
      trader.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    })
    .slice((currentPage - 1) * tradersPerPage, currentPage * tradersPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getBadgeColor = (badge: Trader["badge"]) => {
    switch (badge) {
      case "elite":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "advanced":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "regular":
        return "bg-gradient-to-r from-green-400 to-green-600";
      default:
        return "";
    }
  };

  const [navbarHeight] = useAtom(navbarHeightAtom);

  return (
    <div style = {{height: `calc(100vh - ${navbarHeight}px - 3px)`}} className="relative mx-auto pt-7 p-6 w-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-2 animate-gradient-text-leaderboard">
          {t("Top Traders Leaderboard")}
        </h1>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-2 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search traders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 transition-colors duration-200 backdrop-blur-xl w-64"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-colors duration-200 backdrop-blur-xl">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white/5 backdrop-blur-xl flex-1 overflow-auto rounded-3xl border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center space-x-2">
                  <span>Rank</span>
                  {sortField === "rank" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  <span>Trader</span>
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("accountSize")}
              >
                <div className="flex items-center space-x-2">
                  <span>Account Size</span>
                  {sortField === "accountSize" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("winRate")}
              >
                <div className="flex items-center space-x-2">
                  <span>Win Rate</span>
                  {sortField === "winRate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("profitFactor")}
              >
                <div className="flex items-center space-x-2">
                  <span>Profit Factor</span>
                  {sortField === "profitFactor" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("totalTrades")}
              >
                <div className="flex items-center space-x-2">
                  <span>Total Trades</span>
                  {sortField === "totalTrades" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleSort("monthlyReturn")}
              >
                <div className="flex items-center space-x-2">
                  <span>Monthly Return</span>
                  {sortField === "monthlyReturn" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTraders.map((trader) => (
              <tr
                key={trader.rank}
                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-2xl bg-clip-text  bg-gradient-to-r">
                      {trader.rank}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {trader.name.charAt(0)}
                        </span>
                      </div>
                      {trader.badge && (
                        <div
                          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getBadgeColor(
                            trader.badge
                          )} border-2 border-[#0A0F1C]`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{trader.name}</div>
                      <div className="text-sm text-gray-400">
                        {trader.badge &&
                          trader.badge.charAt(0).toUpperCase() +
                            trader.badge.slice(1)}{" "}
                        Trader
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{trader.accountSize}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{trader.winRate}%</span>
                    {trader.status === "increasing" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{trader.profitFactor}</td>
                <td className="px-6 py-4 font-medium">{trader.totalTrades}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="font-medium">{trader.monthlyReturn}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-xl ${
            currentPage === 1
              ? "bg-gray-500/50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors duration-200`}
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl ${
            currentPage === totalPages
              ? "bg-gray-500/50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
