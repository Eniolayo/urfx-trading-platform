import { useEffect, useRef } from 'react';
import "../../style/StylePrivacyAndPolicy.css"
import Footer from '../Footer';
import { useTranslation } from 'react-i18next';
import GeneralButtonWithCss from '../landing/GeneralButtonWithCss';
import ContactUsHeaderBgDark from "/src/assets/Contactus/contact-us-header-bg-dark.svg";


function PrivacyAndPolicy() {
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-privacy');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
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
          <span className="w-fit h-fit">Privacy Policy</span>
          <span className="w-fit h-fit text-[18px] text-center">
            {t("Last update: May 07, 2025")}
          </span>
        </div>
      </div>

      <div className="py-16 px-60 animate-gradient-disclaimer">
        <div className="bg-black text-white px-6 py-10 space-y-10">
          <div>
            <p className="mb-6">
              At urfx.io, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information
              when you interact with our platform and services.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">1. Personal Information</h2>
            <p className="mb-4">We may collect the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Billing and payout information</li>
              <li>Identification documents for verification</li>
              <li>IP address and browser details</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">2. Usage Data</h2>
            <p className="mb-4">Includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Page visits and platform usage behavior</li>
              <li>Device type and settings</li>
              <li>Login timestamps and session activity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your account</li>
              <li>Process evaluation entries and funded accounts</li>
              <li>Communicate updates, offers, or support</li>
              <li>Prevent fraud and enforce platform rules</li>
              <li>Improve user experience through analytics</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">We do not sell your data. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors (for payouts and subscriptions)</li>
              <li>ID verification partners (for compliance)</li>
              <li>Service providers (such as analytics tools)</li>
              <li>Legal authorities if required by law or to enforce terms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
            <p className="mb-4">We implement:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Secure servers and firewalls</li>
              <li>Role-based access controls</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission is 100% secure, and we cannot guarantee absolute protection.
            </p>
          </div>
        </div>
        <div className="bg-black text-white px-6 py-10 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal data</li>
              <li>Request data portability</li>
              <li>Withdraw consent (may impact your ability to use the service)</li>
            </ul>
            <p className="mt-4">To request data changes, email <a href="mailto:privacy@urfx.io" className="text-blue-400 underline">privacy@urfx.io</a>.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">7. Cookies</h2>
            <p className="mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Store session data</li>
              <li>Analyze platform performance</li>
              <li>Provide personalized experiences</li>
            </ul>
            <p className="mt-4">You can manage cookies through your browser settings.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">8. Third-Party Links</h2>
            <p>
              Our platform may include links to third-party websites or tools. We are not responsible for their privacy practices.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
            <p>
              urfx.io is not intended for individuals under the age of 18. We do not knowingly collect data from minors.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">10. Contact Us</h2>
            <p className="mb-4">For any privacy-related questions or data requests:</p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span>📧</span> <span>support@urfx.io</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span> <span>www.urfx.io</span>
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

export default PrivacyAndPolicy;
