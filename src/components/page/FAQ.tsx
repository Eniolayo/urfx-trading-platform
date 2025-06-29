import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { env } from "@/config/env";
import { formatPhoneNumber } from "@/utils/format";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import faqHeaderBgPoint from "/src/assets/FAQ/faq-header-bg-point.svg";
import buttonBgLight from "/src/assets/FAQ/button-bg-light.webp";
import buttonBgDark from "/src/assets/FAQ/button-bg-dark.webp";
import { themeAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import categoryButtonDark from "/src/assets/FAQ/category-button-dark.svg";
import categoryButtonLight from "/src/assets/FAQ/category-button-light.svg";
import instantHelpBgDark from "/src/assets/FAQ/instant-help-bg-dark.webp";
import instantHelpBgLight from "/src/assets/FAQ/instant-help-bg-light.webp";
import GeneralButton from "../landing/GeneralButton";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const faqCategory = [
    {
      category: t("All FAQs"),
    },
    {
      category: t("General"),
    },
    {
      category: t("Getting Started"),
    },
    {
      category: t("Platform"),
    },
    {
      category: t("Rules"),
    },
  ];
  const faqData = [
    {
      id: 1,
      question: t("What is URFX?"),
      answer: t(
        "URFX is a proprietary trading firm that empowers skilled traders by providing them with the capital and resources needed to trade effectively. We offer various funding options and support to help traders succeed in the financial markets."
      ),
      category:"General"
    },
    {
      id: 2,
      question: t("How do I become a funded trader with URFX?"),
      answer: t(
        "To become a funded trader with URFX, you need to successfully complete our evaluation process, which assesses your trading skills and risk management abilities. Upon passing, you’ll receive a funded account to trade with."
      ),
      category:"Getting Started"
    },
    {
      id: 3,
      question: t("What are the account sizes available?"),
      answer: t(
        "We offer multiple account sizes to cater to different trading preferences. Specific details about each account size and their respective requirements can be found on our Programs page."
      ),
      category:"General"
    },
    {
      id: 4,
      question: t("Is there a fee to participate in the evaluation?"),
      answer: t(
        "Yes, there is a one-time fee to participate in our evaluation process. This fee covers the administrative costs of assessing your trading performance and is fully refundable upon achieving specific milestones in your funded account."
      ),
      category:"Rules"
    },
    {
      id: 5,
      question: t("What platforms can I use to trade?"),
      answer: t(
        "URFX supports trading on popular platforms such as MetaTrader 4 (MT4) and MetaTrader 5 (MT5), available on desktop, web, and mobile versions for your convenience."
      ),
      category:"Platform"
    },
    {
      id: 6,
      question: t(
        "Can I use Expert Advisors (EAs) or automated trading strategies?"
      ),
      answer: t(
        "Yes, the use of Expert Advisors (EAs) and automated trading strategies is permitted, provided they adhere to our trading rules and do not exploit platform inefficiencies."
      ),
      category:"Rules"
    },
    {
      id: 7,
      question: t("What are the profit-sharing arrangements?"),
      answer: t(
        "Our traders receive a competitive profit split, allowing them to retain a significant portion of the profits they generate. Detailed information on profit-sharing ratios is available on our Programs page."
      ),
      category:"General"
    },
    {
      id: 8,
      question: t("How are payouts processed?"),
      answer: t(
        "Payouts are processed upon request. Traders can request their share of profits through our dashboard, and payments are typically processed within a specified timeframe. More details can be found in our Payout Policy."
      ),
      category:"Getting Started"
    },
    {
      id: 9,
      question: t("Are there any trading restrictions?"),
      answer: t(
        "Traders are expected to adhere to our risk management rules, including maximum daily loss limits and overall drawdown limits. Specific details are outlined in our Trading Rules section."
      ),
      category:"Rules"
    },
    {
      id: 10,
      question: t("Can I hold trades overnight or over the weekend?"),
      answer: t(
        "Yes, traders are allowed to hold positions overnight and over weekends. However, it’s essential to be aware of potential market gaps and increased volatility during these periods."
      ),
      category:"Rules"
    },
    {
      id: 11,
      question: t("Is news trading allowed?"),
      answer: t(
        "Yes, trading during news events is permitted. Traders should exercise caution during high-impact news releases due to potential market volatility."
      ),
      category:"Rules"
    },
    {
      id: 12,
      question: t("How is the daily loss limit calculated?"),
      answer: t(
        "The daily loss limit is calculated based on a percentage of your account balance or equity. Detailed calculations and examples are provided in our Risk Management Guidelines."
      ),
      category:"Rules"
    },
    {
      id: 13,
      question: t("What happens if I violate a trading rule?"),
      answer: t(
        "Violating trading rules may result in the termination of your funded account. It’s crucial to familiarize yourself with all trading rules to maintain your account status."
      ),
      category:"Rules"
    },
    {
      id: 14,
      question: t("Can I trade multiple accounts simultaneously?"),
      answer: t(
        "Yes, traders can manage multiple accounts, provided they comply with our account management policies. Specific guidelines are available in our Multiple Accounts Policy."
      ),
      category:"Platform"
    },
    {
      id: 15,
      question: t("Are there any restrictions on trading instruments?"),
      answer: t(
        "Traders have access to a wide range of instruments, including forex pairs, commodities, indices, and cryptocurrencies. A comprehensive list is available on our Trading Instruments page."
      ),
      category:"Rules"
    },
    {
      id: 16,
      question: t("How do I request a payout?"),
      answer: t(
        "Payouts can be requested through the trader dashboard. Detailed instructions are provided in our Payout Request Guide."
      ),
      category:"General"
    },
    {
      id: 17,
      question: t("What support channels are available?"),
      answer: (
        <>
          {t("URFX offers multiple support channels, including:")}
          <ul>
            <li>
              <strong>- Email</strong>:{" "}
              <a href={`mailto:${env.ADMIN_EMAIL}`} className="underline">
                {env.ADMIN_EMAIL}
              </a>
            </li>
            <li>
              <strong>- {t("Phone")}</strong>:{" "}
              <a
                href={`tel:${env.PHONE_NUMBER}`}
                target="_blank"
                className="underline"
              >
                ${formatPhoneNumber(env.PHONE_NUMBER)}
              </a>
            </li>
            <li>
              <strong>- Telegram</strong>:{" "}
              <a
                href={env.TELEGRAM_COMMUNITY}
                target="_blank"
                className="underline"
              >
                {t("Join Telegram Group")}
              </a>
            </li>
            <li>
              <strong>- Discord</strong>:{" "}
              <a
                href={env.DISCORD_COMMUNITY}
                target="_blank"
                className="underline"
              >
                {t("Join URFX Discord")}
              </a>
            </li>
          </ul>{" "}
        </>
      ),
      category:"General"
    },
    {
      id: 18,
      question: t("How can I track my trading performance?"),
      answer: t(
        "Our trader dashboard provides comprehensive analytics and performance metrics to help you monitor and improve your trading strategies."
      ),
      category:"General"
    },
    {
      id: 19,
      question: t("Is there a minimum trading day requirement?"),
      answer: t(
        "Yes, traders are required to trade a minimum number of days during the evaluation phase. Specific details are outlined in our Evaluation Guidelines."
      ),
      category:"Rules"
    },
    {
      id: 20,
      question: t("How do I get started with URFX?"),
      answer: t(
        "To get started, visit our Sign-Up Page, choose your preferred evaluation program, and follow the registration process. Our support team is available to assist you throughout your journey with URFX."
      ),
      category:"Getting Started"
    },
  ];
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // const faqSection = document.getElementById("faqSection");
    // if (faqSection) {
    //   faqSection.scrollIntoView({ behavior: "smooth" });
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

  const [buttonBg, setButtonBg] = useState<string>();
  const [categoryButtonBg, setCategoryButtonBg] = useState<string>();
  const themeAtomValue = useAtomValue(themeAtom);
  const [selectedCategory, setSelectedCategory] = useState<string>("All FAQs");
  const [instantHelpBg, setInstantHelpBg] = useState<string>();

  useEffect(() => {
    setButtonBg(themeAtomValue === "dark" ? buttonBgDark : buttonBgLight);
    setCategoryButtonBg(themeAtomValue === "dark"? categoryButtonDark : categoryButtonLight);
    setInstantHelpBg(themeAtomValue === "dark" ? instantHelpBgDark : instantHelpBgLight);
  });

  return (
    <div
      className="relative h-full w-full dark:bg-dark dark:text-white bg-white text-dark"
      id="faqSection"
    >
      <div className="">
        <div className="w-full">
          {/* Header Background */}
          <div className="relative">
            <img src={faqHeaderBgPoint} alt="BackgroundPoint" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="w-fit h-fit">
                <p className="font-bold text-[48px]">
                  {t("Frequently Asked Questions")}
                </p>
                <div className="text-[18px]">
                  {t(
                    "Welcome to the URFX FAQ section. Here, we’ve compiled answers to the most"
                  )}{" "}
                  <br />{" "}
                  {t(
                    "common questions about our platform, trading rules and account management."
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full p-36  space-x-12">
            {/* category button section */}
            <div className="w-1/3 flex flex-col justify-between space-y-10">
              <div className="flex flex-col space-y-6">
                {faqCategory.map((ctg) => (
                  <button className="relative flex justify-center items-center hover:scale-[1.01] " onClick={()=> {setSelectedCategory(ctg.category); console.log("selected cate=====>", selectedCategory)}}>
                    <img
                      src={categoryButtonBg}
                      alt="ButtonBackground"
                      className="w-full h-full"
                    />
                    <div className="absolute flex justify-center items-center inset-0 w-full h-full">
                      <div className="w-fit h-fit font-bold text-[24px]">{ctg.category}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative h-[246px] w-full">
                <img src={instantHelpBg} alt="InstantHelpBackground" className="w-full  h-full"/>
                <div className="absolute inset-0 w-full h-full flex flex-col justify-evenly p-4">
                  <p className="font-bold text-[28px]">{t("Do you still need help?")}</p>
                  <div className="text-[18px]">{t("Everything you need to know about our platform, evaluations and how to set up your FundedForex account.")}</div>
                  <button onClick={()=> navigate("/contact-us")}><GeneralButton inputText="Contact Us"/></button>
                </div>
              </div>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-8 w-2/3 transform transition-all duration-300">
              {faqData.map((faq, index) => (
                (faq.category === selectedCategory || selectedCategory === "All FAQs") ? (
                <section
                  key={faq.id}
                  ref={(el) => {
                    sectionsRef.current[index] = el;
                  }}
                  className="relative space-y-0 section-reveal bg-black bg-opacity-50 transform hover:scale-[1.01] transition-all duration-300"
                >
                  {/* content section */}
                  <div className="relative w-full h-full">
                    <img
                      src={buttonBg}
                      alt="BackgroundImage"
                      className="absolute -z-10 inset-0 w-full h-full"
                    />

                    <button
                      onClick={() =>
                        setActiveId(activeId === faq.id ? null : faq.id)
                      }
                      className="w-full h-full flex items-center justify-between text-left p-7"
                    >
                      <h2 className="text-2xl font-semibold">
                        {faq.question}
                      </h2>
                      <ChevronDown
                        className={`h-6 w-6 text-gray-400 transition-transform duration-500 ${
                          activeId === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        activeId === faq.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-300 leading-relaxed p-7 pt-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </section>) : ""
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
