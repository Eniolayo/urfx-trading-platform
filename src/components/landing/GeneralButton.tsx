import { themeAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import generalButtonBgDark from "/src/assets/GeneralButton/general-button-bg-dark.webp";
import generalButtonBgLight from "/src/assets/GeneralButton/general-button-bg-light.webp";

const GeneralButton = ({ inputText }: { inputText: string }) => {
  const { t } = useTranslation();
  const themeAtomValue = useAtomValue(themeAtom);
  const [generalButtonBgURL, setGeneralButtonURL] = useState<
    string | undefined
  >();

  useEffect(() => {
    setGeneralButtonURL(
      themeAtomValue === "dark" ? generalButtonBgDark : generalButtonBgLight
    );
  }, [themeAtomValue]);

  return (
    <div className="relative h-full w-full">
      <img src={generalButtonBgURL} alt="" className="w-full h-full object-fill"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold dark:text-white text-black">
          {t(inputText)}
        </span>
      </div>
    </div>
  );
};

export default GeneralButton;
