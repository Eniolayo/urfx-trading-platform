import { useEffect, useRef, useState } from "react";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import headerBgDark from "/src/assets/AboutUs/about-us-header-bg-dark.webp";
import headerBgLight from "/src/assets/AboutUs/about-us-header-bg-light.webp";
import { useAtom, useAtomValue } from "jotai";
import {
  featureSectionAtom,
  isAuthenticatedAtom,
  themeAtom,
} from "@/store/atoms";
import missionImageDark from "/src/assets/AboutUs/mission-image-dark.webp";
import missionImageLight from "/src/assets/AboutUs/mission-image-light.webp";
import payoutImageDark from "/src/assets/AboutUs/payout-image-dark.webp";
import payoutImageLight from "/src/assets/AboutUs/payout-image-light.webp";
import conditionImageDark from "/src/assets/AboutUs/condition-image-dark.webp";
import conditionImageLight from "/src/assets/AboutUs/condition-image-light.webp";
import platformImageDark from "/src/assets/AboutUs/platform-image-dark.webp";
import platformImageLight from "/src/assets/AboutUs/platform-image-light.webp";
import riskmanaIcon from "/src/assets/AboutUs/risk-mana-icon.svg";
import headphoneIcon from "/src/assets/AboutUs/head-icon.svg";
import ruleIcon from "/src/assets/AboutUs/rule-icon.svg";
import communityIcon from "/src/assets/AboutUs/community-icon.svg";
import promiseBglight from "/src/assets/AboutUs/promise-section-background-light.webp";
import profitChartImage from "/src/assets/AboutUs/profit-chart-image.webp";
import checkIconDark from "/src/assets/AboutUs/check-icon-dark.svg";
import checkIconLight from "/src/assets/AboutUs/check-icon-light.svg";
import { scrollToFeatureSectionFunction } from "@/utils/scrollToFeatureSectionFunction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GeneralButton from "../landing/GeneralButton";
// import FAQ from "./FAQ";
import FaqSection from "../landing/FaqSection";
// import ThemeToggleButton from "../themeToggle/ThemeToggleButton";

export default function AboutUs() {
  const navigate = useNavigate();
  const metaAccounts = useSelector(
    (state: { metaAccount: { accounts: any } }) => state.metaAccount.accounts
  );
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [featureSectionRef] = useAtom(featureSectionAtom);
  const { t } = useTranslation();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // const aboutUsSectionComponent = document.getElementById("aboutUsSection");
    // if (aboutUsSectionComponent) {
    //   aboutUsSectionComponent.scrollIntoView({ behavior: "smooth" });
    // }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const [headerBg, setHeaderBg] = useState<string>();
  const themeAtomValue = useAtomValue(themeAtom);
  const [missionImage, setMissionImage] = useState<string>();
  const [payoutImage, setPayoutImage] = useState<string>();
  const [conditionImage, setConditionImage] = useState<string>();
  const [platformImage, setPlatformImage] = useState<string>();
  const [checkIcon, setCheckIcon] = useState<string>();
  useEffect(() => {
    setHeaderBg(themeAtomValue === "dark" ? headerBgDark : headerBgLight);
    setMissionImage(
      themeAtomValue === "dark" ? missionImageDark : missionImageLight
    );
    setPayoutImage(
      themeAtomValue === "dark" ? payoutImageDark : payoutImageLight
    );
    setConditionImage(
      themeAtomValue === "dark" ? conditionImageDark : conditionImageLight
    );
    setPlatformImage(
      themeAtomValue === "dark" ? platformImageDark : platformImageLight
    );
    setCheckIcon(themeAtomValue === "dark" ? checkIconDark : checkIconLight);
  }, [themeAtomValue]);

  return (
    <div
      className="relative h-full w-full dark:bg-black dark:text-white bg-white text-black"
      id="aboutUsSection"
    >
      {/* Header Section */}
      <div className="relative w-full h-[669px]">
        <img
          src={headerBg}
          alt="HeaderBackground"
          className="w-full h-full bg-cover"
        />
        <div className="absolute flex justify-center items-center w-full h-full inset-0">
          <div className="relative flex w-full h-[60%] flex-col items-center ">
            <span className="text-[48px] font-bold top-[100px]">
              {t("About Us")}
            </span>
            <span className="w-[60%] text-center">
              {t(
                "Choose from flexible plans designed for traders at every level."
              )}{" "}
              <br />{" "}
              {t(
                "Transparent pricing with no hidden fees—start trading with confidence today."
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex w-full h-auto justify-center p-12 pt-20 space-x-3">
        <div className="w-[35%] flex flex-col space-y-1">
          <span className="font-bold text-[48px]">{t("Our Mission")}</span>
          <span className="text-[18px] dark:text-[#838383] text-[#7A7A7A]">
            {t(
              "At URFX, we are dedicated to revolutionizing the trading experience by providing innovative, secure, and user-centric solutions. Our mission is to empower traders of all levels by offering cutting-edge tools, comprehensive education, and unparalleled support. We strive to create a transparent and efficient trading environment that fosters growth, learning, and success. Through continuous innovation and a commitment to excellence, we aim to be the trusted partner for traders worldwide, helping them navigate the complexities of the financial markets with confidence and ease."
            )}
          </span>
        </div>

        <div className="w-fit">
          <img src={missionImage} alt="MissionImage" className="w-fit" />
        </div>
      </div>

      {/* Reliable Prop Firm Section  */}
      <div className="flex flex-col items-center justify-center w-full text-center my-10">
        <span className="text-[48px] font-bold leading-[1] mb-3">
          {t("Trade with the Most")} <br /> {t("Reliable Prop Firm")}
        </span>
        <span className="dark:text-[#FFFFFF] opacity-50 text-[#7A7A7A]">
          {t("Reliable and swift, our service ensures precision and")} <br />{" "}
          {t("stability, building trust with every interaction.")}
        </span>
      </div>

      {/* image Section */}
      <div className="flex justify-center w-full space-x-3">
        <div className="relative w-[397px] h-[392px]">
          <img src={payoutImage} alt="PayoutImage" className="w-full h-full" />
          <div className="absolute flex flex-col items-start justify-end inset-0 p-5">
            <p className="font-bold text-[24px]">
              {t("Guaranteed")} <br /> {t("Payouts")}
            </p>
            <span>
              {t(
                "Receive your payment within 24 hours, or we’ll add an extra $1,000 to your earnings!"
              )}
            </span>
          </div>
        </div>

        <div className=" relative w-[397px] h-[392px]">
          <img
            src={conditionImage}
            alt="ConditionImage"
            className="w-full h-full"
          />
          <div className="absolute flex flex-col items-start justify-end inset-0 p-5">
            <p className="font-bold text-[24px]">
              {t("Best Trading")} <br /> {t("Conditions")}
            </p>
            <span>
              {t(
                "Transforming trading journeys globally through industry-leading resources."
              )}
            </span>
          </div>
        </div>

        <div className="relative w-[397px] h-[392px]">
          <img
            src={platformImage}
            alt="PlatformImage"
            className="w-full h-full"
          />
          <div className="absolute flex flex-col items-start justify-end inset-0 p-5">
            <p className="font-bold text-[24px]">
              {t("Best Trading")} <br /> {t("Platforms")}
            </p>
            <span>
              {t(
                "Our MQ licenses and tech boost experience, security, and efficiency."
              )}
            </span>
          </div>
        </div>
      </div>

      {/* What Makes Us different Section */}
      <div className="flex flex-col items-center justify-center w-full text-center my-10">
        <span className="text-[48px] font-bold leading-[1] mb-3">
          {t("What Makes Us Different?")}
        </span>
        <span className="dark:text-[#FFFFFF] dark:opacity-50 text-dark">
          {t(
            "We offer a user-friendly platform with advanced tools, real-time data, and robust security,"
          )}{" "}
          <br />{" "}
          {t(
            "empowering traders at all levels to navigate the markets confidently."
          )}
        </span>
      </div>

      <div className="w-full h-auto grid grid-cols-2 grid-rows-2 gap-3 p-24 px-40">
        <div className="flex flex-col justify-evenly p-7   h-[318px] bg-gradient-to-r from-[#D2E9DC] via-[#DAECD8] to-[#E8ECDB] dark:bg-gradient-to-r dark:from-[#1C1D15] dark:via-[#1E2116] dark:to-[#232F1C] border border-[#C3BE25]">
          <img
            src={riskmanaIcon}
            alt="RiskManagementIcon"
            className="w-[50px] h-[50px]"
          />
          <p className="font-bold text-[28px]">
            {t("Tech-Driven Risk Management")}
          </p>
          <span className="text-[20px]">
            {t(
              "Risk Management: We use proprietary systems to monitor and support funded traders — optimizing risk, tracking performance, and helping you scale faster."
            )}
          </span>
        </div>

        <div className="flex flex-col justify-evenly p-7  h-[318px] bg-gradient-to-r from-[#D2E9DC] via-[#DAECD8] to-[#E8ECDB] dark:bg-gradient-to-r dark:from-[#212D1B] dark:via-[#19211C] dark:to-[#232F1C] border border-[#C3BE25]">
          <img
            src={headphoneIcon}
            alt="HeadPhoneIcon"
            className="w-[50px] h-[50px]"
          />
          <p className="font-bold text-[28px]">{t("Real Support")}</p>
          <span className="text-[20px]">
            {t(
              "Real Fast: Live chat, Telegram, Discord — our team is always around when you need us. No generic replies. No ticket black holes."
            )}
          </span>
        </div>

        <div className="flex flex-col justify-evenly p-7  h-[318px] bg-gradient-to-r from-[#D2E9DC] via-[#DAECD8] to-[#E8ECDB] dark:bg-gradient-to-r dark:from-[#212D1B] dark:via-[#19211C] dark:to-[#232F1C]  border border-[#C3BE25]">
          <img src={ruleIcon} alt="RuleIcon" className="w-[50px] h-[50px]" />
          <p className="font-bold text-[28px]">
            {t("Fair & Transparent Rules")}
          </p>
          <span className="text-[20px]">
            {t(
              "We built our model to support traders, not trap them. Our challenges are designed to be achievable, with real profit potential and growth opportunities."
            )}
          </span>
        </div>

        <div className="flex flex-col justify-evenly p-7  h-[318px] bg-gradient-to-r from-[#D2E9DC] via-[#DAECD8] to-[#E8ECDB] dark:bg-gradient-to-r dark:from-[#212D1B] dark:via-[#19211C] dark:to-[#232F1C]  border border-[#C3BE25]">
          <img
            src={communityIcon}
            alt="RuleIcon"
            className="w-[50px] h-[50px]"
          />
          <p className="font-bold text-[28px]">
            {t("Community of Elite Traders")}
          </p>
          <span className="text-[20px]">
            {t(
              "Join hundreds of traders leveling up together through live events, Discord sessions, exclusive coaching drops, real-time market analysis, trade alerts, strategy workshops, and more."
            )}
          </span>
        </div>
      </div>

      {/* Promist Section */}
      <div className="relative w-full h-[610px] overflow-hidden">
        <img
          src={promiseBglight}
          alt="PromistBackgroundImage"
          className="w-full h-[630px] dark:opacity-30"
        />

        <div className="absolute inset-0 flex">
          <div className="w-1/2 flex items-center justify-center p-10">
            <div className="flex flex-col w-fit h-fit space-y-5">
              <p className="font-bold text-[48px]">
                {t("Our Promise to")} <br /> {t("Every Trader")}
              </p>
              <div className="flex">
                <img src={checkIcon} alt="CheckIcon" />
                {t("Real-Time Performance Tracking")}
              </div>
              <div className="flex">
                <img src={checkIcon} alt="CheckIcon" />
                {t("No hidden rules")}
              </div>
              <div className="flex">
                <img src={checkIcon} alt="CheckIcon" />
                {t("No delays on payouts")}
              </div>
              <div className="flex">
                <img src={checkIcon} alt="CheckIcon" />
                {t("No BS—just real support")}
              </div>
              <div className="w-full flex justify-center mt-10">
                <div
                  onClick={() =>
                    scrollToFeatureSectionFunction(
                      metaAccounts,
                      isAuthenticated,
                      navigate,
                      featureSectionRef
                    )
                  }
                  className="w-fit cursor-pointer"
                >
                  <GeneralButton inputText="Start Challenge" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-1/2">
            <img
              src={profitChartImage}
              alt="ProfitChartImage"
              className="w-[490px] h-[510px]"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection/>
      
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
