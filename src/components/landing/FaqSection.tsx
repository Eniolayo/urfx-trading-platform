import React, { useState } from "react";
import {
  MessageCircle,
  Bot,
  Shield,
  Zap,
  DollarSign,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import GeneralButtonWithCss from "./GeneralButtonWithCss";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FaqSection() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: t("What happens if you lose money in a Prop Firm?"),
      answer: t(
        "Traders may be subject to risk limits, suspended trading, or even termination if they consistently incur losses beyond the agreed-upon limits."
      ),
      icon: <Bot className="h-5 w-5 text-accent" />,
    },
    {
      id: 2,
      question: t("What are the pros and cons of being a prop trader?"),
      answer: t(
        "Pros include access to capital, training, and potential high profits. Cons include risk of losses, performance pressure, and profit-sharing with the firm."
      ),
      icon: <Shield className="h-5 w-5 text-purple-400" />,
    },
    {
      id: 3,
      question: t("Do prop firms really pay out?"),
      answer: t(
        "Yes, reputable prop firms do pay traders a share of their profits based on agreed-upon terms and performance."
      ),
      icon: <Zap className="h-5 w-5 text-emerald-400" />,
    },
    {
      id: 4,
      question: t("What is a Prop Trading Firm"),
      answer: t(
        "A prop trading firm is a financial company that provides capital to traders (prop traders) to trade the firm's money in financial markets, aiming to generate profits for both the trader and the firm."
      ),
      icon: <MessageCircle className="h-5 w-5 text-accent" />,
    },
    {
      id: 5,
      question: t(
        "Do you charge any other fees other than the initial assessment cost?"
      ),
      answer: t(
        "We do not charge any additional or hidden fees. You are able to customise your 1 phase and 2 phase assessment at the checkout if you wish, which carry a one time charge. The fee covers the challenge and verification (for 2 phase), we do not charge any recurring fees. Your assessment fee will also be reimbursed to you with your first payout on request."
      ),
      icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
    },
  ];

  return (
    <div className="py-[60px] pt-0 2k:pt-0 2k:py-[120px] relative overflow-hidden dark:bg-black bg-white dark:text-white text-black">
      <div className="max-w-7xl 2k:max-w-[1600px] 2k:w-full mx-auto px-5">
        <div className="flex flex-col items-center gap-[30px] sm:gap-[50px] 2k:gap-[80px]">
          {/* Title Section */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[32px] sm:text-[48px] lg:text-5xl 2k:text-[72px] 2k:leading-[90px] font-bold mb-[20px] 2k:mb-[35px] tracking-tight leading-tight text-center">
              {t("Our Most Asked Questions")}
            </h1>

            <p className="text-[14px] sm:text-[18px] 2k:text-[28px] opacity-50 dark:text-white mx-auto w-full sm:w-[60%] 2k:w-[870px] text-center">
              {t(
                "Check out our most frequently asked questions here for helpful insights and answers to common queries about our company and opportunities."
              )}
            </p>
            {/* <div className="flex mt-5">
              <FaqButton />
            </div> */}
          </div>

          <div className="max-w-3xl 2k:max-w-[1600px] mx-auto space-y-[16px] sm:space-y-[24px] 2k:space-y-[40px]">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`relative z-10 ${activeId === faq.id
                  ? "dark:bg-gradient-to-r dark:bg-[#1F1F1F] bg-gradient-to-r from-[#9DE3DD] via-[#D0E8C3] to-[#EAE9A8] dark:from-[#125358] dark:via-[#445F39] dark:to-[#525A22]"
                  : "bg-gradient-to-b from-[#FFFFFF1A] to-[#1111110D]"
                  } group`}
              >
                <button
                  onClick={() =>
                    setActiveId(activeId === faq.id ? null : faq.id)
                  }
                  className="w-full flex gap-x-5 items-start justify-between p-[16px] sm:p-[24px] 2k:p-[40px] text-left z-20"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[18px] sm:text-[24px] 2k:text-[32px]">{faq.question}</span>
                  </div>
                  <Plus
                    className={`size-[24px] 2k:size-[36px] sm:mt-1 2k:mt-2 min-w-[24px]  dark:text-white transition-transform duration-500 ${activeId === faq.id ? "rotate-45" : ""
                      }`}
                  />
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${activeId === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    } overflow-hidden z-20`}
                >
                  <div className="px-[16px] pb-[16px] 2k:px-[40px] 2k:pb-[40px] text-[14px] sm:text-[18px] 2k:text-[27px] dark:text-white opacity-50">
                    {faq.answer}
                  </div>
                </div>
                {activeId === faq.id && (
                  <>
                    {/* Blur */}
                    <span
                      className="absolute inset-0 -z-10 transition-opacity duration-300 pointer-events-none dark:bg-gradient-to-r bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] blur-xl 2k:blur-4xl opacity-50"
                      aria-hidden="true"
                    />
                    {/* Fancy Borders (z-10) */}
                    <span className="group-hover:opacity-100 absolute top-0 left-0 w-[20%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
                    <span className="group-hover:opacity-100 absolute top-0 right-0 w-[20%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
                    <span className="group-hover:opacity-100 absolute bottom-0 right-0 w-[20%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
                    <span className="group-hover:opacity-100 absolute bottom-0 left-0 w-[20%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center my-10 mb-24 2k:my-20 2k:mb-32 h-auto">
        <GeneralButtonWithCss
          blur={true}
          className="text-[14px] sm:text-[15px] md:text-[18px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[220px] md:h-[56px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
          bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
        >
          {t("Got more questions?")}
        </GeneralButtonWithCss>
      </div>

    </div>
  );
}
