import { useAtom } from "jotai";

import { featureSectionAtom, isAuthenticatedAtom } from "@/store/atoms.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "@/app/store.js";
import { useTranslation } from "react-i18next";
import { scrollToFeatureSectionFunction } from "@/utils/scrollToFeatureSectionFunction.js";
import heroSectionBgDark from "/src/assets/HeroSection/hero-section-bg-dark.webp";
import heroSectionBgLight from "/src/assets/HeroSection/hero-section-bg-light.webp";
import heroSectionBgDarkMobile from "/src/assets/HeroSection/hero-section-bg-dark-mobile.webp";
import heroSectionBgLightMobile from "/src/assets/HeroSection/hero-section-bg-light-mobile.webp";
import GeneralButtonWithCss from "./GeneralButtonWithCss.js";
import CarouselButton from "../heroSection/CarouselButton.js";

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const [featureSectionRef] = useAtom(featureSectionAtom);

  return (
    <div className="relative w-full overflow-hidden dark:bg-black h-[900px] dark:text-white bg-white text-black">
      {/* Preload links for immediate loading */}
      <link rel="preload" as="image" href={heroSectionBgDark} />
      <link rel="preload" as="image" href={heroSectionBgLight} />
      <link rel="preload" as="image" href={heroSectionBgDarkMobile} />
      <link rel="preload" as="image" href={heroSectionBgLightMobile} />
      <div className="relative h-full w-full flex items-end">
        <div className=" md:ml-auto w-full md:w-auto h-full ">
          <img
            src={heroSectionBgDark}
            alt="HeroSectionBackground"
            className="hidden dark:md:block w-full h-full object-cover sm:object-[20%_50%] [mask-image:linear-gradient(to_right,transparent,black_15%)]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          <img
            src={heroSectionBgLight}
            alt="HeroSectionBackground"
            className="hidden md:dark:hidden md:block sm:object-[20%_50%] w-full h-full object-cover [mask-image:linear-gradient(to_right,transparent,black_15%)]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          <img
            src={heroSectionBgDarkMobile}
            alt="HeroSectionBackgroundMobile"
            className="dark:block hidden object-[0%_80%] md:hidden w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <img
            src={heroSectionBgLightMobile}
            alt="HeroSectionBackgroundMobile"
            className="block dark:hidden object-[0%_80%] md:hidden w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="absolute  h-full flex w-full z-10">
          {/* Main Heading */}
          <div className="flex md:w-[50%] 2k:w-[70%] items-start md:items-center p-3 sm:pl-[8%] h-full">
            <div
              className="flex mb-12 w-full animate-fade-in-up  mt-6 sm:mt-0 gap-20 max-sm:flex-col relative 2k:gap-32"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-full max-lg:mx-auto z-10 ">
                <div className="relative mb-5 sm:mb-8 2k:mb-16">
                  {/* subtitle The lading prop firm */}
                  <div className="w-fit h-auto p-[1.5px] dark:bg-gradient-to-r dark:from-[#1CCDE6] dark:to-[#DBD633] flex justify-center items-center">
                    <div className="w-fit dark:bg-[#1D2220] px-3 dark:bg-none dark:text-dark bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] p-1 flex items-center justify-center">
                      <span className="bg-clip-text text-[12px] sm:text-[13px] xl:text-[16px] 2k:text-[24px] text-black dark:text-transparent font-messina font-bold dark:bg-gradient-to-l dark:from-[#20CDE2] dark:to-[#D7D536]">
                        {t("The Leading Prop Trading Firm")}
                      </span>
                    </div>
                  </div>
                </div>

                <h1 className="w-full text-[32px] md:text-[40px] xl:text-[48px] 2k:text-[72px] 2k:tracking-normal leading-tight sm:leading-none tracking-normal font-bold animate-gradient-x mb-5 sm:mb-10 2k:mb-16">
                  {t("Empowering Ambitious")} <br />
                  {t("Traders to Succeed")}
                </h1>

                <div className="w-full flex justify-start h-auto">
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

                <div className="flex w-full space-x-7 md:space-x-9 lg:space-x-24 2k:space-x-36  text-[16px] md:text-[19px] 2k:text-[35px] justify-start mt-8 sm:mt-10 2k:mt-16">
                  {/* <CheckBoxCarousel checkBoxData={checkBoxData} /> */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("Up to $1M in capital")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("Backed by a Broker")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("90% Profit Split")}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("Instant Funding")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("24 hours payout")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CarouselButton />
                      <span>{t("100% Refund")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stats Grid */}
        </div>
      </div>
    </div>
  );
}
