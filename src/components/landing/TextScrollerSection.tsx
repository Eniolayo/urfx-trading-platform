import { useTranslation } from "react-i18next";
import logo from "/src/assets/TextScrollSection/logo.png";

export default function TextScrollerSection() {
  const { t } = useTranslation();
  return (
    <div
      className="relative mt-4 2k:mt-16 border-y-2 dark:bg-gradient-to-r dark:from-[#1CCDE6] dark:to-[#DCD734] bg-gradient-to-r from-[#1CCDE6] to-[#DBD633] border-transparent bg-clip-border dark:text-white text-black"
    >
      <div className="inset-0 flex py-2 2k:py-4 items-center mx-auto dark:bg-gradient-to-r dark:from-[#10454A] dark:via-[#364728] dark:to-[#494815]">
        <div
          x-data="{}"
          x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
          className="w-full inline-flex flex-nowrap overflow-hidden"
        >
          <ul
            x-ref="logos"
            className=" flex items-center justify-center md:justify-start [&_li]:ml-0 [&_img]:max-w-none animate-infinite-scroll text-[35px] sm:text-[40px] 2k:text-[45px] mr-0 "
          >
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full  object-cover"/></span><span>{t("First Withdrawal On Demand")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("Unlimited Days")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("Up to 90% Performance Split")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span> <span>{t("EAs Allowed")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("100% Refund")}</span></li>
          </ul>
         <ul
            x-ref="logos"
            className="flex items-center justify-center md:justify-start [&_li]:ml-0 [&_img]:max-w-none animate-infinite-scroll text-[35px] sm:text-[40px] 2k:text-[45px] mr-0 "
          >
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("First Withdrawal On Demand")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("Unlimited Days")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("Up to 90% Performance Split")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span> <span>{t("EAs Allowed")}</span></li>
            <li className="text-nowrap flex flex-row items-center "><span className="size-[30px] sm:size-[50px] 2k:size-[58px] rounded-md flex justify-center items-center  mx-32"><img src={logo} alt="logo" className="w-full h-full object-cover"/></span><span>{t("100% Refund")}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
