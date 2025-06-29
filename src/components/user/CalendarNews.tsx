import { navbarHeightAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { EconomicCalendar } from "react-ts-tradingview-widgets";

const CalendarNews = () => {
  const [navbarHeight] = useAtom(navbarHeightAtom);
  return (
    <div
      style={{ 
        height: `calc(100vh - ${navbarHeight}px - 3px)`,
        background: 'linear-gradient(180deg, #DBD633 0%, #9ED473 50%, #1CCDE6 100%)'
      }}
      className="relative mx-auto pt-7 p-6 w-full flex flex-col"
    >
      <EconomicCalendar colorTheme="dark" height="100%" width="100%" />
      <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <h3 className="text-white text-lg font-semibold mb-2">Abonnieren Sie unseren Newsletter</h3>
        <p className="text-white/80 mb-4">Bleiben Sie über die neuesten Marktnachrichten und Analysen informiert</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
            Abonnieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarNews;
