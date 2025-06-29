import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { applyOpacityToFractionPart, formatNumberToK } from "@/utils/format";
import successIcon from "/src/assets/RealTimePerformanceChartSection/success.svg";
import averageProfitIcon from "/src/assets/RealTimePerformanceChartSection/average.svg";
import executionRateIcon from "/src/assets/RealTimePerformanceChartSection/execution.svg";
import riskManagementIcon from "/src/assets/RealTimePerformanceChartSection/risk.svg";

interface DataPoint {
  timestamp: number;
  profit: number;
}

type RangeType = "1w" | "1m" | "6m" | "1y" | "all";

export default function LivePerformanceChart() {
  const { t } = useTranslation();
  const [data, setData] = useState<DataPoint[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [range, setRange] = useState<RangeType>("1m");

  // Balances state
  const [balances, setBalances] = useState({
    USD: 5000,
    JPY: 3000,
    EUR: 2000,
    GBP: 1000,
    INR: 1500,
  });
  const totalBalance = Object.values(balances).reduce((a, b) => a + b, 0);

  // Update balances every 4 seconds with mock data
  useEffect(() => {
    const updateBalances = () => {
      // Generate random proportions
      const raw = [
        Math.random() + 0.5,
        Math.random() + 0.5,
        Math.random() + 0.5,
        Math.random() + 0.5,
        Math.random() + 0.5,
      ];
      const sum = raw.reduce((a, b) => a + b, 0);
      const total = 12500;
      // Calculate new balances so their sum is total
      const newBalances = {
        USD: Math.round((raw[0] / sum) * total),
        JPY: Math.round((raw[1] / sum) * total),
        EUR: Math.round((raw[2] / sum) * total),
        GBP: Math.round((raw[3] / sum) * total),
        INR: 0, // will set below to ensure sum is exactly total
      };
      // Set INR as the remainder to ensure sum is exactly total
      newBalances.INR =
        total -
        (newBalances.USD + newBalances.JPY + newBalances.EUR + newBalances.GBP);
      setBalances(newBalances);
    };
    updateBalances();
    const interval = setInterval(updateBalances, 4000);
    return () => clearInterval(interval);
  }, []);

  // Stats
  const stats = [
    {
      title: t("Success Rate"),
      value: "92.3%",
      change: "+5.2%",
      description: t("of trades hit profit"),
      icon: successIcon,
    },
    {
      title: t("Average Profit"),
      value: "$185.50",
      change: "+12.5%",
      description: t("per winning trade"),
      icon: averageProfitIcon,
    },
    {
      title: t("Execution Rate"),
      value: "0.04s",
      change: "99.9%",
      description: t("average execution time"),
      icon: executionRateIcon,
    },
    {
      title: t("Risk Management"),
      value: t("Active"),
      change: "99.9%",
      description: t("Advanced protection enabled"),
      icon: riskManagementIcon,
    },
  ];

  // Range options for the UI
  const rangeOptions: { label: string; value: RangeType }[] = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "1m" },
    { label: "6M", value: "6m" },
    { label: "1Y", value: "1y" },
    { label: "All Time", value: "all" },
  ];

  // Range config: number of points and interval in ms
  const getRangeConfig = (range: RangeType) => {
    switch (range) {
      case "1w":
        return { points: 30, interval: 6 * 3600000 }; // 7 days, 4-5 points/day
      case "1m":
        return { points: 30, interval: 24 * 3600000 }; // 30 days, 1/day
      case "6m":
        return { points: 30, interval: 6 * 24 * 3600000 }; // 6 months, 1/6 days
      case "1y":
        return { points: 30, interval: 12 * 24 * 3600000 }; // 1 year, 1/12 days
      case "all":
        return { points: 30, interval: 2 * 30 * 24 * 3600000 }; // 5 years, 1/2 months
      default:
        return { points: 30, interval: 24 * 3600000 };
    }
  };

  // Generate historical data for the selected range
  const generateHistoricalData = (
    points: number,
    interval: number
  ): DataPoint[] => {
    const arr: DataPoint[] = [];
    const now = Date.now();
    let profit = 1500;
    for (let i = 0; i < points; i++) {
      arr.push({
        timestamp: now - (points - i) * interval,
        profit,
      });
      profit += Math.random() * 700 - 200;
    }
    return arr;
  };

  // Generate new data point for real-time update
  const generateNewDataPoint = (
    prevData: DataPoint[],
    interval: number
  ): DataPoint => {
    const lastProfit = prevData[prevData.length - 1]?.profit ?? 1500;
    const lastTimestamp =
      prevData[prevData.length - 1]?.timestamp ?? Date.now();
    const profitChange = Math.random() * 700 - 200;
    return {
      timestamp: lastTimestamp + interval,
      profit: lastProfit + profitChange,
    };
  };

  // Update data when range changes
  useEffect(() => {
    const { points, interval } = getRangeConfig(range);
    const initialData = generateHistoricalData(points, interval);
    setData(initialData);
    setTotalProfit(initialData[initialData.length - 1].profit);
  }, [range]);

  // Real-time update for current range
  useEffect(() => {
    const { points, interval } = getRangeConfig(range);
    const timer = setInterval(() => {
      setData((prevData) => {
        const newPoint = generateNewDataPoint(prevData, interval);
        const newData = [...prevData, newPoint].slice(-points);
        setTotalProfit(newPoint.profit);
        setLastUpdate(new Date());
        return newData;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [range]);

  // Calculate chart dimensions
  const width = 750;
  // Responsive height: 400 for < md, 550 for >= md
  const [height, setHeight] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768 ? 550 : 400
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth >= 768 ? 550 : 400);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const padding = 0;

  // Calculate scales
  const { points } = getRangeConfig(range);
  const xScale = (width - padding * 2) / (points - 1 || 1);
  const yMin = Math.min(...data.map((d) => d.profit));
  const yMax = Math.max(...data.map((d) => d.profit));
  const yScale = (height - padding * 2) / (yMax - yMin || 1);
  const balanceData = [
    { key: "USD", color: "#9E5AD3" },
    { key: "JPY", color: "#D24950" },
    { key: "EUR", color: "#528DDD" },
    { key: "GBP", color: "#E8B44E" },
    { key: "INR", color: "#39F697" },
  ];
  return (
    <div className="w-full flex justify-center  min-h-[948px] md:min-h-min">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row space-x-0 lg:space-x-4 dark:text-white">
      {/* Chart */}
      <div className="bg-[#111111]  p-5 2k:p-9 min-w-[353px] min-h-[340px] md:min-w-[506px] md:min-h-[510px] 2k:min-w-[750px] 2k:min-h-[722px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="">
            <h2 className="text-[19px] 2k:text-[35px] opacity-50">{t("Profit")}</h2>
            <div className="text-[30px] 2k:text-[45px] font-bold tracking-[-0.033em]">
              ${applyOpacityToFractionPart(totalProfit, 0.5)}
            </div>
          </div>

          <div className="">
            <p className="text-[14px] 2k:text-[24px] opacity-50">
              {t("Last Updated")}: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="relative h-fit bottom-0">
          {/* Insight Button */}
          <div className="w-full h-auto flex gap-2 text-[12px] md:text-[16px] 2k:text-[29px]">
            {rangeOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-3xl border-[2px]  ${
                  range === opt.value
                    ? "bg-white text-dark border-white"
                    : "bg-[#282828] text-white border-[#505050]"
                }`}
                onClick={() => setRange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-full aspect-[750/400]  overflow-visible">
            {" "}
            {/* Responsive container */}
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              className="h-auto w-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: "visible" }}
            >
              {/* Gradients */}
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#D6D743" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient
                  id="verticalLineGradient"
                  x1="0"
                  y1={padding}
                  x2="0"
                  y2={height - padding}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#DAD533" /> {/* light yellow */}
                  <stop offset="100%" stopColor="#ffffff" /> {/* white */}
                </linearGradient>
              </defs>

              {/* Data points */}
              {data.map((point, i) => {
                const x = padding + i * xScale;
                const y = height - padding - (point.profit - yMin) * yScale;
                const isHovered = hoveredIndex === i;

                // Tooltip dimensions
                const tooltipWidth = 297;
                const tooltipHeight = 60;
                const tooltipOffsetY = 85;

                // Clamp tooltip x so it stays inside SVG
                let tooltipX = x - 150;
                if (tooltipX < padding) tooltipX = padding;
                if (tooltipX + tooltipWidth > width - padding)
                  tooltipX = width - padding - tooltipWidth;

                // Clamp tooltip y so it stays inside SVG vertically
                let tooltipY = y - tooltipOffsetY;
                if (tooltipY < padding) tooltipY = padding;
                if (tooltipY + tooltipHeight > height - padding)
                  tooltipY = height - padding - tooltipHeight;

                // Center text within tooltip
                const textX = tooltipX + tooltipWidth / 2;
                const textY = tooltipY + tooltipHeight / 2 + 8; // 8 for visual centering

                return (
                  <g key={i}>
                    {/* Vertical line from data point to x-axis */}
                    <line
                      x1={x}
                      y1={Math.min(y, height - padding - 10)} // Ensure line is at least 10px tall
                      x2={x}
                      y2={height - padding}
                      stroke={isHovered ? "url(#verticalLineGradient)" : "#888"}
                      strokeWidth="12"
                      opacity={isHovered ? 1 : 0.5}
                      style={{ transition: "stroke 0.2s, opacity 0.2s" }}
                      strokeLinecap="round"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="19"
                      className={`fill-white opacity-0 hover:opacity-100 ${
                        isHovered ? "opacity-100" : ""
                      }`}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ cursor: "pointer" }}
                    />
                    {/* Label for hovered point */}
                    <g
                      style={{
                        pointerEvents: "none",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateY(0px) scale(1)"
                          : "translateY(10px) scale(0.98)",
                        transition:
                          "opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)",
                      }}
                    >
                      {isHovered && (
                        <>
                          <rect
                            x={tooltipX}
                            y={tooltipY}
                            width={tooltipWidth}
                            height={tooltipHeight}
                            rx="8"
                            fill="#282828"
                            opacity="1"
                            stroke="#505050"
                            strokeWidth="2"
                          />
                          <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            className="fill-white text-[30px]"
                          >
                            <tspan fill="#fff" opacity="0.5" className="">
                              {new Date(point.timestamp).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                            </tspan>
                            |{" "}
                            <tspan className="font-bold ">
                              ${" "}
                              {point.profit.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </tspan>
                          </text>
                        </>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="h-full flex flex-col w-full max-w-[313px] 2k:w-[750px] md:max-w-none space-y-4">
        {/* Balance Cart */}
        <div className="flex h-full flex-col justify-around bg-[#111111] p-8 min-w-[353px]">
          <div className="w-full h-auto text-white text-start text-[14px] 2k:text-[35px] mb-1 md:text-[18.95px] opacity-50">
            Balance
          </div>
          <div className="w-full mb-2 text-start text-[20px]  md:text-[30px] 2k:text-[45px] md:font-bold">
            ${applyOpacityToFractionPart(totalBalance, 0.5)}
          </div>
          <div className="flex w-full h-auto  space-x-1">
            {balanceData.map(({ key, color }) => (
              <div
                key={key}
                className="flex flex-col"
                style={{
                  width: `${
                    (balances[key as keyof typeof balances] * 100) /
                    totalBalance
                  }%`,
                }}
              >
                <div
                  className="w-full h-[6px] md:h-[8px] 2k:h-[12px] border rounded-2xl"
                  style={{ backgroundColor: color, borderColor: color }}
                ></div>
                <div
                  className="font-bold text-[12px] md:text-[16.04px] 2k:text-[28px] mt-4"
                  style={{ color }}
                >
                  {key}
                </div>
                <div className="text-white text-[12px] md:text-[16.04px] 2k:text-[28px]">
                  {formatNumberToK(balances[key as keyof typeof balances])}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 min-w-[353px]"> 
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-row md:flex-col bg-[#111111] p-4 max-h-[126px] min-w-[245px] 2k:min-h-[200px] 2k:min-w-[300px]"
            >
              <div className="flex w-1/2 h-full md:h-1/2 md:w-full items-center space-x-6 2k:space-x-9 md:space-x-3 mb-2 ">
                {/* icon */}
                <div className="">
                  <img src={stat.icon} alt="Icon" className="size-[34px] 2k:size-[52px]" />
                </div>

                <div className="2k:tracking-wider 2k:leading-[45px]">
                  <div className="text-[12px] md:text-[16px] 2k:text-[25px] text-white opacity-50">
                    {stat.title}
                  </div>
                  <div className="text-xl text-[16px] md:text-[22px] 2k:text-[29px] font-bold text-white">
                    {stat.value}
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-full md:h-1/2 md:w-full flex justify-center items-center md:items-center md:justify-center ">
                <div className="w-full flex flex-row md:flex-col">
                  {stat.change && (
                    <div className="text-[14px] md:text-[16px] 2k:text-[25px] text-[#17A568] w-auto md:w-full ">
                      {stat.change}
                    </div>
                  )}
                  <div className="text-[14px] md:text-[16px] 2k:text-[23px] text-white w-auto md:w-full font-normal">
                    {" "}
                    &nbsp;{stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
   
  );
}
