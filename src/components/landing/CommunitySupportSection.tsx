import { useTranslation } from "react-i18next";
import headphones from "/src/assets/CommunitySupport/headphones.png";
import headphonesmobile from "/src/assets/CommunitySupport/headphonesmobile.png";
import rewards from "/src/assets/CommunitySupport/rewards.png";
import clock from "/src/assets/CommunitySupport/clock.png";
import earth from "/src/assets/CommunitySupport/earth.png";
import trader from "/src/assets/CommunitySupport/trader.png";
import GeneralButtonWithCss from "./GeneralButtonWithCss";
import { scrollToFeatureSectionFunction } from "@/utils/scrollToFeatureSectionFunction";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { featureSectionAtom, isAuthenticatedAtom } from "@/store/atoms";
import { useSelector } from "@/app/store";

const CommunitySupportSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  const metaAccounts = useSelector((state: any) => state.metaAccount.accounts);
  const [featureSectionRef] = useAtom(featureSectionAtom);

  return (
    <div className="relative w-full h-auto p-8 pt-0 px-0 flex flex-col items-center justify-center dark:bg-black bg-white">
      <div className="relative w-full h-auto text-center text-[20px] sm:text-[35px] 2k:text-[45px] font-bold tracking-[-0.03em] mt-0 mb-9 dark:text-[#CDCDCD] text-black">
        {t("URFX COMMUNITY AND SUPPORT")}
      </div>

      <div className="relative flex flex-col space-y-5 lg:space-y-0 lg:flex-row justify-center items-center space-x-0 lg:space-x-5  h-full w-full  dark:text-white text-black px-16">
        <div className="flex flex-col relative w-fit h-full gap-5">
          <div className="flex flex-col space-y-5">
            <div className="flex w-full space-x-5 2k:space-x-9 ">
              <div
                className="relative dark:bg-[#191919] dark:bg-none bg-gradient-to-r from-[#9EE4EE] via-[#D0E7C3] to-[#EAE8A7] 
                              w-[171px] h-[174px] sm:w-[360px] sm:h-[214px] 2k:w-[490px] 2k:h-[292px] flex justify-end items-start"
              >
                <div className="relative w-fit h-fit">
                  <img
                    src={rewards}
                    alt="TotalRewardImage"
                    className="w-[114px] h-[111px] sm:w-[170px] sm:h-[165px] 2k:w-[250px] 2k:h-[239px]"
                  />
                  <span className="absolute top-0 right-0 bg-[#1F8BEA] rounded-2xl w-full h-full border border-secondary blur-2xl opacity-15"></span>
                </div>

                <div className="absolute flex flex-col items-start leading-3 sm:leading-8 2k:leading-10 justify-end inset-0 w-full h-full p-4 sm:p-6 2k:p-8">
                  <span className="w-full font-bold font-creato text-[24px] sm:text-[55px] 2k:text-[75px] tracking-[-0.03em] 2k:tracking-normal">
                    105M+
                  </span>{" "}
                  <br />{" "}
                  <span className="w-full font-creato text-[14px] sm:text-[20px] 2k:text-[28px] dark:opacity-50">
                    {t("Total Rewards")}
                  </span>
                </div>
              </div>

              <div
                className="relative dark:bg-[#191919] dark:bg-none bg-gradient-to-r from-[#9EE4EE] via-[#D0E7C3] to-[#EAE8A7] 
                              w-[171px] h-[174px] sm:w-[360px] sm:h-[214px] 2k:w-[490px] 2k:h-[292px] flex justify-end items-start"
              >
                <div className="relative w-fit h-fit">
                  <span className="absolute top-0 right-0 bg-[#1F8BEA] rounded-2xl w-full h-full border border-secondary blur-2xl opacity-15"></span>
                  <img
                    src={trader}
                    alt="countryBgImage"
                    className="w-[114px] h-[111px] sm:w-[170px] sm:h-[165px] 2k:w-[250px] 2k:h-[239px]"
                  />
                </div>

                <div className="absolute flex flex-col items-start leading-3 sm:leading-8 2k:leading-10 justify-end inset-0 w-full h-full p-4 sm:p-6 2k:p-8">
                  <span className="w-full font-bold font-creato text-[24px] sm:text-[55px] 2k:text-[75px] tracking-[-0.03em] 2k:tracking-normal">
                    97K+
                  </span>{" "}
                  <br />{" "}
                  <span className="w-full font-creato text-[14px] sm:text-[20px] 2k:text-[28px] dark:opacity-50">
                    {t("Traders")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full space-x-5 2k:space-x-9">
              <div
                className="relative dark:bg-[#191919] dark:bg-none bg-gradient-to-r from-[#9EE4EE] via-[#D0E7C3] to-[#EAE8A7] 
                              w-[171px] h-[174px] sm:w-[360px] sm:h-[214px] 2k:w-[490px] 2k:h-[292px] flex justify-end items-start"
              >
                <div className="relative w-fit h-fit">
                  <span className="absolute top-0 right-0 bg-[#1F8BEA] rounded-2xl w-full h-full border border-secondary blur-2xl opacity-15"></span>
                  <img
                    src={clock}
                    alt="rewardsTimeBgImage"
                    className="w-[114px] h-[111px] sm:w-[170px] sm:h-[165px] 2k:w-[250px] 2k:h-[239px]"
                  />
                </div>
                <div className="absolute flex flex-col items-start leading-3 sm:leading-8 2k:leading-10 justify-end inset-0 w-full h-full p-4 sm:p-6 2k:p-8">
                  <span className="w-full font-bold font-creato text-[24px] sm:text-[55px] 2k:text-[75px] tracking-[-0.03em] 2k:tracking-normal">
                    5hrs
                  </span>{" "}
                  <br />{" "}
                  <span className="w-full font-creato text-[14px] sm:text-[20px] 2k:text-[28px] dark:opacity-50">
                    {t("Avg.Rewards Time")}
                  </span>
                </div>
              </div>

              <div
                className="relative dark:bg-[#191919] dark:bg-none bg-gradient-to-r from-[#9EE4EE] via-[#D0E7C3] to-[#EAE8A7] 
                              w-[171px] h-[174px] sm:w-[360px] sm:h-[214px] 2k:w-[490px] 2k:h-[292px] flex justify-end items-start"
              >
                <div className="relative w-fit h-fit">
                  <span className="absolute top-0 right-0 bg-[#1F8BEA] rounded-2xl w-full h-full border border-secondary blur-2xl opacity-15"></span>
                  <img
                    src={earth}
                    alt="tradersBgImage"
                    className="w-[114px] h-[111px] sm:w-[170px] sm:h-[165px] 2k:w-[250px] 2k:h-[239px]"
                  />
                </div>
                <div className="absolute flex flex-col items-start leading-3 sm:leading-8 2k:leading-10 justify-end inset-0 w-full h-full p-4 sm:p-6 2k:p-8">
                  <span className="w-full font-bold font-creato text-[24px] sm:text-[55px] 2k:text-[75px] tracking-[-0.03em] 2k:tracking-normal">
                    170+
                  </span>{" "}
                  <br />{" "}
                  <span className="w-full font-creato text-[14px] sm:text-[20px] 2k:text-[28px] dark:opacity-50">
                    {t("Countries")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-end justify-center sm:items-center sm:justify-end w-[361px] h-[372px] sm:w-[740px] sm:h-[448px] 2k:w-[1016px] 2k:h-[604px] ml-11 bg-gradient-to-r from-[#DAD633] via-[#A4D46D] to-[#1ECDE5]">
          <div className="relative w-fit h-fit">
            <span className="absolute top-0 right-0 bg-[#1F8BEA] rounded-2xl w-full h-full border border-secondary blur-2xl opacity-15"></span>
            <img
              src={headphones}
              alt="headphones"
              className="hidden sm:block -ml-24 sm:ml-0 w-[256px] sm:w-[353px] h-[240px] sm:w-[343px] sm:h-[321px] 2k:w-[800px] 2k:h-[500px] sm:-mb-[100px]"
            />
            <img
              src={headphonesmobile}
              alt="headphones"
              className="block sm:hidden w-[256px] sm:w-[353px] h-[240px] sm:w-[343px] sm:h-[321px] 2k:w-[800px] 2k:h-[500px] sm:-mb-[100px]"
            />
          </div>

          <div className="absolute inset-0 p-5 2k:p-10 space-y-5">
            <span className="text-[14px] sm:text-[20px] 2k:text-[30px] text-dark opacity-[30%] font-bold">
              {t("SERVING OVER 1.2M+ MEMBERS")} <br />
            </span>
            <span className="text-black font-bold text-[18px] sm:text-[30px] 2k:text-[50px] font-creato">
              24/7 {t("Pro Support")}
              <br />
            </span>
            <span className="text-[14px] sm:text-[20px] 2k:text-[32px] 2k:leading-10 w-[90%] sm:w-[40%] flex text-wrap text-dark opacity-50 font-creato">
              {t(
                "With a 50-second average response time, we’re a prop trading firm that truly cares about our traders."
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center my-10 h-auto">
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
    </div>
  );
};

export default CommunitySupportSection;
