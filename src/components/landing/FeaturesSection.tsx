import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { formatCurrency } from "@/utils/format";
import { useTranslation } from "react-i18next";
import {
  balanceAtom,
  challengeAtom,
  featureSectionAtom,
  feeAtom,
  platformAtom,
  themeAtom,
  userAtom,
} from "@/store/atoms";
import RadioButton from "../model/RadioButton";
import mt4LogoDarkURL from "/src/assets/FeatureSection/MT4Logo-dark.webp";
import mt4LogoLightURL from "/src/assets/FeatureSection/MT4Logo-light.svg";
import mt5LogoDarkURL from "/src/assets/FeatureSection/MT5Logo-dark.webp";
import mt5LogoLightURL from "/src/assets/FeatureSection/MT5Logo-light.svg";
import matchTraderDarkURL from "/src/assets/FeatureSection/MatchTraderLogo-dark.webp";
import matchTraderLightURL from "/src/assets/FeatureSection/MatchTraderLogo-light.svg";
import tradeLockerDarkURL from "/src/assets/FeatureSection/TradeLockerLogo-dark.webp";
import tradeLockerLightURL from "/src/assets/FeatureSection/TradeLockerLogo-light.svg";
// import featureSecBgGradientPoint from "/src/assets/FeatureSection/featuresecBgGradientPoint.svg";
import GeneralButtonWithCss from "./GeneralButtonWithCss";
import FundingTypeButton from "../featureSection/FundingTypeButton";

const phaseStateDetailInitialValueOfTwoPhase = {
  state: 1,
  profitTarget: [[500, 10], [250, 5], []],
  dailyLossLimit: 6,
  maxTrailingDrawDown: 12,
  refundableFee: 100,
};

const phaseStateDetailInitialValueOfInstantFunding = {
  state: 1,
  profitTarget: [],
  dailyLossLimit: 6,
  maxTrailingDrawDown: 12,
  refundableFee: 100,
};

export const balanceDataOfTwoPhase = [
  [5, 59],
  [10, 89],
  [25, 199],
  [50, 379],
  [100, 599],
  [500, 1999],
  [1000, 4999],
];

export const balanceDataOfInstantFunding = [
  [5, 109],
  [10, 279],
  [25, 379],
  [50, 599],
  [100, 1999],
  [500, 4999],
  [1000, 9999],
];

export default function FeaturesSection() {
  // for development
  // useScrollRestoration();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [radio, setRadio] = useState<number>(0);
  const [phase, setPhase] = useState<number>(1);
  const [platformType, setPlatformType] = useState<number>(1);
  const [subPhase, setSubPhase] = useState<string>("phase1");
  const [user] = useAtom(userAtom);
  const setFeatureSectionRef = useSetAtom(featureSectionAtom);
  const setBalance = useSetAtom(balanceAtom);
  const setFee = useSetAtom(feeAtom);
  const setPlatform = useSetAtom(platformAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const featureSectionRef = useRef<HTMLDivElement | null>(null);

  const phaseData = [
    { text: t("Two Phase"), value: 1, state: "twoPhase" },
    { text: t("Instant Funding"), value: 2, state: "instantFund" },
  ];

  const [phaseStateDetail, setPhaseStateDetail] = useState<{
    state: number;
    profitTarget: number[][] | null;
    dailyLossLimit: number;
    maxTrailingDrawDown: number;
    refundableFee: number | null;
  }>(
    phase === 1
      ? phaseStateDetailInitialValueOfTwoPhase
      : phaseStateDetailInitialValueOfInstantFunding
  );

  const TwoPhasePlanContent = {
    minimumTradingDays: t("5 Days"),
    performanceSplit: t("Up to 90%"),
    drawDownType: t("Trailing"),
    refund: "100%",
    tradeTroughNews: t("Yes"),
    maximumTradingDays: t("Unlimited"),
    leverage: t("Up to 50:1"),
    eaAllowed: t("Yes"),
    holdOverWeekend: t("Yes"),
    platform: "MT4,MT5",
  };

  const InstantFunndedPlanContent = {
    minimumTradingDays: t("3 Days"),
    performanceSplit: t("Up to 90%"),
    drawDownType: t("Trailing"),
    refund: t("NoReject"),
    tradeTroughNews: t("NoReject"),
    maximumTradingDays: "N/A",
    leverage: t("Up to 50:1"),
    eaAllowed: t("Yes"),
    holdOverWeekend: t("NoReject"),
    platform: "MT4,MT5",
  };

  const planContent =
    phase === 1 ? TwoPhasePlanContent : InstantFunndedPlanContent;

  const balanceData: number[][] =
    phase === 1 ? balanceDataOfTwoPhase : balanceDataOfInstantFunding;

  useEffect(() => {
    if (featureSectionRef) {
      setFeatureSectionRef(featureSectionRef);
    }
  }, [featureSectionRef]);

  const handlePhase = (value: number) => {
    setPhase(Number(value));
    value === 1
      ? setPhaseStateDetail(phaseStateDetailInitialValueOfTwoPhase)
      : setPhaseStateDetail(phaseStateDetailInitialValueOfInstantFunding);
  };

  const handleSubPhase = (value: string) => {
    setSubPhase(String(value));
    console.log("subPhase=======>", value);
  };

  const handlePlatformType = (value: number) => {
    value < 3 && setPlatformType(value);
  };

  const calcPrice = () => {
    return formatCurrency(balanceData[radio][1]);
  };

  const profitTargetContent: number = (() => {
    if (phase === 1 && subPhase === "phase1") {
      return phaseStateDetail?.profitTarget
        ? phaseStateDetail.profitTarget[0][1]
        : 0;
    }
    if (phase === 1 && subPhase === "phase2") {
      return phaseStateDetail?.profitTarget
        ? phaseStateDetail.profitTarget[1][1]
        : 0;
    }
    if (phase === 1 && subPhase === "funded") {
      return 0;
    }
    return 0;
  })();

  const refundableFeeContent: number = (() => {
    if (phase === 1 && subPhase === "phase1") {
      return phaseStateDetail?.refundableFee
        ? phaseStateDetail.refundableFee
        : 0;
    } else return 0;
  })();

  const [mt4Logo, setMT4Logo] = useState<string>();
  const [mt5Logo, setMT5Logo] = useState<string>();
  const [matchTraderLogo, setMatchTraderLogo] = useState<string>();
  const [tradeLockerLogo, setTradeLockerLogo] = useState<string>();
  const themeAtomValue = useAtomValue(themeAtom);
  const platformTypeData = [
    { text: t("Choose MT4"), value: 1, state: "mt4", img: mt4Logo },
    { text: t("Choose MT5"), value: 2, state: "mt5", img: mt5Logo },
    {
      text: t("Coming soon"),
      value: 3,
      state: "matchTrader",
      img: matchTraderLogo,
    },
    {
      text: t("Coming soon"),
      value: 4,
      state: "tradeLocker",
      img: tradeLockerLogo,
    },
  ];

  useEffect(() => {
    setMT4Logo(themeAtomValue === "dark" ? mt4LogoDarkURL : mt4LogoLightURL);

    setMT5Logo(themeAtomValue === "dark" ? mt5LogoDarkURL : mt5LogoLightURL);
    setMatchTraderLogo(
      themeAtomValue === "dark" ? matchTraderDarkURL : matchTraderLightURL
    );
    setTradeLockerLogo(
      themeAtomValue === "dark" ? tradeLockerDarkURL : tradeLockerLightURL
    );
  }, [themeAtomValue]);

  const handleStartTrade = async () => {
    setBalance(balanceData[radio][0] * 1000);
    setFee(balanceData[radio][1]);
    const platformData = platformTypeData.find(
      (ph) => ph.value === platformType
    );
    const challengeType = phaseData.find((ph) => ph.value === phase);
    setPlatform(platformData?.state || "");
    setChallenge(challengeType?.state || "");
    localStorage.setItem("platform", platformData?.state || "");
    localStorage.setItem("challenge", challengeType?.state || "");
    localStorage.setItem("balance", `${balanceData[radio][0] * 1000}`);
    localStorage.setItem("fee", `${balanceData[radio][1]}`);

    if (user?.email) {
      navigate("/get-funded");
    } else {
      toast.warn("Please login first to start trade.");
      navigate("/login");
    }
  };

  return (
    <div
      id="featureSection"
      ref={featureSectionRef}
      className="relative dark:bg-black bg-white dark:text-white text-black flex justify-center pt-[60px] sm:pt-[120px] sm:pb-[65px] w-full font-creato border-dark-300/30"
    >
      <div className="w-full h-full">
        <div className="px-[20px] sm:px-4 w-full flex flex-col items-center justify-center 2k:mb-28">
          <h3 className="text-[32px] sm:text-[48px] 2k:text-[80px] font-creato text-center font-bold mb-[12px] tracking-[-0.03em]">
            {t("Choose Your Account")}
          </h3>

          <p className="text-[14px] sm:text-[18px] 2k:text-[30px] tracking-normal text-center font-creato opacity-50 mb-[30px] sm:mb-[50px]">
            {t(
              "Trade the way you want , how you want , for as long as you want..."
            )}
          </p>

          <div className="flex flex-col w-full items-center lg:flex-row lg:px-[70px] xl:px-[220px] 3xl:px-[350px] 2k:px-[350px] lg:space-x-[34px] max-lg:space-y-[30px]">
            {/* Left side    */}
            <div className="w-full px-[20px] sm:px-0 space-y-5 sm:w-[497px] lg:w-1/2 flex flex-col lg:mx-0 lg:justify-between gap-y-[30px] font-bold ">
              <div className="max-sm:w-full">
                <div className="text-[18px] sm:text-[24px] 2k:text-[45px] mb-[6px] font-bold">
                  Funding Type:
                </div>
                <div className="flex space-y-3 sm:space-y-0 sm:flex-row flex-col lg:space-x-5 2k:space-x-12 gap-y-[10px] sm:gap-y-2 w-full justify-between leading-[32px]">
                  {phaseData?.map((ph) => (
                    <FundingTypeButton
                      className="w-full h-[53px] sm:w-1/2 sm:h-[71px] 2k:h-[128px] text-[18px] sm:text-[20px] xl:text-[24px] 2k:text-[40px] text-center cursor-pointer font-bold"
                      onClick={() => handlePhase(ph.value)}
                      key={ph.value}
                      isSelected={phase === ph.value}
                    >
                      {ph.text}
                    </FundingTypeButton>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[18px] sm:text-[24px] 2k:text-[45px] mb-[6px] font-bold">
                  Trading Platform:
                </div>
                <div className="grid grid-cols-1 space-y-3 sm:space-y-0 sm:grid-cols-2 2k:gap-x-12 2k:gap-y-9 w-full gap-x-4 gap-y-[10px] leading-[32px]">
                  {platformTypeData?.map((ph) => (
                    <FundingTypeButton
                      className="w-full h-[53px] sm:h-[71px]  2k:h-[128px] text-[18px] sm:text-[24px] text-center cursor-pointer"
                      onClick={() => handlePlatformType(ph.value)}
                      key={ph.value}
                      isSelected={platformType === ph.value}
                    >
                      <img src={ph.img} alt="Tradingplatform Logo" className="max-sm:w-[120px] scale-75 2k:scale-[0.9]" />
                      {ph.value > 2 && (
                        <GeneralButtonWithCss
                          className="absolute h-[16px] sm:h-[24px] 2k:h-[40px] w-[87px] sm:w-[109px] 2k:w-[190px] bg-[#00000033] dark:bg-gradient-to-r dark:from-[#ffffff1a] dark:to-[#ffffff0d] left-1/2 -translate-x-1/2 -bottom-2 translate-y-1/2 text-[10px] sm:text-[12px] 2k:text-[20px] font-[400] tracking-[0.01em] text-white"
                          enableHoverEffect={false}
                        >
                          {t("Coming Soon")}
                        </GeneralButtonWithCss>
                      )}
                    </FundingTypeButton>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[18px] sm:text-[24px] 2k:text-[45px] mb-[6px]">Account Size</div>
                <div className="w-full ">
                  <RadioButton value={radio} onChange={setRadio} />
                </div>
              </div>

              <div className="mt-auto ">
                <div className="text-[18px] sm:text-[24px] 2k:text-[45px] font-bold max-sm:text-center 2k:mt-7">Fee</div>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-x-3 mt-2">
                  <p className="text-[28px] lg:text-[35px] xl:text-[38px] 2xl:text-[42px] 2k:text-[60px] font-[600]">{calcPrice()}</p>
                  <div
                    onClick={handleStartTrade}
                    className="flex items-end justify-center w-auto cursor-pointer h-full"
                  >
                      


                  <GeneralButtonWithCss
                   
                    blur={true}
                    className="text-[14px] sm:text-[15px] md:text-[20px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[284px] md:h-[56px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
                    bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
                  >
                    {t("Start Challenge")}
                  </GeneralButtonWithCss>




                  </div>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="flex w-full justify-center sm:h-[683px] 2k:h-[1066px] sm:w-[497px] sm:mx-auto lg:w-1/2 lg:mx-0 flex-wrap flex-col gap-y-4 bg-gradient-to-r from-[#D9D534] via-[#A3D46E] to-[#23CDDF] p-7 text-[#111]">
              <p className="text-[18px] sm:text-[24px] 2k:text-[45px] text-nowrap font-bold">
                {(radio
                  ? balanceDataOfTwoPhase[radio][0] * 1000
                  : 5000
                ).toLocaleString()}{" "}
                {t("Account")}
              </p>

              {/* phase button */}
              <div className="flex w-full justify-center items-center text-[16px] sm:text-[20px] 2k:text-[42px] font-bold text-center">
                {phase === 1 && (
                  <div
                    className={`${
                      subPhase === "phase1"
                        ? "border-black bg-white"
                        : "bg-[#BDE19A] border-transparent"
                    } text-nowrap w-1/3 h-[48px] sm:h-[51px] 2k:h-[85px] border-[1px] cursor-pointer transition-all flex items-center justify-center`}
                    onClick={() => handleSubPhase("phase1")}
                  >
                    <span>{t("Phase1")}</span>
                  </div>
                )}

                {phase === 1 && (
                  <div
                    className={`${
                      subPhase === "phase2"
                        ? "border-black bg-white"
                        : " bg-[#BDE19A] border-transparent"
                    } text-nowrap w-1/3 h-[48px] sm:h-[51px] 2k:h-[85px] border-[1px] cursor-pointer transition-all flex items-center justify-center`}
                    onClick={() => handleSubPhase("phase2")}
                  >
                    {t("Phase2")}
                  </div>
                )}

                <div
                  className={`${
                    subPhase === "funded"
                      ? "border-black bg-white"
                      : " bg-[#BDE19A] border-transparent"
                  }   text-nowrap w-1/3 h-[48px] sm:h-[51px] 2k:h-[85px] border-[1px] cursor-pointer transition-all flex items-center justify-center`}
                  onClick={() => handleSubPhase("funded")}
                >
                  {t("Funded")}
                </div>
              </div>

              {/* metrics */}
              <div className="text-[14px] sm:text-[18px] 2k:text-[33px]">
                <div className="flex items-center gap-x-3 mb-1">
                  <span className="opacity-50">{t("Profit target")}</span>
                  <span className="ml-auto font-bold">
                    {phase === 1 && ["phase1", "phase2"].includes(subPhase) ? (
                      <>
                        {formatCurrency(
                          balanceData[radio][0] *
                            (subPhase === "phase1" ? 100 : 50)
                        )}
                        <span className="ml-2  border-2 border-white/30 rounded-xl px-1">
                          {profitTargetContent}%
                        </span>
                      </>
                    ) : (
                      <>
                        <span>-</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-x-3 mb-1">
                  <span className="text-[#6B722C]">
                    {t("Daily loss limit")}
                  </span>
                  <span className="ml-auto font-bold">
                    {phaseStateDetail?.dailyLossLimit ? (
                      <>{phaseStateDetail.dailyLossLimit}%</>
                    ) : (
                      "-"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-x-3 mb-1">
                  <span className="text-[#6B722C] ">{t("Max drawdown")}</span>
                  <span className="ml-auto font-bold">
                    {phaseStateDetail?.maxTrailingDrawDown ? (
                      <>{phaseStateDetail.maxTrailingDrawDown}%</>
                    ) : (
                      "-"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-x-3 mb-1">
                  {phase === 1 && (
                    <>
                      <span className="text-[#6B722C]">
                        {t("Refundable fee")}
                      </span>
                      <span className="ml-auto font-bold">
                        {subPhase === "phase1" ? (
                          <>{refundableFeeContent}%</>
                        ) : (
                          "-"
                        )}
                      </span>
                    </>
                  )}
                </div>

                <div className="w-full border-b border-b-gray-400 my-2"></div>
                {/* plan part */}
                <div className="flex flex-col w-full gap-y-[2.5px]">
                  <div className="flex w-full justify-between">
                    <p className="text-[#6B722C]">
                      {t("Minimum trading days")}
                    </p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.minimumTradingDays}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="text-[#6B722C]">
                      {t("Maximum trading days")}
                    </p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.maximumTradingDays}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="text-[#6B722C]">{t("Performance split")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.performanceSplit}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="text-[#6B722C]">{t("Leverage")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.leverage}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("Drawdown type")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.drawDownType}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("EAs allowed")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.eaAllowed}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("Refund")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.refund}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("Hold over weekend")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.holdOverWeekend}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("Trade through news")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.tradeTroughNews}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <p className="text-[#6B722C]">{t("Platform")}</p>
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{planContent.platform}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
