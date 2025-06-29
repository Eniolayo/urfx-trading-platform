import { useTranslation } from "react-i18next";
import { scrollToFeatureSectionFunction } from "@/utils/scrollToFeatureSectionFunction";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { featureSectionAtom, isAuthenticatedAtom, themeAtom } from "@/store/atoms";
import { useSelector } from "react-redux";
import bitcoinImage from "/src/assets/Leaderboard/bitcoin.png";
import cashImage from "/src/assets/Leaderboard/cash.png";
import bankImage from "/src/assets/Leaderboard/bank.png";
import timelimitImage from "/src/assets/Leaderboard/timelimit.png";
import Panel from "../leaderboard/Panel";
import analyticsscreenlight from "/src/assets/Leaderboard/analyticsscreenlight.png";
import conditionImage from "/src/assets/Leaderboard/condition-dark.png";
import conditionImageLight from "/src/assets/Leaderboard/condition-light.png";
import matchtraderLogoDark from "/src/assets/Leaderboard/matchtrader-logo-dark.png";
import metatraderLogoDark from "/src/assets/Leaderboard/metatrader-logo-dark.png";
import payoutLogo from "/src/assets/Leaderboard/payout.png";
import GeneralButtonWithCss from "./GeneralButtonWithCss";
import videosec from "/src/assets/Leaderboard/videosec.png";

export default function LeaderboardSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const metaAccounts = useSelector(
    (state: { metaAccount: { accounts: any } }) => state.metaAccount.accounts
  );
  const [featureSectionRef] = useAtom(featureSectionAtom);

  const themeAtomValue = useAtomValue(themeAtom);

  // const [payoutImage, setPayoutImage] = useState<string>();
  // const [conditionImage, setConditionImage] = useState<string>();

  const tradingStats = [
    {
      value: t("Up to 95%"),
      label: t("of Profit Split"),
      link: bitcoinImage,
    },
    {
      value: t("Up to $1M"),
      label: t("Trading Accounts"),
      link: cashImage,
    },
    {
      value: t("24 Hours"),
      label: t("Guaranteed Payout"),
      link: bankImage,
    },
    {
      value: t("No time limit"),
      label: t("in Challenge Phase"),
      link: timelimitImage,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:text-white dark:bg-black text-black">
      <div className="z-0 mx-auto">
        <div
          className="relative flex justify-center items-center h-full w-full lg:p-10 lg:px-32 py-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          }}
        >
          <div
            className="relative w-full grid grid-cols-2 lg:grid-cols-4 animate-fade-in-up "
            style={{ animationDelay: "800ms" }}
          >
            {tradingStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl p-1 md:p-4 md:px-2 text-center transform hover:scale-105 transition-all duration-300 "
              >
                <div className="flex justify-center w-full">
                  <img
                    alt="Hero Feature Image"
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src={stat.link}
                    className="size-[95px] md:size-[145px] 2k:size-[225.5px]"
                  />
                </div>
                <div className="2k:leading-[55px]">
                  <div className="text-[24px] sm:text-[39px] 2k:text-[58px] font-[700] sm:font-bold mt-2 sm:mb-3 mb-0 tracking-[-0.03em]">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 sm:text-[19px] 2k:text-[28px] sm:font-medium text-[12px] tracking-[-0.03em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="!flex !justify-center hidden sm:block">
          <img src={videosec} alt="video section" />
        </div>

        <div className="w-full z-0">
          <div className="text-center mt-8 mb-0 z-0">
            <h2 className="text-[32px] md:text-[48px] 2k:text-[72px] 2k:leading-[90px] leading-9 md:leading-normal font-bold mb-4">
              {t("Trade with the Most")} <br />
              {t("Reliable Prop Firm")}
            </h2>
            <p className="text-[14px] sm:text-[18px] 2k:text-[27px] 2k:leading-[36px] tracking-[-0.0001em] text-gray-400 mx-auto">
              {t("Reliable and swift, our service ensures precision and")}{" "}
              <br />
              {t("stability, building trust with every interaction.")}
            </p>
          </div>

          <div className="flex justify-start pb-[40px] pt-[40px] px-4 md:justify-center w-full space-x-4 sm:space-x-8 2k:space-x-11  overflow-x-scroll overflow-y-hidden scrollbar-hide">
            <Panel
              className=" min-w-[298px] min-h-[279px]  md:min-w-[397px] md:min-h-[392px] md:w-[397px] md:h-[392px] 2k:w-[520px] 2k:h-[520px]
               dark:bg-[#1C1E1C] dark:bg-none"
              classNameContent="flex items-start justify-end"
            >
              <img
                src={payoutLogo}
                alt="payout"
                className="size-[250px] md:size-[300px] 2k:size-[410px] "
              />

              <div className="absolute flex flex-col items-start justify-end inset-0 p-2 sm:p-5 2k:p-8 2k:font-normal tracking-[-0.0001em]">
                <p className="font-semibold text-start text-[18px] sm:text-[24px] 2k:text-[38px] leading-5 sm:leading-7 2k:leading-[45px] mb-2">
                  {t("Guaranteed")} <br /> {t("Payouts")}
                </p>
                <span className="text-start text-[14px] sm:text-[18px]  2k:text-[22px] 2k:tracking-normal font-normal opacity-50">
                  {t(
                    "Receive your payment within 24 hours, or we’ll add an extra $1,000 to your earnings!"
                  )}
                </span>
              </div>
            </Panel>

            <Panel
              className="min-w-[298px] min-h-[279px] md:min-w-[397px] md:min-h-[392px] md:w-[397px] md:h-[392px] 2k:w-[520px] 2k:h-[520px] dark:bg-[#1C1E1C]"
              classNameContent="flex items-start justify-end"
            >
              <img
                src={themeAtomValue === "dark" ? conditionImage : conditionImageLight}
                alt="ConditionImage"
                className="size-[250px] md:size-[300px] 2k:size-[340px]"
              />

              <div className="absolute flex flex-col items-start justify-end inset-0 p-2 sm:p-5 2k:p-8 2k:font-normal tracking-[-0.0001em]">
                <p className="font-semibold text-start text-[18px] sm:text-[24px] 2k:text-[38px] leading-5 sm:leading-7 2k:leading-[45px] mb-2">
                  {t("Best Trading")} <br /> {t("Conditions")}
                </p>
                <span className="text-start text-[14px] sm:text-[18px] 2k:text-[22px] 2k:tracking-normal font-normal opacity-50 ">
                  {t(
                    "Transforming trading journeys globally through industry-leading resources."
                  )}
                </span>
              </div>
            </Panel>

            <Panel
              className="min-w-[298px] min-h-[279px] md:min-w-[397px] md:min-h-[392px] md:w-[397px] md:h-[392px] 2k:w-[520px] 2k:h-[520px] dark:bg-[#1C1E1C]"
              classNameContent="flex items-start justify-end"
            >
              <div className="flex flex-col mt-1 ml-3 sm:mt-3 sm:ml-3 items-start">
                <img
                  src={metatraderLogoDark}
                  alt="metatraderLogoDark"
                  className="w-[97px] h-[77.1px] md:w-[117px] md:h-[93px] 2k:w-[162px] 2k:h-[135px]"
                />
                <img
                  src={matchtraderLogoDark}
                  alt="matchtraderLogoDark"
                  className="size-[93px] md:size-[131px] 2k:size-[181px]"
                />
              </div>
              <img
                src={analyticsscreenlight}
                alt="analyticsscreen"
                className="sm:size-[280px] size-[200px] 2k:size-[400px]"
              />

              <div className="absolute flex flex-col items-start justify-end inset-0 p-2 sm:p-5 2k:p-8 2k:font-normal tracking-[-0.0001em]">
                <p className="font-semibold text-start text-[18px] sm:text-[24px] 2k:text-[38px] leading-5 sm:leading-7 2k:leading-[45px] mb-2">
                  {t("Best Trading")} <br /> {t("Platforms")}
                </p>
                <span className="text-start text-[14px] sm:text-[18px] 2k:text-[22px] 2k:tracking-normal font-normal opacity-50">
                  {t(
                    "Our MQ licenses and tech boost experience, security, and efficiency."
                  )}
                </span>
              </div>
            </Panel>
          </div>
        </div>

        <div className="w-full flex justify-center h-auto pb-[50px]">
          <GeneralButtonWithCss
            onClick={() =>
              scrollToFeatureSectionFunction(
                metaAccounts,
                isAuthenticated,
                navigate,
                featureSectionRef
              )
            }
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
