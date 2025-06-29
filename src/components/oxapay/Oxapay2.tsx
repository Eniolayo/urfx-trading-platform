import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy } from "lucide-react";
import { paymentAtom } from "@/store/atoms";
import { timeFormatter } from "@/utils/timeFormatter";
import axios from "@/utils/api";
import "../../style/StyleOxapay.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Oxapay2 = ({
  onClick,
  expireTime,
}: {
  onClick: () => void;
  expireTime: number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copyLoading, setCopyLoading] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("Waiting");
  const paymentData = useAtomValue(paymentAtom);

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick();
  };

  const handleCopy = (value: string) => {
    if (copyLoading) return;
    setCopyLoading(value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopyLoading("");
    }, 500);
  };

  // Mutation to check payment status
  const checkPaymentMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `payment/get-history?trackId=${paymentData.trackId}`
      );

      return response.data.result;
    },
    onSuccess: (data) => {
      if (data.status === "Confirming") {
        toast.info(t("Payment is confirming, please wait..."));
      } else if (data.status === "Paid") {
        toast.success(t("Payment successful!"));
      }
      setPaymentStatus(data.status); // Update payment status
    },
    onError: (error: any) => {
      console.error("Error checking payment status:", error);
    },
  });

  // Polling API every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkPaymentMutation.mutate(); // Trigger the mutation
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="max-w-4xl w-full flex flex-col justify-center items-center mx-3">
      <form className="form gap-11 relative">
        <div className="absolute right-0 top-0 -translate-y-full">
          {t("Invoice expire at")} {timeFormatter(expireTime)}
        </div>
        <div className="absolute left-6 top-6">
          <button className="hover:scale-125" onClick={handleClickButton}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.5"
                x="6"
                y="11"
                width="13"
                height="2"
                rx="1"
                fill="currentColor"
              ></rect>
              <path
                d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>

        <div className="absolute right-10 top-7">{t("Pay details")}</div>

        <div className="w-full h-auto">
          <div className="h-auto w-auto text-white mb-4 text-[20px]">
            {t("Amount to pay")} :{" "}
          </div>
          <div className="text-white/70 flex items-center gap-x-2">
            <div
              className="flex items-center hover:bg-[#ffffff2a] cursor-pointer rounded-md px-1"
              onClick={() => handleCopy(paymentData.payAmount)}
            >
              {Number(paymentData.payAmount)} {paymentData.payCurrency} &nbsp;{" "}
              <div className="transition-colors duration-300 text-sm">
                {copyLoading !== paymentData.payAmount ? (
                  <Copy className="text-white size-5" />
                ) : (
                  <Check className="text-green-500 size-5" />
                )}
              </div>
            </div>

            <span className="text-sm">
              ({paymentData.amount} {paymentData.currency})
            </span>
          </div>
          <div className="text-secondary">
            ({t("Sending less may result in fund loss")})
          </div>
          <div className="mt-4">
            {t("Send")}{" "}
            <span className="text-secondary">{paymentData.payCurrency}</span>{" "}
            <span className="text-sm text-secondary bg-secondary bg-opacity-30 px-1 rounded-md">
              {paymentData.network}
            </span>{" "}
            {t("to this address")}
          </div>
          <div
            className="text-white/70 mt-2 break-all w-full flex items-center hover:bg-[#ffffff2a] cursor-pointer rounded-md px-1 gap-x-2"
            onClick={() => handleCopy(paymentData.address)}
          >
            {paymentData.address}
            {copyLoading !== paymentData.address ? (
              <Copy className="text-white size-5" />
            ) : (
              <Check className="text-green-500 size-5" />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <img src={paymentData.QRCode} className="w-[200px] h-[200px]" />
        </div>

        <div className="flex justify-center mt-4">
          <div className="text-white">
            {t("Payment Status:")} {" "}
            <span
              className={`${
                paymentStatus === "Paid" ? "text-secondary" : "text-yellow-500"
              }`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>
        {paymentStatus === "Paid" && (
          <div className="login-button">
            <button
              className="input flex justify-center"
              onClick={() => {
                navigate("/user/dashboard");
                toast.info(t("It may take a minute to create a new account"));
              }}
            >
              {t("Return to dashboard")}
            </button>
          </div>
        )}

        <div className="texture" />
      </form>
    </div>
  );
};

export default Oxapay2;
