import { useEffect, useRef } from 'react';
import "../../style/StyleTermsAndConditions.css"
import Footer from '../Footer';
import { useTranslation } from 'react-i18next';
import ContactUsHeaderBgDark from "/src/assets/Contactus/contact-us-header-bg-dark.svg";
import GeneralButtonWithCss from '../landing/GeneralButtonWithCss';

function TermsAndConditions() {
  const { t } = useTranslation();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible-tos');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-full w-full dark:bg-dark dark:text-white bg-white text-black"
      id="contactUs"
    >
      {/* Header Background */}
      <div className="relative w-full">
        <img
          src={ContactUsHeaderBgDark}
          alt="ContactUsBackgroundImage"
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full text-[48px] font-bold">
          <span className="w-fit h-fit">Terms And Conditions</span>
          <span className="w-fit h-fit text-[18px] text-center">
            {t("Last update: May 07, 2025")}
          </span>
        </div>
      </div>

      <div className="py-16 px-60 animate-gradient-disclaimer">
        <p>Welcome to urfx.io — your next-generation proprietary trading experience. Please read these Terms and Conditions carefully before using our platform. By accessing or using urfx.io, you agree to be bound by these terms.</p>
        <div className="bg-black text-white px-6 py-10 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">1. Eligibility</h2>
            <p className="mb-4">To access and use urfx.io services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old.</li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>Not be located in a restricted or sanctioned jurisdiction.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">2. Account Registration</h2>
            <p className="mb-4">By registering on urfx.io:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to provide accurate and complete information.</li>
            </ul>
            <ul className="list-disc pl-6 mt-6 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>Multiple accounts for the same individual without permission may result in disqualification.</li>
            </ul>
          </div>
        </div>

        <div className="bg-black text-white px-6 py-10 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">3. Proprietary Trading Challenges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>urfx.io offers evaluation programs where traders can showcase skills under set conditions.</li>
              <li>Profits are simulated and based on demo accounts during challenges.</li>
              <li>Once evaluation criteria are met, traders may be offered a funded simulated account under a contract.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">4. Funded Account Agreement</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="#" className="text-blue-400 underline">All funded accounts remain the property of urfx.io.</a></li>
              <li>Payouts are subject to performance, verification, and compliance with rules.</li>
              <li>Breaching trading rules (drawdown limits, daily loss limits, prohibited strategies, etc.) may result in termination.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">5. Payouts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payouts are typically processed via secure payment gateways.</li>
              <li>Taxes and legal obligations are the trader’s responsibility.</li>
              <li>Payouts are subject to verification and adherence to account terms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">6. Prohibited Activities</h2>
            <p className="mb-2">Traders are strictly prohibited from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exploiting platform latency or engaging in abusive trading.</li>
              <li>Using copy trading, EAs (without approval), or arbitrage systems.</li>
              <li>Violating the integrity of our systems.</li>
            </ul>
            <p className="mt-4">Violation may lead to account suspension, disqualification, or legal action.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">7. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All content, branding, and platform features are owned by urfx.io.</li>
              <li>Unauthorized use, copying, or redistribution is strictly prohibited.</li>
            </ul>
          </div>
        </div>

        <div className="bg-black text-white px-6 py-10 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">urfx.io is not liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any indirect, incidental, or consequential damages.</li>
              <li>Loss of profits, trades, or account access due to technical issues.</li>
              <li>
                <a href="#" className="text-blue-400 underline">Trading decisions based on simulated accounts.</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">9. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">10. Termination</h2>
            <p>
              urfx.io reserves the right to terminate accounts for violations of these terms without notice or refund.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">11. Governing Law</h2>
            <p>
              These terms are governed by and construed under the laws of [Insert Jurisdiction].
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">12. Contact</h2>
            <p className="mb-4">For questions or concerns, please contact:</p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span>📧</span> <span>support@urfx.io</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Join our Team of Experienced Traders</h2>
            <p className="max-w-3xl mx-auto">
              Traders can take their trading to the next level by refining their skills and strategies, setting themselves up for success in the competitive financial markets. By doing so, they can embark on their journey to become funded prop traders, unlocking new opportunities and challenges that come with professional trading careers.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center my-10 h-auto">
          <GeneralButtonWithCss
            blur={true}
            className="text-[14px] sm:text-[15px] md:text-[18px] w-[124px] h-[32px] sm:w-[142] sm:h-[36.816px] md:w-[162px] md:h-[42px] 2k:text-[27px] 2k:w-[243px] 2k:h-[63px]"
            bgClassName="dark:bg-dark dark:opacity-30 dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
          >
            {t("Start Challenge")}
          </GeneralButtonWithCss>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
