import {
  AlertTriangle,
  Info,
  Shield,
  DollarSign,
  Binary,
} from "lucide-react";
import { useEffect, useRef } from "react";
import "../../style/StyleDisclaimer.css";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";

function Disclaimer() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const {t} = useTranslation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="text-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-gradient-disclaimer">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 relative animate-float-disclaimer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg filter blur-xl opacity-20 animate-pulse-slow-disclaimer"></div>
            <div className="relative bg-black bg-opacity-90 rounded-xl p-8 border border-gray-700 backdrop-blur-sm transition-all duration-500">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                {t("Legal Disclaimer")}
              </h1>
              <p className="text-gray-400 text-lg">
                {t("Effective Date:")} April 6, 2025
                <span className="mx-3">•</span>
                {t("URFX Global Trading Inc.")}
                <span className="mx-3">•</span>
                {t("Vancouver, Canada")}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <section
              ref={(el) => {
                sectionsRef.current[0] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 "
            >
              <div className="flex items-start">
                <Info className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0 mt-1 animate-float-disclaimer" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t("1. General Disclaimer")}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {t(
                      "The content, services, and programs offered by URFX Global Trading Inc. through urfx.io are intended for educational and evaluation purposes only. URFX does not provide investment, financial, or trading advice of any kind."
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section
              ref={(el) => {
                sectionsRef.current[1] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start">
                <Shield className="w-8 h-8 text-purple-400 mr-4 flex-shrink-0 mt-1 animate-float-disclaimer" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t("2. No Investment Advice")}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {t(
                      "Nothing on this website, within our programs, or in any of our communications should be construed as financial advice or a recommendation to buy or sell any financial instrument. Trading in financial markets carries a high level of risk, and you are solely responsible for your decisions and actions."
                    )}
                  </p>
                  <p className="text-gray-300 mt-4 leading-relaxed">
                    {t(
                      "URFX is not a licensed financial institution, broker-dealer, or investment advisor."
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section
              ref={(el) => {
                sectionsRef.current[2] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-4 flex-shrink-0 mt-1 animate-float-disclaimer" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t("3. Risk Warning")}
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {t(
                      "Trading foreign exchange (Forex), CFDs, indices, and cryptocurrencies involves significant risk and may result in loss of capital. You should never trade with funds you cannot afford to lose. Past performance is not indicative of future results."
                    )}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse-disclaimer"></span>
                      {t("All trading is conducted in simulated environments")}
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse-disclaimer"></span>
                      {t("You may lose your access to accounts if rules are breached")}
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse-disclaimer"></span>
                      {t(
                        "Payouts and profit-sharing are discretionary and conditional"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section
              ref={(el) => {
                sectionsRef.current[3] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start">
                <Binary className="w-8 h-8 text-green-400 mr-4 flex-shrink-0 mt-1 animate-float-disclaimer" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t("4. Simulated Trading Environment")}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {t(
                      "All trading activity with URFX is conducted within demo or simulated accounts. These accounts do not involve real capital and are used solely to assess your performance and risk management for evaluation and funded phases."
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section
              ref={(el) => {
                sectionsRef.current[4] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start">
                <DollarSign className="w-8 h-8 text-yellow-400 mr-4 flex-shrink-0 mt-1 animate-float-disclaimer" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t("5. No Guarantee of Earnings")}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {t(
                      "URFX makes no guarantees or promises of financial gains, profits, or funded account approvals. Your results depend on your skill, discipline, and adherence to our trading rules."
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
<Footer/>
    </div>
  );
}

export default Disclaimer;
