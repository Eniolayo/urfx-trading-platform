import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/store/atoms";
import cupIco from "/src/assets/TradingTechSection/cup-ico.svg";
import journalIco from "/src/assets/TradingTechSection/trade-journal-ico.svg";
import phoneCheckIco from "/src/assets/TradingTechSection/phone-check-ico.svg";
import analysisIco from "/src/assets/TradingTechSection/analysis-ico.svg";
import metricsIco from "/src/assets/TradingTechSection/metrics-ico.svg";
import leaderboardIco from "/src/assets/TradingTechSection/leaderbord-ico.svg";
import tradingTechSectionBgDarkImageURL from "/src/assets/TradingTechSection/trading-dashboard-bg-dark.png";
import tradingTechSectionBgLightImageURL from "/src/assets/TradingTechSection/trading-dashboard-bg-light.png";
import laptop from "/src/assets/TradingTechSection/laptopdesktop.webp";
import laptopmobile from "/src/assets/TradingTechSection/laptopmobile.png";
import GeneralButtonWithCss from "./GeneralButtonWithCss";

export default function DashboardAdSection() {
  const { t } = useTranslation();

  const cardData = [
    {
      icon: cupIco,
      content: t("Comprehensive Trade Journal"),
      alt: t("Comprehensive Trade Journal"),
    },
    {
      icon: journalIco,
      content: t("Regular Trading Journals"),
      alt: t("Regular Trading Journals"),
    },
    {
      icon: phoneCheckIco,
      content: t("Exclusive Trader Discounts"),
      alt: t("Exclusive Trader Discounts"),
    },
    {
      icon: metricsIco,
      content: t("Advanced Account Metrics"),
      alt: t("Advanced Account Metrics"),
    },
    {
      icon: analysisIco,
      content: t("Challenge Account Analysis"),
      alt: t("Challenge Account Analysis"),
    },
    {
      icon: leaderboardIco,
      content: t("Top Performers Leaderboard"),
      alt: t("Top Performers Leaderboard"),
    },
  ];

  const [tradingTechSectionBgImage, setTradingTechSectionBgImage] =
    useState<string>();
    console.log(tradingTechSectionBgImage);
  const themeAtomValue = useAtomValue(themeAtom);
  useEffect(() => {
    setTradingTechSectionBgImage(
      themeAtomValue === "dark"
        ? tradingTechSectionBgDarkImageURL
        : tradingTechSectionBgLightImageURL
    );
  }, [themeAtomValue]);

  return (
    <div className="relative h-full w-full mb-20  dark:bg-black bg-white dark:text-white text-black ">
      <div className="absolute right-0 h-[560px] w-2/3 bg-gradient-to-r from-[#2AB5C9] via-[#72C430] to-[#C3BE25] blur-[300px] opacity-20">
      </div>
      <div className="relative px-auto mx-5 h-auto ">
        {/* Main Heading */}
        <div className="flex flex-col justify-center mx-auto h-auto py-20 ">
          <div
            className="flex w-full justify-center animate-fade-in-up sm:gap-20 max-md:flex-col relative h-auto "
            style={{ animationDelay: "200ms" }}
            id="laptopAnimationDiv"
          >
            <div className="text-center w-full max-lg:mx-auto z-10 flex justify-center flex-col items-center 2k:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-[48px] 2k:text-[80px] font-bold mb-2 tracking-tight leading-tight 2k:tracking-wide 2k:leading-none">
                {t("Revolutionary Trading Dashboard")}
              </h1>
              <p className="text-darkContent text-lg  2k:text-[30px] w-1/2 text-center 2k:leading-[45px]">
                {t(
                  "Unleash your trading potential with our state-of-the-art dashboard, featuring advanced analytics that provide unparalleled insights into your performance."
                )}
              </p>
            </div>
          </div>

          <div className="relative w-full h-full flex justify-center items-center mt-12">
            <div className="relative w-[84%]">
              <div className="relative w-full h-[700px] sm:h-[553px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A7C957] to-[#1982C4] z-0" />
                {themeAtomValue=='dark' && <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent z-10" />}
              </div>

              <img src={laptop} alt="laptop" className="hidden sm:block absolute left-[-75px] top-0 h-full z-10" />
              <img src={laptopmobile} alt="laptop" className="bloack sm:hidden absolute top-0 z-10" />

              {/* flow section    */}
              <div className="absolute flex items-center h-[60%] top-[40%] sm:top-[0%] sm:ml-[35px] justify-end px-[11%] inset-0 w-full sm:h-full py-5 z-10">
                <div className="w-fit dark:text-white text-black h-full overflow-hidden [mask-image:_linear-gradient(to_top,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
                  <div
                    className="flex flex-col animate-infinite-scroll-tradingtech space-y-4"
                    style={{
                      animationDuration: `${cardData.length * 2}s`, // Adjust duration dynamically
                    }}
                  >
                    {cardData.map((card, index) => (
                      <div
                        key={index}
                        className="w-[200px] sm:w-[250px] md:w-[320px] xl:w-[410px] 2xl:w-[490px] 3xl:w-[542px] 2k:min-w-[720px] dark:bg-white/5 bg-white/40 p-3 sm:p-6 2k:p-10 
                        backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={card.icon}
                            alt={card.alt}
                            className="size-[30px] sm:size-[35px] md:size-[38px] xl:size-[42px] 2xl:size-[57px] 3xl:size-[62px] 2k:size-[100px] object-cover"
                          />
                        </div>
                        <p className="font-medium mt-4 text-[12px] sm:text-[15px] md:text-[20px] xl:text-[27px] 2xl:text-[29px] 3xl:text-[36px] 2k:text-[47px]">
                          {card.content}
                        </p>
                      </div>
                    ))}
                    {/* Duplicate content for seamless scrolling */}
                    {cardData.map((card, index) => (
                      <div
                        key={index}
                        className="w-[200px] sm:w-[250px] md:w-[320px] xl:w-[410px] 2xl:w-[490px] 3xl:w-[542px] 2k:min-w-[720px] dark:bg-white/5 bg-white/40 p-3 sm:p-6 2k:p-10 
                        backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={card.icon}
                            alt={card.alt}
                            className="size-[30px] sm:size-[35px] md:size-[38px] xl:size-[42px] 2xl:size-[57px] 3xl:size-[62px] 2k:size-[100px] object-cover"
                          />
                        </div>
                        <p className="font-medium mt-4 text-[12px] sm:text-[15px] md:text-[20px] xl:text-[27px] 2xl:text-[29px] 3xl:text-[36px] 2k:text-[47px]">
                          {card.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
      </div>

      <div className="w-full flex justify-center h-auto">
        <GeneralButtonWithCss
          blur={true}
          className="text-[14px] sm:text-[15px] md:text-[18px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[162px] md:h-[42px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
          bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
        >
          {t("Start Challenge")}
        </GeneralButtonWithCss>
      </div>

    </div>
  );
}
