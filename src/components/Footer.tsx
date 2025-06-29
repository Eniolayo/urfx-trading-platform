import React, { useState } from "react";
import { env } from "@/config/env";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/store/atoms";
import urfxLogoDark from "/src/assets/Navbar/light-logo.png";
import GeneralButtonWithCss from "./landing/GeneralButtonWithCss";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const theme = useAtomValue(themeAtom);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail("");
  };

  const quickLinkData = [
    t("Home"),
    t("Testimonials"),
    t("About Us"),
    t("FAQ"),
    t("Contact Us"),
    t("Trading Rules"),
  ];

  const legalData = [
    t("Terms & Conditions"),
    t("Privacy Policy"),
    t("Disclaimer"),
  ];

  return (
    <footer className="w-full h-auto bg-white dark:bg-black text-black dark:text-white flex flex-col items-center">
      <div className="relative w-full pb-[50px] 2k:pb-[100px] pt-[20px] sm:pt-32 2k:pt-48 sm:px-[6.94vw] rounded-t-2xl overflow-hidden text-[28px] sm:text-[40px] 2k:text-[64px] font-bold">
        <div className="max-sm:mb-[165px] max-lg:mb-[285px]">
          <h5 className="text-[24px] sm:text-[40px] 2k:text-[64px] font-bold sm:w-[600px] 2k:w-[920px] mb-[20px] lg:mb-[30px] 2k:mb-[50px] max-lg:text-center max-sm:max-w-[400px] max-lg:max-w-[600px] max-lg:mx-auto">
            {t("We're bringing the best and brightest traders together.")}
          </h5>
          <div
            className="cursor-pointer flex max-lg:justify-center max-sm:w-full"
            onClick={() => window.open(env.DISCORD_COMMUNITY, "_blank")}
          >
            <GeneralButtonWithCss
              onClick={() => {}}
              blur={true}
              className="text-[14px] sm:text-[20px] w-[138px] h-[37px] sm:w-[179px] sm:h-[56px] 2k:w-[250px] 2k:h-[64px] 2k:text-[27px] font-normal"
              bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
            >
              {t("Join Community")}
            </GeneralButtonWithCss>
          </div>
        </div>
        <img
          src={
            theme === "light"
              ? "/image/discord_symbol.svg"
              : "/image/discord_symbol_dark.svg"
          }
          alt="URFX Logo"
          className="absolute w-[400px] sm:w-[640px] lg:w-[640px] 2k:w-[1000px] max-w-[400px] sm:max-w-[640px] lg:max-w-[840px] 2k:max-w-[1000px] object-cover right-0 bottom-0 translate-y-[108px] sm:translate-y-[172px] lg:translate-y-[172px] 2k:translate-y-[270px] translate-x-[75px] sm:translate-x-[105px] lg:-translate-x-[4vw]"
        />
      </div>

      {/* Main Footer Content */}
      <div
        className="w-full flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap max-sm:gap-5 sm:gap-y-10 justify-between sm:px-[6.94vw] sm:py-[50px] p-4 text-black"
        style={{
          background:
            "linear-gradient(-90deg, #DBD633 0%, #9ED473 50%, #1CCDE6 100%)",
        }}
      >
        {/* Company Info */}
        <div className="flex flex-col sm:justify-between">
          <div className="flex flex-col items-start">
            <img
              src={urfxLogoDark}
              alt="URFX Logo"
              className="h-[32px] sm:h-[41px] object-contain mb-4 sm:mb-[35px]"
            />
            <div className="text-[18px] sm:text-[18px] 2k:text-[27px] font-[400]">
              URFX Global Trading Inc.
              <br /> {t("Registered in Vancouver, Canada")}
            </div>
          </div>
          <div className="flex flex-row sm:flex-col gap-3 max-sm:justify-start max-sm:items-center mt-5 text-[14px] sm:text-[14px] 2k:text-[24px] font-[400]">
            <div className="flex items-center gap-2">
              <img src="/image/mail-footer.svg" className="size-5 2k:size-10" />
              <a
                href="mailto:support@urfx.io"
                className="hover:underline transition-colors"
              >
                support@urfx.io
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/image/phone-footer.svg"
                className="size-5 2k:size-10"
              />
              <a
                href="tel:+15551234567"
                className="hover:underline transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex sm:gap-x-8 lg:gap-x-10">
          {/* Navigation Links */}
          <div className="w-full">
            <h3 className="text-[18px] sm:text-[22px] font-[600] my-2">{t("Quick Links")}</h3>
            <ul className="space-y-2 sm:space-y-4 text-[16px]">
              {quickLinkData.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full">
            <h3 className="font-[600] text-[18px] sm:text-[22px] my-2">{t("Legal")}</h3>
            <ul className="space-y-2 sm:space-y-4 text-[16px]">
              {legalData.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline transition-colors whitespace-nowrap"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="sm:w-full lg:w-1/3">
          <h3 className="font-[600] text-[28px] sm:text-[40px] tracking-[-0.03em] my-3 w-[250px] sm:w-full lg:w-[450px]">
            {t("Subscribe to our Newsletter")}
          </h3>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Enter your email")}
                className="w-full sm:text-[20px] px-4 py-4 #111111 focus:outline-none placeholder:text-[#111111] sm:max-w-[700px] block"
                style={{
                  background:
                    "linear-gradient(to bottom, #FFFFFF1A 0%, #1111110D 100%)",
                }}
                required
              />
              <button
                type="submit"
                className=" text-black text-[16px] font-bold hover:underline cursor-pointer bg-white border-black p-[16px] border-2 transition-colors mt-[10px] sm:mt-[20px]"
              >
                {t("Submit")}
              </button>
              <div className="sm:hidden mt-[30px] mb-[14px]">
                © {t("URFX Global Trading Inc.")}
              </div>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
