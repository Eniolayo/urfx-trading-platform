import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { featureSectionAtom, isAuthenticatedAtom } from "@/store/atoms";
import { useTranslation } from "react-i18next";
import { scrollToFeatureSectionFunction } from "@/utils/scrollToFeatureSectionFunction";
import GeneralButtonWithCss from "./GeneralButtonWithCss";
import { useSelector } from "@/app/store";

export default function JoinOurTeamSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  const metaAccounts = useSelector((state: any) => state.metaAccount.accounts);
  const [featureSectionRef] = useAtom(featureSectionAtom);

  return (
    <div className="relative w-full dark:bg-black dark:bg-gradient-to-b from-transparent to-[FFFFFF0D] dark:text-white bg-white text-black">
      <div className="text-center w-full">
        <div className="space-y-[-10px]">
          <h1 className="text-[32px] sm:text-[48px] lg:text-5xl 2k:text-[72px] 2k:leading-[90px] font-bold bg-clip-text animate-gradient-x mb-0 max-sm:px-10">
            {" "}
            {t("Join our Team of Experienced Traders")}
          </h1>{" "}
        </div>

        <div className="text-[14px] sm:text-[18px] 2k:text-[28px] opacity-50 dark:text-white w-full flex justify-center mt-5 2k:mt-10">
          <div className="lg:max-w-5xl 2k:max-w-[1700px] mx-5 w-full">
            {t(
              "Traders can take their trading to the next level by refining their skills and strategies, setting themselves up for success in the competitive financial markets. By doing so, they can embark on their journey to become funded prop traders, unlocking new opportunities and challenges that come with professional trading careers."
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-10 mb-24 2k:my-20 2k:mb-32 h-auto">
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
          className="text-[14px] sm:text-[15px] md:text-[18px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[162px] md:h-[56px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
          bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
        >
          {t("Start Challenge")}
        </GeneralButtonWithCss>
      </div>
    </div>
  );
}
