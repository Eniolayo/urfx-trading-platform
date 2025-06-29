import { useState, useEffect, useMemo } from "react";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { ChartProps } from "../admin/AdminDashboard";
import { convertDataStructure } from "@/utils/format";
import { useTranslation } from "react-i18next";

export default function PerformanceChart({
  chartData,
}: {
  chartData: ChartProps | undefined;
}) {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState("1D");
  const [data, setData] = useState<{ timeStamp: string; value: number }[]>([
    {
      timeStamp: "",
      value: 0,
    },
  ]);

  const charts = useMemo(() => {
    if (chartData) {
      return convertDataStructure(chartData);
    }
    return null;
  }, [chartData]);

  useEffect(() => {
    if (timeframe && charts) {
      switch (timeframe) {
        case "1D":
          setData(charts.groupedByDay);
          break;
        case "1M":
          setData(charts.groupedByMonth);
          break;
        case "1Y":
          setData(charts.groupedByYear);
          break;
      }
    }
  }, [timeframe, charts]);

  // Chart dimensions
  const width = 800;
  const height = 300;
  const padding = 40;

  const newXScale =
    (width - padding * 2) / (data.length <= 1 ? 2 : data.length - 1);
  const newYMin = data.length <= 1 ? 0 : Math.min(...data.map((d) => d.value));
  const newYMax = Math.max(...data.map((d) => d.value));
  const newYScale = (height - padding * 2) / (newYMax - newYMin);

  // Generate SVG path
  const newPathD = data
    .map((point, i) => {
      const x = padding + i * newXScale;
      const y = !Number.isNaN(
        height - padding - (point.value - newYMin) * newYScale
      )
        ? height - padding - (point.value - newYMin) * newYScale
        : 0;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Generate area fill path
  const newAreaD = `${newPathD} L ${padding + (data.length - 1) * newXScale} ${
    height - padding
  } L ${padding} ${height - padding} Z`;

  const newProfitChange =
    data.length > 1
      ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100
      : 100;

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="glass-panel h-full rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">
            {t("Trade Sales Overview")}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            {newProfitChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span
              className={
                newProfitChange >= 0 ? "text-emerald-400" : "text-red-400"
              }
            >
              {newProfitChange >= 0 ? "+" : ""}
              {newProfitChange.toFixed(2)}%
            </span>
            <span className="text-gray-400">vs {t("last period")}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            {["1D", "1M", "1Y"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  timeframe === period
                    ? "bg-accent text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[300px] mb-8">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding + (i * (height - padding * 2)) / 5;
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#2A2A2E"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-xs fill-gray-400"
                >
                  {formatCurrency(newYMax - (i * (newYMax - newYMin)) / 5)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={newAreaD} fill="url(#areaGradient)" className="opacity-20" />

          {/* Line */}
          <path
            d={newPathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="drop-shadow-[0_0_4px_rgba(0,122,255,0.5)]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.map((point, i) => {
            const x =
              data.length <= 1 ? padding + newXScale : padding + i * newXScale;
            const y = height - padding - (point.value - newYMin) * newYScale;
            return (
              <g key={i}>
                .
                <circle
                  cx={x}
                  cy={!Number.isNaN(y) ? y : 0}
                  r="4"
                  className="fill-accent"
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {point.timeStamp}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
