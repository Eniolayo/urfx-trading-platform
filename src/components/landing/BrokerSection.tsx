import fxtm from "../../assets/fxtmIcon.png";
import {useTranslation} from "react-i18next";



export const BrokerSection = () => {
  const { t } = useTranslation();

  const FXTMData = [
    {
      title: t("RAW or All-In Pricing Feeds"),
      content:
        t("Choose between RAW or All-In pricing feeds depending on your trading strategy."),
    },
    {
      title: t("100+ Trading Instruments"),
      content:
        t("Access a wide range of markets from Stocks, Metals, Indices to FX. We have something for everyone."),
    },
    {
      title: t("Trader-friendly Leverage"),
      content:
         t("Our standard accounts have 30:1 leverage. Traders with a more aggressive trading style can upgrade to 50:1."),
    },
    {
      title: t("Trading Platforms"),
      content:
        t("Select from widely used trading platforms in the market such as DXtrade to conduct your trades."),
    },
  ];

  return (
    <div className="z-50 flex justify-center items-center flex-col mb-10">
      <div className=" flex flex-col justify-center items-center text-center">
        <div className="text-4xl sm:text-5xl lg:text-6xl  font-bold text-white  bg-clip-text text-transparent animate-gradient-x mb-0">
          {t("Everything You’d Expect From a")} <br />
          <span className="text-secondary">{t("Retail Broker")}</span>
          &nbsp; {t("in a Prop Firm")}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-12">
        <div className="glass-panel rounded-xl px-3 py-7 transform lg:w-[30%] transition-all duration-300 flex justify-center items-center max-sm:gap-5 gap-3">
          <div className="hidden md:flex md:absolute -top-6 justify-center items-center w-full h-auto">
            <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <div className="rounded-3xl bg-dark px-4 py-2 text-white font-medium text-center">
                {t("Our Partner Broker")}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-around items-center w-full">
            <div className="flex justify-center items-center w-auto h-[70px] overflow-hidden rounded-2xl ">
              <img
                src={fxtm}
                alt="FXTM Broker ICON"
                className="w-[250px] h-[140px]"
              />
            </div>
            <button className="border-[3px] border-gray-700 px-2 rounded-3xl h-auto md:h-[70px] font-bold text-2xl">
              {t("Visit FXTM")}
            </button>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold">{t("More Options coming soon")}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-[70%] justify-center items-center gap-6 mt-10">
        {FXTMData.map((data) => (
          <div className="border p-6 border-gray-500 rounded-3xl w-full h-full flex flex-col justify-between" key={`FXTM-${data.title}`}>
            <div className="text-3xl font-bold text-secondary mb-2">
              {data.title}
            </div>

            <div className="text-white text-xl">{data.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
