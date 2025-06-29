import DiscordCard from "../model/DiscordCard";
import Subscribe from "../model/Subscribe";
import { useTranslation } from "react-i18next";

export default function FinalSubscribe() {
  const { t } = useTranslation();

  return (
    <div className="relative h-auto w-full mt-20 mb-0">
      <div className="relative px-auto mx-5 h-auto">
        {/* Main Heading */}
        <div className="max-w-7xl flex justify-center mx-auto h-auto py-20">
          <div
            className="flex w-full animate-fade-in-up gap-20 max-md:flex-col relative h-auto"
            style={{ animationDelay: "200ms" }}
          >
            <div className="lg:w-2/3 w-full max-lg:mx-auto z-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-2 tracking-tight leading-tight">
                {t("Subscribe to")}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary text-nowrap mb-10">
                {t("Our Newsletter")}
              </h1>
              <div className="flex gap-5 mb-10">
                <div className="glass-panel rounded-xl p-4 text-center">
                  <div className="text-xl text-white">
                    {t("Be the first to hear latest updates")}
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-4 text-center">
                  <div className="text-xl text-white">
                    {t("Receive exclusive discounts & promotions")}
                  </div>
                </div>
              </div>
                <Subscribe />
            </div>
            <div className="flex justify-center items-center w-auto">
              <DiscordCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
