import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/landing/FeaturesSection";
import pricingLight from "../assets/Pricing/pricing_light.webp";
import pricingSM from "../assets/Pricing/pricing_sm.webp";

export default function Pricing() {
  const { t } = useTranslation();
  const [pricingUrl, setPricingUrl] = useState(pricingLight);

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (window.innerWidth < 640) {
        // Use smaller image for screens smaller than 'sm' (640px)
        setPricingUrl(pricingSM);
      } else {
        // Use default image for larger screens
        setPricingUrl(pricingLight);
      }
    };

    // Initial check
    updateBackgroundImage();

    // Add event listener for window resize
    window.addEventListener("resize", updateBackgroundImage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateBackgroundImage);
  }, []);

  return (
    <>
      <div
        className={`bg-cover bg-center sm:h-[440px] h-[100vw] flex flex-col justify-center items-center dark:bg-black bg-white dark:text-white text-black`}
        style={{
          backgroundImage: `url(${pricingUrl})`,
        }}
      >
        <h3 className="relative z-10 sm:text-5xl text-4xl font-bold mb-3">
          {t("Our Pricing")}
        </h3>
        <p className="relative z-10 text-[18px] sm:w-[640px] w-full px-3 text-center">
          {t(
            "Choose from flexible plans designed for traders at every level. Transparent pricing with no hidden fees—start trading with confidence today."
          )}
        </p>
      </div>
      <FeaturesSection />
      <Footer />
    </>
  );
}
