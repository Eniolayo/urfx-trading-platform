import { useEffect, useState } from "react";
import {
  CreditCard,
  FileText,
  Package,
  Shield,
  WalletCards,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  balanceDataOfInstantFunding,
  balanceDataOfTwoPhase,
} from "../landing/FeaturesSection";
import { useAtom, useSetAtom } from "jotai";
import {
  addOnsAtom,
  balanceAtom,
  challengeAtom,
  feeAtom,
  platformAtom,
  profileAtom,
} from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/api";
import MT4Logo from "../../assets/mt4.png";
import MT5Logo from "../../assets/mt5.png";
import { useTranslation } from "react-i18next";

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
  const {t } = useTranslation();
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

  // const [couponCode, setCouponCode] = useState("");
  
const paymentOption = [
  ["Paypal", "Online payment via Paypal"],
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
        navigate("/paypal");
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
        navigate("/paypal");
      }
    }
  };

  return (
    <>
      <title>Get Funded</title>
      <div className="min-h-screen text-gray-100">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="tab-panel flex justify-center space-x-6 mb-10 w-full glass-panel p-3">
            <button
              onClick={() => setStep(false)}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 w-full ${
                !step
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-[#1C2333] text-gray-300 hover:bg-[#1C2333]/80 hover:text-white"
              }`}
            >
              {t("Select Account")}
            </button>
            <button
              onClick={() => setStep(true)}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 w-full ${
                step
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-[#1C2333] text-gray-300 hover:bg-[#1C2333]/80 hover:text-white"
              }`}
            >
              {t("Detail & Payment")}
            </button>
          </div>
          {!step ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="glass-panel bg-dark/80 p-8 rounded-2xl shadow-xl border border-blue-500/10">
                  <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                    <Package className="h-6 w-6 mr-3 text-blue-400" />
                    {t("Challenge Selection")}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">
                        {t("Challenge Type")}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {challengeTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setChallengeType(type)}
                            className={`p-[1px] rounded-xl ${
                              challengeType === type
                                ? "bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
                                : "bg-[#1C2333] border-2 border-blue-500/10"
                            }`}
                          >
                            <div
                              className={`p-5 rounded-[10px] ${
                                challengeType === type
                                  ? "bg-[#1C2333] text-yellow-400"
                                  : "bg-[#1C2333] text-white hover:bg-[#1C2333]/80"
                              }`}
                            >
                              {type === "instantFund"
                                ? t("Instant Funding")
                                : t("Two Phase")}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">
                        {t("Account Size")}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
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
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">
                        {t("Trading Platform")}
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {tradingPlatformType.map((plt) => (
                          <button
                            key={plt}
                            onClick={() =>
                              plt === "mt4"
                                ? setPlatform("mt4")
                                : setPlatform("mt5")
                            }
                            className={`p-5 rounded-xl border-2 ${
                              platform === plt
                                ? "bg-gradient-to-r from-red-900 via-yellow-500 to-red-900 text-yellow-300"
                                : "bg-[#1C2333] text-white hover:bg-[#1C2333]/80"
                            }`}
                          >
                            {plt === "mt4" ? (
                              <img src={MT4Logo} alt="MT4Logo" />
                            ) : (
                              <img src={MT5Logo} alt="MT5Logo" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel bg-dark/80 p-8 rounded-2xl shadow-xl border border-blue-500/10">
                  <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                    <Shield className="h-6 w-6 mr-3 text-blue-400" />
                    {t("Add-Ons")}
                  </h2>

                  <div className="space-y-4">
                    {addOnContent.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between p-6 rounded-xl bg-[#1C2333] border-2 border-blue-500/10"
                      >
                        <div>
                          <h3 className="font-medium text-lg text-white">
                            {t(addon.label)}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {t(addon.description)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="text-blue-400 font-medium">
                            +{addon.price}%
                          </span>
                          <button
                            onClick={() =>
                              setAddOns((prev) => {
                                const updatedAddOns = {
                                  ...prev,
                                  [addon.id]: !prev[addon.id as keyof AddOns],
                                };

                                // Special handling for the 'both' add-on
                                if (addon.id === "both") {
                                  const bothValue = !prev.both;
                                  return {
                                    ...updatedAddOns,
                                    both: bothValue,
                                    profitSplit100: bothValue,
                                    fastPayout: bothValue,
                                  };
                                } else {
                                  // If 'both' is being toggled off, make sure individual ones can be toggled
                                  if (
                                    addon.id === "profitSplit100" &&
                                    prev.both
                                  ) {
                                    return {
                                      ...updatedAddOns,
                                      both: false,
                                    };
                                  }
                                  if (addon.id === "fastPayout" && prev.both) {
                                    return {
                                      ...updatedAddOns,
                                      both: false,
                                    };
                                  }
                                  return updatedAddOns;
                                }
                              })
                            }
                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                              addOns[addon.id as keyof AddOns]
                                ? "bg-green-500"
                                : "bg-gray-700"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full bg-gray-300 shadow-md transform transition-transform duration-300 ${
                                addOns[addon.id as keyof AddOns]
                                  ? "translate-x-6"
                                  : "translate-x-0"
                              }`}
                            ></div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="glass-panel bg-dark/80 p-8 rounded-2xl shadow-xl border border-blue-500/10">
                <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                  <WalletCards className="h-6 w-6 mr-3 text-blue-400" />
                  {t("Order Summary")}
                </h2>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Challenge Type")}</span>
                    <span className="font-medium text-white">
                      {challengeType === "instantFund"
                        ? "Instant Funding"
                        : "Two Phase"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Account Size")}</span>
                    <span className="font-medium text-white">
                      {accountSize?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Platform")}</span>
                    <span className="font-medium text-white">{platform}</span>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300">{t("Total")}</span>
                      <span className="text-2xl font-semibold text-blue-400">
                        ${calculateTotal()}
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setStep(true)}
                        className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-300"
                      >
                        {t("Apply")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="glass-panel bg-dark/80 p-8 rounded-2xl shadow-xl border border-blue-500/10">
                  <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                    <FileText className="h-6 w-6 mr-3 text-blue-400" />
                    {t("Billing Details")}
                  </h2>
                  <div className="space-y-6">
                    {BillingFormData.map((item) => (
                      <div key={item.name}>
                        <label
                          htmlFor={item.name}
                          className="block text-sm font-medium mb-3 text-gray-300"
                        >
                          {t(item.label)}
                        </label>
                        <input
                          type={item.type}
                          id={item.name}
                          name={item.name}
                          value={billingInfo[item.name as keyof typeof billingInfo]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#1C2333] border-2 border-blue-500/10 text-white focus:border-blue-500 focus:outline-none transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="glass-panel bg-dark/80 p-8 rounded-2xl shadow-xl border border-blue-500/10">
                <h2 className="text-2xl font-semibold mb-8 flex items-center text-white">
                  <CreditCard className="h-6 w-6 mr-3 text-blue-400" />
                  {t("Your Order")}
                </h2>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Challenge Type")}</span>
                    <span className="font-medium text-white">
                      {challengeType === "instantFund"
                        ? "Instant Funding"
                        : "Two Phase"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Account Size")}</span>
                    <span className="font-medium text-white">
                      {accountSize?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{t("Payment Method")}</span>
                    <div className="flex gap-4">
                      {paymentOption.map((option) => (
                        <button
                          key={typeof option[0] === "string" ? option[0] : ""}
                          onClick={() =>
                            setPaymentMethod(option[0] as "Paypal" | "Oxapay")
                          }
                          className={`px-4 py-2 rounded-xl  text-white font-semibold transition-colors duration-300 ${
                            paymentMethod === option[0]
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-[#1C2333]  hover:bg-[#1C2333]/80"
                          }`}
                        >
                          {option[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300">{t("Total")}</span>
                      <span className="text-2xl font-semibold text-blue-400">
                        ${calculateTotal()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-5 h-5 rounded bg-[#1C2333] border-2 border-blue-500/10 focus:ring-blue-500 focus:ring-offset-0"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <label htmlFor="terms" className="text-gray-300">
                        {t("I agree to the terms and conditions")}
                      </label>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handlePlaceOrder}
                        className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-300"
                      >
                        {t("Place Order")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className="mt-8 text-center text-gray-400">
            {t("Secure payment powered by Paypal & OxaPay")}
          </p>
        </main>
      </div>
    </>
  );
}

export default GetFunded;
