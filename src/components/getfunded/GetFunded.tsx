import { useEffect, useState } from "react";
import { FileText, WalletCards } from "lucide-react";
import { toast } from "react-toastify";
import {
  balanceDataOfInstantFunding,
  balanceDataOfTwoPhase,
} from "../landing/FeaturesSection";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addOnsAtom,
  balanceAtom,
  challengeAtom,
  feeAtom,
  platformAtom,
  profileAtom,
  themeAtom,
} from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/api";
import MT4Logo from "/src/assets/mt4.webp";
import MT5Logo from "/src/assets/mt5.webp";
import { useTranslation } from "react-i18next";
import Footer from "../Footer";
import GeneralButton from "../landing/GeneralButton";
import selectAccountButtonBgDarkURL from "/src/assets/FeatureSection/account-select-button-bg-dark.svg";
import selectAccountButtonBgLightURL from "/src/assets/FeatureSection/account-select-button-bg-light.svg";
import panelBgDark from "/src/assets/GetFunded/panel-bg-dark.webp";
import panelBgLight from "/src/assets/GetFunded/panel-bg-light.webp";

type ChallengeType = "twoPhase" | "instantFund";
type AccountSize = 5000 | 10000 | 25000 | 50000 | 100000 | 500000 | 1000000;

export interface AddOns {
  profitSplit100: boolean;
  fastPayout: boolean;
  both?: boolean; // Optional property for "both" add-on
}

const accountSizeValue = [5000, 10000, 25000, 50000, 100000, 500000, 1000000];

const tradingPlatformType = ["mt4", "mt5"];

function GetFunded() {
  const { t } = useTranslation();

  const paymentOption = [
    ["Paypal", "Card Payment"],
    [
      "Oxapay",
      <>
        {t("Crypto payment")} (
        <span className="text-secondary font-bold px-2 py-1 rounded-md">
          {t("30% off")}
        </span>
        )
      </>,
    ],
  ];

  const addOnLabels: Record<keyof AddOns, string> = {
    profitSplit100: t("Profit Split up to 100%"),
    fastPayout: t("First Payout in 7 days"),
    both: t("Both Add-Ons"), // Added label for 'both'
  };

  const BillingFormData = [
    { label: t("Email"), name: "email", type: "email" },
    { label: t("First Name"), name: "firstName", type: "text" },
    { label: t("Last Name"), name: "lastName", type: "text" },
    { label: t("Country/Region"), name: "country", type: "text" },
    {
      label: t("Apartment/Suite"),
      name: "apartment",
      type: "text",
    },
    { label: t("Town/City"), name: "town", type: "text" },
    { label: t("State/County"), name: "state", type: "text" },
    { label: t("Company Name"), name: "companyName", type: "text" },
    { label: t("Postcode/ZIP"), name: "postalCode", type: "text" },
    { label: t("Phone Number"), name: "phone", type: "text" },
  ];
  const addOnContent = [
    {
      id: "profitSplit100",
      label: t("100% Profit Split"),
      price: 15,
      description: t("Increase your profit split from 90% to 100%"),
    },

    {
      id: "fastPayout",
      label: t("Fast Payout"),
      price: 15,
      description: t("Get your first payout in 7 days instead of 14"),
    },
    {
      id: "both",
      label: t("Both (save 5%)"),
      price: 25,
      description: t("Both (save 5%)"),
    },
  ];

  const navigate = useNavigate();
  const [step, setStep] = useState<boolean>(false);
  // const [challengeType, setChallengeType] = useState<ChallengeType>("2 Phase");
  // const [accountSize, setAccountSize] = useState<AccountSize>(5000);
  const [platform, setPlatform] = useAtom(platformAtom);
  const [accountSize, setAccountSize] = useAtom(balanceAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const setFee = useSetAtom(feeAtom);
  const [challengeType, setChallengeType] = useAtom(challengeAtom);
  const setAddOnsAtom = useSetAtom(addOnsAtom);

  const [addOns, setAddOns] = useState<AddOns>({
    profitSplit100: false,
    fastPayout: false,
  });

  const [couponCode, setCouponCode] = useState("");

  const calculateTotal = () => {
    let balanceData: number[][];
    if (challengeType === "twoPhase") {
      balanceData = balanceDataOfTwoPhase;
    } else {
      balanceData = balanceDataOfInstantFunding;
    }
    let total =
      balanceData.find((item) => item[0] === accountSize * 0.001)?.[1] || 0;
    if (addOns.both) {
      total *= 1.25;
    } else {
      if (addOns.profitSplit100) total *= 1.15;
      if (addOns.fastPayout) total *= 1.15;
    }
    return Math.ceil(total);
  };

  const challengeTypes: ChallengeType[] = ["twoPhase", "instantFund"];

  const [billingInfo, setBillingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    apartment: "",
    town: "",
    state: "",
    companyName: "",
    postalCode: "",
    phone: "",
  });

  const [isCompleted, setCompleted] = useState(false);

  const { mutate: updateBillingInfo } = useMutation({
    mutationFn: async (data: typeof billingInfo) => {
      // Simulate API call to save billing info
      const response = await axios.post("profile/put", data);
      return response.data.data.updatedProfile;
    },
    onSuccess: (data) => {
      setProfile((prev) => ({
        ...prev,
        email: data.user.email || prev?.email || "",
        firstName: data.firstName || prev?.firstName || "",
        lastName: data.lastName || prev?.lastName || "",
        country: data.country || prev?.country || "",
        apartment: data.apartment || prev?.apartment || "",
        town: data.town || prev?.town || "",
        state: data.state || prev?.state || "",
        companyName: data.companyName || prev?.companyName || "",
        postalCode: data.postalCode || prev?.postalCode || "",
        phone: data.user?.phone || prev?.phone || "",
      }));
      setCompleted(true);
      setAccountSize(accountSize);
      setFee(calculateTotal());
      setAddOnsAtom(addOns);
      setPlatform(platform);
      setChallengeType(challengeType);
      localStorage.setItem("platform", platform);
      localStorage.setItem("challenge", challengeType);
      localStorage.setItem("balance", `${accountSize}`);
      localStorage.setItem("fee", `${calculateTotal()}`);
      localStorage.setItem("addOns", JSON.stringify(addOns));
      if (paymentMethod === "Oxapay") {
        // Redirect to Oxapay payment page
        const total = Math.ceil(calculateTotal() * 0.7);
        setFee(total);
        localStorage.setItem("fee", `${total}`);
        navigate("/oxapay");
      } else {
        toast.warn("Card Payment is not available in your area.");
        // navigate("/paypal");
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to save billing info"
      );
    },
  });

  useEffect(() => {
    setBillingInfo((prev) => ({
      ...prev,
      email: profile?.email || "",
    }));
    if (profile?.firstName) {
      setBillingInfo((prev) => ({
        ...prev,
        ...profile,
      }));
      setCompleted(true);
    }
  }, [profile?.firstName]);

  const [paymentMethod, setPaymentMethod] = useState<"Paypal" | "Oxapay">(
    "Paypal"
  );
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!agreeTerms) {
      toast.warn(t("You must agree to the terms and conditions."));
      return;
    }
    if (accountSize === 0) {
      toast.warn(t("Please select an account size."));
      return;
    }
    if (platform === "") {
      toast.warn(t("Please select a trading platform."));
      return;
    }
    if (challengeType === "") {
      toast.warn(t("Please select a challenge type."));
      return;
    }
    if (!isCompleted) {
      // check if all billingInfo are filled
      if (!Object.values(billingInfo).every((value) => value.trim() !== "")) {
        toast.warn(t("Please fill in all the billing information."));
        return;
      }
      updateBillingInfo(billingInfo);
    } else {
      setAccountSize(accountSize);
      setFee(calculateTotal());
      setAddOnsAtom(addOns);
      setPlatform(platform);
      setChallengeType(challengeType);
      localStorage.setItem("platform", platform);
      localStorage.setItem("challenge", challengeType);
      localStorage.setItem("balance", `${accountSize}`);
      localStorage.setItem("fee", `${calculateTotal()}`);
      localStorage.setItem("addOns", JSON.stringify(addOns));
      if (paymentMethod === "Oxapay") {
        // Redirect to Oxapay payment page
        const total = Math.ceil(calculateTotal() * 0.7);
        setFee(total);
        localStorage.setItem("fee", `${total}`);
        navigate("/oxapay");
      } else {
        // navigate("/paypal");
        toast.warn("Card Payment is not available in your area.");
      }
    }
  };

  const themeAtomValue = useAtomValue(themeAtom);
  const [selectAccountBgURL, setSelectAccountBgURL] = useState<string>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [panelBg, setPanelBg] = useState<string>();
  useEffect(() => {
    setSelectAccountBgURL(
      themeAtomValue === "dark"
        ? selectAccountButtonBgDarkURL
        : selectAccountButtonBgLightURL
    );
    setPanelBg(themeAtomValue === "dark" ? panelBgDark : panelBgLight);
  }, [themeAtomValue]);

  return (
    <div className="dark:bg-dark dark:text-white bg-white text-dark w-full h-full">
      <title>{t("Get Funded")}</title>
      <div className="relative min-h-screen">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="tab-panel flex justify-center space-x-6 mb-10 w-full text-[24px]">
            <button
              onClick={() => setStep(false)}
              className={`font-bold dark:bg-[#191919] text-lg transition-all h-[71px] duration-300 w-full `}
            >
              {!step ? (
                <GeneralButton inputText={t("Select Account")} />
              ) : (
                t("Select Account")
              )}
            </button>
            <button
              onClick={() => setStep(true)}
              className={`font-bold dark:bg-[#191919] bg-[#A4E5EA] bg-opacity-85 text-lg transition-all h-[71px] duration-300 w-full`}
            >
              {step ? (
                <GeneralButton inputText={t("Detail & Payment")} />
              ) : (
                t("Detail & Payment")
              )}
            </button>
          </div>
          {!step ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* choose account */}
                <div className="relative z-50 bg-gradient-to-r from-[#D6D537] via-[#9DD473] to-[#20CDE2] dark:bg-gradient-to-r dark:from-[#091B1D] dark:via-[#161B11] dark:to-[#1B1B0A] p-8">
                  <h2 className="text-[40px] font-bold flex items-center">
                    {t("Choose Account")}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-[24px] font-bold mb-3">
                        {t("Funding Type:")}
                      </label>
                      <div className="flex flex-row gap-4">
                        {challengeTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setChallengeType(type)}
                            className="dark:bg-[#292D23] bg-white bg-opacity-25 w-1/2 h-[71px]"
                          >
                            <span className="text-[24px]">
                              {challengeType === type ? (
                                <GeneralButton
                                  inputText={t(
                                    type === "instantFund"
                                      ? "Instant Funding"
                                      : "Two Phase"
                                  )}
                                />
                              ) : (
                                t(
                                  type === "instantFund"
                                    ? "Instant Funding"
                                    : "Two Phase"
                                )
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[24px] font-bold mb-3">
                        {t("Trading Platform :")}
                      </label>
                      <div className="flex gap-4">
                        {tradingPlatformType.map((plt) => (
                          <button
                            key={plt}
                            onClick={() =>
                              plt === "mt4"
                                ? setPlatform("mt4")
                                : setPlatform("mt5")
                            }
                            className={`w-1/2 h-[71px]`}
                          >
                            <span className="text-[24px]">
                              {platform === plt ? (
                                plt === "mt4" ? (
                                  <div className="relative w-full h-full ">
                                    <GeneralButton inputText="" />
                                    <div className="absolute inset-0 p-3 py-2">
                                      <img
                                        src={MT4Logo}
                                        alt=""
                                        className=" w-full h-full"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative w-full h-full ">
                                    <GeneralButton inputText="" />
                                    <div className="absolute inset-0 p-3 py-2">
                                      <img
                                        src={MT5Logo}
                                        alt=""
                                        className="w-full h-full"
                                      />
                                    </div>
                                  </div>
                                )
                              ) : plt === "mt4" ? (
                                <div className="relative w-full h-full dark:bg-[#292D24] bg-white bg-opacity-25">
                                  <div className="absolute inset-0 p-3 py-2">
                                    <img
                                      src={MT4Logo}
                                      alt="MT4Logo"
                                      className=" w-full h-full"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-full h-full dark:bg-[#292D24] bg-white bg-opacity-25">
                                  <div className="absolute inset-0 p-3 py-2">
                                    <img
                                      src={MT5Logo}
                                      alt="MT5Logo"
                                      className="w-full h-full"
                                    />
                                  </div>
                                </div>
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Account Size */}
                    <div className="relative">
                      <label className="block text-[24px] font-bold mb-3">
                        {t("Account Size :")}
                      </label>

                      <div className="relative text-center w-full h-fit z-50">
                        <button
                          id="dropdownDefaultButton"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="relative w-full h-full text-center items-center"
                          type="button"
                        >
                          <img
                            src={selectAccountBgURL}
                            alt="ButtonBackgroundImage"
                            className="bg-cover w-full h-full"
                          />
                          <div className="absolute flex justify-center dark:text-white text-dark items-center inset-0 text-[30px]">
                            {accountSizeValue
                              .find((size) => size === accountSize)
                              ?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              }) || "Select"}
                          </div>
                        </button>

                        {isDropdownOpen && (
                          <div
                            id="dropdown"
                            className="absolute w-full bg-white dark:bg-[#282D23]"
                          >
                            <ul className="py-2 text-[20px] text-gray-700 dark:text-gray-200">
                              {accountSizeValue.map((size) => (
                                <li key={size}>
                                  <button
                                    onClick={() => {
                                      setAccountSize(size as AccountSize);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    {size.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    })}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* <div className="grid grid-cols-2 gap-4">
                        {accountSizeValue.map((size) => (
                          <button
                            key={size}
                            onClick={() => setAccountSize(size as AccountSize)}
                            className={`p-[1px] rounded-xl ${
                              accountSize === size
                                ? "bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
                                : "bg-[#1C2333] border-2 border-blue-500/20"
                            }`}
                          >
                            <div
                              className={`p-5 rounded-[10px] ${
                                accountSize === size
                                  ? "bg-[#1C2333] text-yellow-300"
                                  : "bg-[#1C2333] text-white hover:bg-[#1C2333]/80"
                              }`}
                            >
                              {size.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </div>
                          </button>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Add on */}
                <div className="relative bg-gradient-to-r from-[#D6D537] via-[#9DD473] to-[#20CDE2] dark:bg-gradient-to-r dark:from-[#091B1D] dark:via-[#161B11] dark:to-[#1B1B0A] p-8 z-0">
                  <h2 className="text-[40px] font-bold flex items-center">
                    {t("Add-Ons")}
                  </h2>

                  <div className="space-y-4">
                    {addOnContent.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between p-6 rounded-xl bg-[#A8D87E] dark:bg-[#283229]"
                      >
                        <div>
                          <h3 className="font-medium text-lg">
                            {t(addon.label)}
                          </h3>
                          <p className="text-sm dark:text-[#A9A9A4] text-[#23554F] mt-1">
                            {t(addon.description)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="text-dark dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent dark:from-[#78D293] dark:via-[#B2D45D] dark:to-[#D8D535] font-medium">
                            +{addon.price}%
                          </span>
                          <button
                            onClick={() =>
                              setAddOns((prev) => {
                                const updatedAddOns = {
                                  ...prev,
                                  [addon.id]: !prev[addon.id as keyof AddOns],
                                };

                                console.log("Updated Add-Ons:", updatedAddOns);

                                if (addon.id === "both") {
                                  if (updatedAddOns.both) {
                                    // If "Both" is selected, disable individual add-ons
                                    updatedAddOns.profitSplit100 = true;
                                    updatedAddOns.fastPayout = true;
                                  } else {
                                    updatedAddOns.fastPayout = false;
                                    updatedAddOns.profitSplit100 = false;
                                  }
                                } else {
                                  if (
                                    updatedAddOns.profitSplit100 &&
                                    updatedAddOns.fastPayout
                                  ) {
                                    updatedAddOns.both = true;
                                  } else {
                                    updatedAddOns.both = false;
                                  }
                                }

                                return updatedAddOns;
                              })
                            }
                            className={`w-14 h-7 rounded-full p-1 ${
                              addOns[addon.id as keyof AddOns]
                                ? "bg-gradient-to-r from-[#21CEE2] via-[#8FD27F] to-[#8FD27F]"
                                : "dark:bg-[#162421] bg-[#7F8130]"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-white ${
                                addOns[addon.id as keyof AddOns]
                                  ? "translate-x-7"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:sticky lg:top-28 space-y-8 lg:h-fit">
                <div className="space-y-8 border border-red-600">
                  <div className="border border-red-600 relative h-[303px]">
                    <div className="w-full h-full">
                      <img
                        src={panelBg}
                        alt="panelBg"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute flex items-center justify-center p-8 py-1 inset-0 w-full h-full">
                      <div className=" w-full h-full pt-5 flex flex-col justify-around">
                        <h2 className="text-2xl font-semibold flex items-center">
                          {t("Order Summary")}
                        </h2>

                        {/* // */}
                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Funding Type")}
                            </span>
                            <span className="font-medium">
                              {challengeType === "instantFund"
                                ? "Instant Funding"
                                : "Two Phase"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center  font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Account Size")}
                            </span>
                            <span className="font-medium">
                              {accountSize?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-blue-500/10  font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Platform")}
                            </span>
                            <span className=" font-medium">
                              {platform === "mt4" ? "MT4" : "MT5"}
                            </span>
                          </div>

                          {addOns.both ? (
                            <div className="flex justify-between border-b border-blue-500/10">
                              <span className="text-[#8DA39F]">
                                {addOnLabels.both}
                              </span>
                              <span className="font-medium">+25%</span>
                            </div>
                          ) : (
                            Object.entries(addOns).map(
                              ([key, value]) =>
                                value && (
                                  <div
                                    key={key}
                                    className="flex justify-between border-b border-blue-500/10"
                                  >
                                    <span className="text-[#8DA39F] ">
                                      {addOnLabels[key as keyof AddOns]}
                                    </span>
                                    <span className="font-medium">
                                      +
                                      {key === "profitSplit100" ? "15%" : "15%"}
                                    </span>
                                  </div>
                                )
                            )
                          )}
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                          <span className="">{t("Total")}</span>
                          <span className="">
                            {calculateTotal().toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coupone code section//  */}
                  <div className="relative h-[158px]">
                    <div className="w-full h-full">
                      <img
                        src={panelBg}
                        alt="panelBg"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center absolute inset-0 w-full h-full p-8">
                      <h2 className="text-2xl w-full flex items-center">
                        {t("Coupon Code")}
                      </h2>
                      <div className="mt-8 w-full">
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="placeholder:text-white  flex-1 dark:bg-[#35564A] bg-[#86D69E] p-4"
                          />
                          <button className="font-medium w-1/3">
                            <GeneralButton inputText={t("Apply")} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-8 rounded-xl font-medium text-lg flex items-center justify-center space-x-3 text-white"
                    onClick={() => setStep(true)}
                  >
                    <GeneralButton inputText={t("Continue")} />
                  </button>

                  <p className="text-center text-sm text-gray-400 mt-6">
                    {t("Secure payment powered by Paypal & OxaPay")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Billing Details */}
              <div className="glass-panel bg-dark/80 p-8 rounded-2xl border border-blue-500/10">
                <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                  <FileText className="h-6 w-6 mr-3 text-blue-400" />
                  {t("Billing Details")}
                </h2>
                <div className="space-y-4">
                  {BillingFormData.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium mb-2 text-gray-300"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={
                          billingInfo[field.name as keyof typeof billingInfo]
                        }
                        disabled={field.name === "email" ? true : isCompleted}
                        onChange={handleInputChange}
                        className="w-full bg-[#1C2333] border-2 border-blue-500/10 rounded-xl p-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Order and Payment Method */}
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <div className="glass-panel border ">
                  <div className="relative h-[303px]">
                    <div className="w-full h-full">
                      <img
                        src={panelBg}
                        alt="panelBg"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute flex items-center justify-center p-8 py-1 inset-0 w-full h-full">
                      <div className=" w-full h-full pt-5 flex flex-col justify-around">
                        <h2 className="text-2xl font-semibold flex items-center">
                          {t("Order Summary")}
                        </h2>

                        {/* // */}
                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Funding Type")}
                            </span>
                            <span className="font-medium">
                              {challengeType === "instantFund"
                                ? "Instant Funding"
                                : "Two Phase"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center  font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Account Size")}
                            </span>
                            <span className="font-medium">
                              {accountSize?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-blue-500/10  font-medium text-[18px]">
                            <span className="dark:text-[#89A2A3] text-[#15676D]">
                              {t("Platform")}
                            </span>
                            <span className=" font-medium">
                              {platform === "mt4" ? "MT4" : "MT5"}
                            </span>
                          </div>

                          {addOns.both ? (
                            <div className="flex justify-between border-b border-blue-500/10">
                              <span className="text-[#8DA39F]">
                                {addOnLabels.both}
                              </span>
                              <span className="font-medium">+25%</span>
                            </div>
                          ) : (
                            Object.entries(addOns).map(
                              ([key, value]) =>
                                value && (
                                  <div
                                    key={key}
                                    className="flex justify-between border-b border-blue-500/10"
                                  >
                                    <span className="text-[#8DA39F] ">
                                      {addOnLabels[key as keyof AddOns]}
                                    </span>
                                    <span className="font-medium">
                                      +
                                      {key === "profitSplit100" ? "15%" : "15%"}
                                    </span>
                                  </div>
                                )
                            )
                          )}
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                          <span className="">{t("Total")}</span>
                          <span className="">
                            {calculateTotal().toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border border-secondary">
                    <div className="">
                      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center text-white">
                        <WalletCards className="h-6 w-6 mr-3 text-blue-400" />
                        {t("Choose Payment Method")}
                      </h2>
                      <div className="space-y-4">
                        {paymentOption.map((method) => (
                          <div
                            key={String(method[0])}
                            className="flex items-center"
                          >
                            <input
                              type="radio"
                              id={String(method[0])}
                              name="paymentMethod"
                              checked={paymentMethod === method[0]}
                              onChange={() =>
                                setPaymentMethod(
                                  method[0] as "Paypal" | "Oxapay"
                                )
                              }
                              className="w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300 cursor-pointer"
                              value={String(method[0])}
                            />
                            <label
                              htmlFor={String(method[0])}
                              className="ml-3 text-gray-300 font-medium cursor-pointer"
                            >
                              {method[1]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="ml-3 text-gray-300 cursor-pointer">
                          {t("I agree to the terms and conditions")}
                        </span>
                      </label>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full mt-8 px-8 py-5 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium text-lg flex items-center justify-center space-x-3 text-white"
                    >
                      {t("Place Order")}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default GetFunded;
