import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { formatCurrency } from "@/utils/format";
import { useTranslation } from "react-i18next";
import {
  balanceAtom,
  challengeAtom,
  featureSectionAtom,
  feeAtom,
  platformAtom,
  userAtom,
} from "@/store/atoms";
import StartTradingButton from "../model/StartTradingButton";
import RadioButton from "../model/RadioButton";
import MT4Image from "/src/assets/mt4.webp";
import MT5Imaage from "/src/assets/mt5.webp";
import { X } from "lucide-react";
import PhaseButton from "../../components/landing/PhaseNumberButton";
import InstantAndTwoPhasButton from "../../components/landing/InstantAndTwoPhaseButton";




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

interface ChallengeAccountSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeAccountSelectionModal({
  isOpen,
  onClose,
}: ChallengeAccountSelectionModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [radio, setRadio] = useState<number>(0);
  const [phase, setPhase] = useState<number>(1);
  const [platformType, setPlatformType] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [subPhase, setSubPhase] = useState<string>("phase1");
  const [user] = useAtom(userAtom);
  const setFeatureSectionRef = useSetAtom(featureSectionAtom);
  const setBalance = useSetAtom(balanceAtom);
  const setFee = useSetAtom(feeAtom);
  const setPlatform = useSetAtom(platformAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const featureSectionRef = useRef<HTMLDivElement | null>(null);

  const platformTypeData = [
    { text: t("Choose MT4"), value: 1, state: "mt4", img: MT4Image },
    { text: t("Choose MT5"), value: 2, state: "mt5", img: MT5Imaage },
  ];

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
  };

  const handlePlatformType = (value: number) => {
    setPlatformType(value);
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

  const handleStartTrade = async () => {
    if (loading) return;
    setLoading(true);
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

    setLoading(false);
    if (user?.email) {
      navigate("/get-funded");
    } else {
      toast.warn("Please login first to start trade.");
      navigate("/login");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="flex fixed z-50 justify-center h-full items-start sm:items-center inset-0 overflow-auto w-full">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        id="createanaccountmodal"
        className="p-[30px] pt-[30px] relative rounded-xl  h-[90%] overflow-auto bg-dark-100/60 border-y border-dark-300/30 w-[90%] xl:w-[80%] 2xl:w-[70%]"
      >
        <div className="absolute flex top-7 right-7">
          <button onClick={onClose} className="">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="mb-1">
          <PhaseButton content={1} />
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2  leading-[32px] gap-10 mb-4">
          {phaseData?.map((ph) => (
            <div
              key={ph.value}
              className={`transition-all h-[72px] hover:scale-105 w-auto cursor-pointer rounded-xl p-1 flex justify-center items-center ${
                phase === ph.value
                  ? "text-white shadow-active scale-105"
                  : "text-white/20"
              }`}
              onClick={() => handlePhase(ph.value)}
            >
              <div
                className="w-full h-full flex justify-center items-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <InstantAndTwoPhasButton input={ph.text} />
              </div>
            </div>
          ))}
        </div>

        <div
          className="h-[2px] w-full"
          style={{ background: "rgba(194, 208, 228, 0.15)" }}
        />

        <div className="mb-1 mt-4">
          <PhaseButton content={2} />
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 text-[18px] font-[600] leading-[32px] gap-10 mb-3">
          {platformTypeData?.map((ph) => (
            <div
              key={ph.value}
              className={`glass-panel border-[.5px] transition-all h-[72px] hover:scale-105 w-auto cursor-pointer rounded-xl p-2 flex justify-center items-center ${
                platformType === ph.value
                  ? "text-white shadow-active scale-105"
                  : "text-white/50"
              }`}
              onClick={() => handlePlatformType(ph.value)}
            >
              <div>
                <img src={ph.img}></img>
              </div>
            </div>
          ))}
        </div>

        <RadioButton value={radio} onChange={setRadio} />
        <div className="mt-4 flex w-full flex-wrap gap-y-4">
          <div className="w-full lg:w-2/3 lg:pr-4">
            <div className="relative w-full flex flex-wrap items-stretch overflow-hidden rounded-[20px] glass-panel transition-all duration-300 ease-in-out lg:min-h-0 p-[20px]">
              <div className="w-full flex flex-col gap-y-10 lg:w-2/5 lg:pr-4 border-white/30 border-2 rounded-xl p-5">
                <div className="flex items-center text-2xl">{t("Deposit")}</div>
                <div
                  className="flex items-center gap-3 py-2 px-3 text-sm border-white/30 border-2 rounded-md"
                  style={{ width: "fit-content" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkle"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  </svg>
                  <span>{t("Recommended")}</span>
                </div>
                <div className="flex w-full border-2 border-b-white/30 opacity-30" />
                <div className="flex items-center justify-between gap-x-3 mt-6">
                  <p className="text-3xl font-[600]">{calcPrice()}</p>
                  <p className="text-end text-[#FFFFFF80]">
                    {t("For")} {radio === 6 ? `1M` : `${balanceData[radio][0]}K`}{" "}
                    {t("account")}
                  </p>
                </div>
                <div className="relative mt-10">
                  <StartTradingButton
                    buttonContent= {t("START")}
                    onClick={handleStartTrade}
                    loading={loading}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-6 lg:w-3/5 p-5">
                <p className="text-2xl text-nowrap">
                  ${radio === 6 ? `1M` : `${balanceData[radio][0]}K`} {t("account")}
                  {t("includes:")}
                </p>
                <div className="flex-wrap sm:flex gap-2 space-y-3 sm:space-y-0 border-2 pb-4 border-b-white/30 border-transparent">
                  {phase === 1 && (
                    <div
                      className={`${
                        subPhase === "phase1"
                          ? "text-white border-white/30 scale-105"
                          : "text-white/50"
                      } glass-panel bg-[#FFFFFF1A]  text-nowrap border-[1px] rounded-full cursor-pointer px-5 py-1 transition-all`}
                      onClick={() => handleSubPhase("phase1")}
                    >
                      {t("Phase1")}
                    </div>
                  )}

                  {phase === 1 && (
                    <div
                      className={`${
                        subPhase === "phase2"
                          ? "text-white border-white/30 scale-105"
                          : "text-white/50"
                      }  glass-panel bg-[#FFFFFF1A]  text-nowrap border-[1px] rounded-full cursor-pointer px-5 py-1 transition-all`}
                      onClick={() => handleSubPhase("phase2")}
                    >
                      {t("Phase2")}
                    </div>
                  )}

                  <div
                    className={`${
                      subPhase === "funded"
                        ? "text-white border-white/30 scale-105"
                        : "text-white/50"
                    }  glass-panel bg-[#FFFFFF1A]  text-nowrap border-[1px] rounded-full cursor-pointer px-5 py-1 transition-all`}
                    onClick={() => handleSubPhase("funded")}
                  >
                   {t("Funded")}
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg
                    className="row-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00FFCC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span className="text-xl">{t("Profit Target")}</span>
                  <span className="ml-auto">
                    {phase === 1 && ["phase1", "phase2"].includes(subPhase) ? (
                      <>
                        {formatCurrency(
                          balanceData[radio][0] *
                            (subPhase === "phase1" ? 100 : 50)
                        )}
                        <span className="ml-2 border-2 border-white/30 rounded-xl px-1">
                          {profitTargetContent}%
                        </span>
                      </>
                    ) : (
                      "-"
                    )}
                  </span>
                </div>
                <div className="flex w-full border-2 border-b-white/30 opacity-30" />
                <div className="flex items-center gap-x-3">
                  <svg
                    className="row-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00FFCC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span className="text-xl">{t("Daily Loss Limit")}</span>
                  <span className="ml-auto">
                    {phaseStateDetail?.dailyLossLimit ? (
                      <>{phaseStateDetail.dailyLossLimit}%</>
                    ) : (
                      "-"
                    )}
                  </span>
                </div>
                <div className="flex w-full border-2 border-b-white/30 opacity-30" />
                <div className="flex items-center gap-x-3">
                  <svg
                    className="row-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00FFCC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span className="text-xl">{t("Max drawdown")}</span>
                  <span className="ml-auto">
                    {phaseStateDetail?.maxTrailingDrawDown ? (
                      <>{phaseStateDetail.maxTrailingDrawDown}%</>
                    ) : (
                      "-"
                    )}
                  </span>
                </div>

                <div className="flex w-full border-2 border-b-white/30 opacity-30" />
                <div className="flex items-center gap-x-3">
                  {phase === 1 && (
                    <>
                      <svg
                        className="row-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-xl">{t("Refundable Fee")}</span>
                      <span className="ml-auto">
                        {subPhase === "phase1" ? (
                          <>{refundableFeeContent}%</>
                        ) : (
                          "-"
                        )}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 lg:w-1/3 w-full">
            <div className="  flex items-center justify-between rounded-[20px] p-[20px] transition-all duration-300 ease-in-out hover:scale-[102%]">
              <div className="">
                <h3 className="text-[24px] mb-10 font-[600] leading-[32px] text-white">
                  {t("All plans include")}:
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Minimum Trading Days")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.minimumTradingDays}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Maximum Trading Days")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.maximumTradingDays}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Performance Split")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.performanceSplit}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Leverage")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.leverage}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Drawdown Type")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.drawDownType}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("EAs Allowed")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.eaAllowed}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Refund")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.refund}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Hold Over Weekend")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.holdOverWeekend}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Trade Through News")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{planContent.tradeTroughNews}</span>
                    </div>
                  </div>
                  <div className="lg:w-[180px] sm:w-1/3 w-full">
                    <p className="text-[#FFFFFF4D]">{t("Platform")}</p>
                    <div className="flex items-center gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FFCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-badge-check"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
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
