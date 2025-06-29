import LivePerformanceChart from "../charts/LivePerformanceChart";
import { useTranslation } from "react-i18next";
import GeneralButtonWithCss from "./GeneralButtonWithCss";
import vectora from "/src/assets/vectoraa.png"
import vectorb from "/src/assets/vectorbb.png"
// import realTimePerformanceChartSectionBg from "/src/assets/RealTimePerformanceChartSection/real-time-performance-chart-section-chart.webp";

export default function PerformanceChart() {
  const { t } = useTranslation();

  return (
    <div
      className="flex h-auto bg-gradient-to-r from-[#1CCCE5] via-[#99D375] to-[#DAD633] justify-center font-creato py-14 w-full relative overflow-hidden border-y border-dark-300/30"
    >
      <img src={vectora} className="absolute left-[0] bottom-[100px]" alt="vectora" />
      <img src={vectorb} className="absolute right-[0] bottom-[100px]" alt="vectorb" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[48px] 2k:text-[80px] font-bold text-black mb-4">
            {t("Real-Time Performance Tracking")}
          </h2>
          <p className="text-[14px] md:text-[18px] 2k:text-[30px] text-[#417C62] max-w-3xl mx-auto">
            {t("Monitor your trading performance")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 space-x-0">
          <div className="w-full h-fit object-cover">
            <LivePerformanceChart />
          </div>
        </div>
        <div className="w-full flex justify-center mt-12 h-auto">
          <GeneralButtonWithCss
            blur={true}
            className="text-[14px] sm:text-[15px] md:text-[18px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[162px] md:h-[42px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
            bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
          >
            {t("Start Challenge")}
          </GeneralButtonWithCss>
        </div>
      </div>
    </div>
  );
}
