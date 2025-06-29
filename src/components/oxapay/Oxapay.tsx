import "../../style/StyleOxapay.css";
import isEmpty from "@/utils/empty";
import {
  addOnsAtom,
  balanceAtom,
  challengeAtom,
  feeAtom,
  oxapayCurrencyAtom,
  paymentAtom,
  platformAtom,
  userAtom,
} from "@/store/atoms";
import { oxapayNetworkAtom } from "@/store/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "@/utils/api";
import { RotatingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

interface OxaPayProps {
  amount: number;
  email: string;
  platform: string;
  balance: number;
  challenge: string;
  currency: string;
  network: string;
  addOns: {
    profitSplit100: boolean;
    fastPayout: boolean;
  };
}

const oxaCurrency = {
  BTC: ["Bitcoin"],
  ETH: ["ERC20", "Base"],
  USDC: ["ERC20"],
  TRX: ["TRC20"],
  BNB: ["BEP20"],
  DOGE: ["Dogecoin"],
  LTC: ["Litecoin"],
  XMR: ["Monero"],
  USDT: ["BEP20", "ERC20", "TRC20", "Polygon", "Ton"],
  TON: ["Ton"],
  POL: ["Polygon"],
  BCH: ["BitcoinCash"],
  SHIB: ["BEP20"],
  SOL: ["Solana"],
  NOT: ["Ton"],
  DOGS: ["Ton"],
  DAI: ["Polygon"],
};

const currencyData = {
  BTC: [""],
  ETH: ["Ethereum Network", "Base Network"],
  USDC: ["Ethereum Network(ERC20)"],
  TRX: [""],
  BNB: [""],
  DOGE: [""],
  LTC: [""],
  XMR: [""],
  USDT: [
    "BNB Smart Chain",
    "Ethereum(ERC20)",
    "Tron(TRC20)",
    "Polygon",
    "The Open Network(TON)",
  ],
  TON: [""],
  POL: [""],
  BCH: [""],
  SHIB: ["BNB Smart Chain(Bep20)"],
  SOL: [""],
  NOT: ["The Open Network(TON)"],
  DOGS: ["The Open Network"],
  DAI: ["Polygon"],
};

const findCorrespondingValue = (input: string, symbol: string) => {
  console.log("Input & symbol:", input, "&", symbol);
  if (!input || input === "") {
    for (const [currency, values] of Object.entries(currencyData)) {
      const index = values.indexOf(input);
      if (index !== -1 && currency === symbol) {
        return oxaCurrency[currency as keyof typeof oxaCurrency][index];
      }
    }
  }
  
  return oxaCurrency[symbol as keyof typeof oxaCurrency][0] || null;
};

const Oxapay = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useAtom(oxapayCurrencyAtom);
  const [selectedNetwork, setSelectedNetwork] = useAtom(oxapayNetworkAtom);
  const [fee] = useAtom(feeAtom);
  const [user] = useAtom(userAtom);
  const [platform] = useAtom(platformAtom);
  const [balance] = useAtom(balanceAtom);
  const [challenge] = useAtom(challengeAtom);
  const [addOns] = useAtom(addOnsAtom);
  const setPayment = useSetAtom(paymentAtom);

  const { mutate, status } = useMutation({
    mutationFn: async (data: OxaPayProps) => {
      const response = await axios.post("payment/white-label/create", data);
      return response.data.result;
    },
    onSuccess: (data) => {
      setPayment(data);
      onClick();
    },
    onError: (error: any) => {
      console.error("Error sending message: ", error);
      toast.warning(t("Failed to create payment session. Please try again."));
    },
  });

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const network = findCorrespondingValue(
      selectedNetwork || "",
      selectedCurrency || ""
    );
    if (!network) return;

    mutate({
      amount: fee,
      email: user?.email || "",
      platform,
      balance,
      challenge,
      currency: selectedCurrency || "",
      network,
      addOns,
    });
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event?.target.value as keyof typeof currencyData);
  };
  const handleNetworkChanage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedNetwork(event?.target.value as string);
  };

  return (
    <div className="max-w-4xl w-full flex flex-col justify-center items-center mx-3">
      <form className="form gap-11 md:w-2/3 w-full">
        <span className="title">OxaPay</span>

        <div className="w-full h-auto">
          <span className="h-auto w-auto text-white/65">
            {t("Amount to pay")} : ${fee}
          </span>
        </div>

        {/* choose currency section */}
        <div className="w-full h-auto">
          <div className="text-[#ffe0a6]">{t("Choose Currency")}</div>

          <div className="input-container w-full">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="gradient-stroke"
                  x1={0}
                  y1={0}
                  x2={24}
                  y2={24}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="black" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
              <g stroke="url(#gradient-stroke)" fill="none" strokeWidth={1}>
                <path d="M21.6365 5H3L12.2275 12.3636L21.6365 5Z" />
                <path d="M16.5 11.5L22.5 6.5V17L16.5 11.5Z" />
                <path d="M8 11.5L2 6.5V17L8 11.5Z" />
                <path d="M9.5 12.5L2.81805 18.5002H21.6362L15 12.5L12 15L9.5 12.5Z" />
              </g>
            </svg>
            {/* <input className="input" type="text" placeholder="Select Currency" /> */}

            <select
              className="input w-full text-white/65"
              name="currency"
              id="selectCurrency"
              onChange={handleCurrencyChange}
              value={selectedCurrency?.toString() || ""}
            >
              <option value="BTC" className="bg-black/95 text-white/65 w-full">
                Bitcoin
              </option>
              <option value="ETH" className="bg-black/95 text-white/65">
                Ethereum
              </option>
              <option value="USDC" className="bg-black/95 text-white/65">
                USD Coin (USDC)
              </option>
              <option value="TRON" className="bg-black/95 text-white/65">
                Tron(TRX)
              </option>
              <option value="BNB" className="bg-black/95 text-white/65">
                BNB(BNB)
              </option>
              <option value="DOGE" className="bg-black/95 text-white/65">
                Dogecoin(DOGE)
              </option>
              <option value="LTC" className="bg-black/95 text-white/65 w-full ">
                Litecoin(LTC)
              </option>
              <option value="XMR" className="bg-black/95 text-white/65">
                Monero(XMR)
              </option>
              <option value="USDT" className="bg-black/95 text-white/65">
                Tether(USDT)
              </option>
              <option value="TON" className="bg-black/95 text-white/65">
                Toncoin(TON)
              </option>
              <option value="POL" className="bg-black/95 text-white/65">
                Polygon(POL)
              </option>
              <option value="BCH" className="bg-black/95 text-white/65">
                Bitcoin Cash(BCH)
              </option>
              <option
                value="SHIB"
                className="bg-black/95 text-white/65 w-full "
              >
                Shiba Lnu(SHIB)
              </option>
              <option value="SOL" className="bg-black/95 text-white/65">
                Solana(SOL)
              </option>
              <option value="NOT" className="bg-black/95 text-white/65">
                NotCoin(NOT)
              </option>
              <option value="DOGS" className="bg-black/95 text-white/65">
                Dogs(DOGS)
              </option>
              <option value="DAI" className="bg-black/95 text-white/65">
                Dai(DAI)
              </option>
            </select>
          </div>
        </div>

        {/* Network Selection */}
        {!isEmpty(
          selectedCurrency
            ? currencyData[selectedCurrency as keyof typeof currencyData]
            : null
        ) && (
          <div className="w-full h-auto">
            <div className="text-[#ffe0a6]">{t("Choose Network")}</div>
            <div className="input-container w-full">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="gradient-stroke"
                    x1={0}
                    y1={0}
                    x2={24}
                    y2={24}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="black" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                </defs>
                <g stroke="url(#gradient-stroke)" fill="none" strokeWidth={1}>
                  <path d="M21.6365 5H3L12.2275 12.3636L21.6365 5Z" />
                  <path d="M16.5 11.5L22.5 6.5V17L16.5 11.5Z" />
                  <path d="M8 11.5L2 6.5V17L8 11.5Z" />
                  <path d="M9.5 12.5L2.81805 18.5002H21.6362L15 12.5L12 15L9.5 12.5Z" />
                </g>
              </svg>
              {/* <input className="input" type="text" placeholder="Select Currency" /> */}

              <select
                key="chooseNetwork"
                className="input w-full text-white/65"
                name="currency"
                id="selectCurrency"
                onChange={handleNetworkChanage}
                value={selectedNetwork?.toString() || ""}
              >
                {selectedCurrency &&
                  currencyData[
                    selectedCurrency as keyof typeof currencyData
                  ].map((network, index) => (
                    <option
                      key={index}
                      value={network}
                      className="bg-black/95 text-white/65 w-full"
                    >
                      {network}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        <div className="login-button">
          <button
            className="input flex justify-center"
            onClick={handleClickButton}
            disabled={status === "pending"}
          >
            {status === "pending" ? (
              <RotatingLines
                key="contactUs"
                width={"32"}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              "Proceed to payment"
            )}
          </button>
        </div>

        <div className="texture" />
      </form>
    </div>
  );
};

export default Oxapay;
