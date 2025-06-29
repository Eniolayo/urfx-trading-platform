import { MetaAccountParams } from "@/types/metaAccount";
import { useTranslation } from "react-i18next";

export default function AccountsOverview({
  metaAccount,
  onClick,
}: {
  metaAccount: MetaAccountParams;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="glass-panel border-secondary rounded-xl py-2 px-4 mb-2">
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-3 space-x-3">
          <div className="text-darkContent col-span-1">{t("Login")}</div>
          <div className="col-span-2">{metaAccount?.login}</div>
        </div>
        <div className="grid grid-cols-3 space-x-3">
          <div className="text-darkContent col-span-1">{t("Password")}</div>
          <div className="col-span-2">{metaAccount?.password}</div>
        </div>
        <div className="grid grid-cols-3 space-x-3">
          <div className="text-darkContent col-span-1">{t("Server")}</div>
          <div className="col-span-2">{metaAccount?.server}</div>
        </div>
        <div className="grid grid-cols-3 space-x-3">
          <div className="text-darkContent col-span-1">{t("Platform")}</div>
          <div className="col-span-2">
            {metaAccount?.platform}
            <span className="float-end border-white/30 border-2 inline-block bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white font-semibold rounded-full px-4 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer" onClick={onClick}>
              {t("Next Account")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
