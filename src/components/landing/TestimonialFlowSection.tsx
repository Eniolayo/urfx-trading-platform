import { useEffect, useRef } from "react";
import "../../style/StyleTestimonials.css";
import { useTranslation } from "react-i18next";
import trustAdvisorLogo from "/src/assets/TestimonialSection/trustadvisor-logo.png";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import usflag from "/src/assets/TestimonialSection/us.svg";
import canadaflag from "/src/assets/TestimonialSection/ca.svg";
import ukflag from "/src/assets/TestimonialSection/gb.svg";

function TestimonialFlowSection() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-testimonials");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Jose Satire",
      country: t("Milan, Italy 🇮🇹"),
      flag: usflag,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      quote: t(
        "Professional support team and great spreads on EUR/USD. URFX is my go-to prop firm now."
      ),
      profit: t("💶 Just cashed out €1,300 from my second payout."),
    },
    {
      name: "Olivia Bennett",
      country: t("Toronto, Canada"),
      flag: canadaflag,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      quote: t(
        "Payout process was smooth and fast. Got my share in 48 hours via e-transfer. These guys are legit."
      ),
      profit: t("💰 First payout: CAD 1,400. Straight to my account."),
    },
    {
      name: "Harry Collins",
      country: t("London, United Kingdom"),
      flag: ukflag,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      quote: t(
        "URFX is the only prop firm I've used that genuinely supports UK traders. Solid platform and great community."
      ),
      profit: t("💷 Withdrawn over £850 from my first funded month."),
    },
    // {
    //   name: "Lukas Schneider",
    //   country: t("Munich, Germany"),
    //   flag:germanflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "The onboarding was seamless and the dashboard was super intuitive. I passed Phase 1 with confidence."
    //   ),
    //   profit: t("💶 First payout of €1,200 processed in 2 days."),
    // },
    // {
    //   name: "Camille Moreau",
    //   country: t("Paris, France"),
    //   flag:franceflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "I love how clear and fair the rules are. No hidden clauses like other firms I've tried in the past."
    //   ),
    //   profit: t("💶 Earned €950 in my first funded account."),
    // },
    // {
    //   name: "Marco Bianchi",
    //   country: t("Milan, Italy"),
    //   flag:italyflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Professional support team and great spreads on EUR/USD. URFX is my go-to prop firm now."
    //   ),
    //   profit: t("💶 Just cashed out €1,300 from my second payout."),
    // },
    // {
    //   name: "Sophie de Vries",
    //   country: t("Rotterdam, Netherlands"),
    //   flag:netherlandflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "The fact that I can track everything in real-time is a huge plus. The metrics are incredibly helpful."
    //   ),
    //   profit: t("💶 Made over €1,000 in my first 10 days trading."),
    // },
    // {
    //   name: "Javier Gómez",
    //   country: t("Barcelona, Spain"),
    //   flag:spanishflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "I've used other firms, but none are as responsive and clear as URFX. Their community is super active."
    //   ),
    //   profit: t("💶 First withdrawal: €870. Quick and easy."),
    // },
    // {
    //   name: "Erik Lundgren",
    //   country: t("Gothenburg, Sweden"),
    //   flag:swedenflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Their Discord is packed with real traders, not just bots or mods. I've learned a lot already."
    //   ),
    //   profit: t("💷 Earned SEK 11,500 in profits during month one."),
    // },
    // {
    //   name: "Nora Meier",
    //   country: t("Zurich, Switzerland"),
    //   flag:switzerlandflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Finally a firm that respects serious traders. URFX is transparent and their risk management system works."
    //   ),
    //   profit: t("💶 Received CHF 1,200 just last week!"),
    // },
    // {
    //   name: "Sean O'Connor",
    //   country: t("Cork, Ireland"),
    //   flag:irelandflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "No nonsense challenges, real payouts, and great guidance throughout. This firm stands out."
    //   ),
    //   profit: t("💶 My first funded month brought in €1,050."),
    // },
    // {
    //   name: "Ingrid Johansen",
    //   country: t("Bergen, Norway"),
    //   flag:norwayflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "The tools they give you to manage your trading are next level. I trust them completely."
    //   ),
    //   profit: t("💷 Profit share: NOK 12,400 straight to my wallet."),
    // },
    // {
    //   name: "Mikkel Sørensen",
    //   country: t("Aarhus, Denmark"),
    //   flag:denmarkflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "I love the clean design of the platform. Everything is where it should be. Feels professional."
    //   ),
    //   profit: "💶 Earned DKK 8,700 in my second evaluation.",
    // },
    // {
    //   name: "Thomas Dubois",
    //   country: t("Antwerp, Belgium"),
    //   flag:belgiumflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "URFX makes trading feel like a career—not a gamble. Best decision I made this year."
    //   ),
    //   profit: t("💶 Over €1,100 paid to me last week."),
    // },
    // {
    //   name: "Jack Thompson",
    //   country: t("Canberra, Australia"),
    //   flag:australiaflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Finally hit my scaling milestone thanks to URFX's fair rules. These guys are the real deal."
    //   ),
    //   profit: t("💵 AUD 1,650 payout processed quickly."),
    // },
    // {
    //   name: "Faisal Al-Mutairi",
    //   country: t("Jeddah, Saudi Arabia"),
    //   flag:saudiflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "In Saudi, we see many firms come and go, but URFX is built to last. It's professional and reliable."
    //   ),
    //   profit: t("💵 Withdrew SAR 3,700 in my first funded cycle."),
    // },
    // {
    //   name: "Ahmed Al-Fahim",
    //   country: t("Dubai, United Arab Emirates"),
    //   flag:uaeflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "The challenge was tough, but fair. Once I got funded, support walked me through everything clearly."
    //   ),
    //   profit: t("💵 First payout: AED 4,200 and counting."),
    // },
    // {
    //   name: "Emily Harris",
    //   country: t("Auckland, New Zealand"),
    //   flag:newzealandflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Easy communication, great tools, and timely payments. Proud to represent URFX in NZ."
    //   ),
    //   profit: t("💵 Just banked NZD 1,800 in profits."),
    // },
    // {
    //   name: "Julian Hofer",
    //   country: t("Salzburg, Austria"),
    //   flag:austriaflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "They actually encourage long-term growth instead of quick flips. That's what sets URFX apart."
    //   ),
    //   profit: t("💶 Earned €1,150 in my second payout already."),
    // },
    // {
    //   name: "Haruki Tanaka",
    //   country: t("Tokyo, Japan"),
    //   flag:japanflag,
    //   avatar:
    //     "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=faces",
    //   quote: t(
    //     "Japan needs more platforms like this. Clean, precise, and trader-focused."
    //   ),
    //   profit: t("💴 Received ¥158,000 in just a few weeks."),
    // },
  ];

  return (
    <div className="dark:bg-dark bg-white dark:text-white text-black">
      {/* Main Content */}
      <main className="mx-auto px-6 pt-0 pb-9 h-fit">
        {/* Hero Section */}
        <div className="text-center animate-on-scroll opacity-0">
          <h1 className="text-[38px] md:text-[48px] 3xl:text-[52px] 2k:text-[80px] font-bold mb-6">
            {t("Trusted by Traders All Around the World.")}
          </h1>
          <p className="text-xl 2k:text-[30px] text-[#838383]">
            {t(
              "See why so many traders worldwide choose URFX as their preferred Prop Firm."
            )}
          </p>
          <div className="flex justify-center items-center text-[18px] 2k:text-[39px] 2k:mt-24 dark:text-white text-black">
            <span>{t("Reviews provided by")}</span> &nbsp;
            <span>
              <img
                src={trustAdvisorLogo}
                alt="TrustAdvisor Logo"
                className="w-[40px] h-[43px]"
              />
            </span>
            <span className="font-bold">TrustAdvisor</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="w-full overflow-x-auto scrollbar-hide sm:overflow-hidden h-auto sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="min-w-full">
            <div className="flex flex-row gap-6 mt-12 mb-12 2k:py-40 !justify-start sm:!justify-center flex-nowrap sm:flex-wrap">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="ml-2 w-[85%] sm:w-fit flex-shrink-0"
                >
                  <TestimonialCard className="dark:bg-[#161616] bg-dark/5 w-full">
                    <div
                      className="flex flex-col relative p-2 justify-between animate-on-scroll
              w-full h-full opacity-0 backdrop-blur-sm transition-all duration-300 transform"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-full h-full p-3 2k:p-6 flex flex-col justify-between">
                        <div className="relative">
                          <p className="text-[14px] sm:text-[18px] 2k:text-[30px] font-bold dark:text-gray-300 text-black relative z-10">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        <p className="text-[14px] sm:text-[16px] 2k:text-[28px] dark:text-gray-300 text-black font-normal">
                          {testimonial.profit}
                        </p>

                        <div className="flex items-start gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="size-[54px] 2k:size-[84px] object-cover border-2 border-yellow-400/30"
                          />
                          <div className="flex flex-col justify-between h-full">
                            <h3 className="font-semibold text-[20px] sm:text-[23px] 2k:text-[30px]">
                              {testimonial.name}
                            </h3>

                            <div className="flex">
                              <p className="dark:text-gray-300 text-[12px] sm:text-[17px] 2k:text-[28px] text-black">
                                {testimonial.country}
                              </p>
                              <img
                                src={testimonial.flag}
                                alt="flag"
                                className="size-[18px] 2k:size-[33px] ml-4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TestimonialCard>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* <div className="relative flex justify-center items-center mb-4">
        <div className="h-auto w-auto glass-panel rounded-3xl  p-5">
          <a href="https://trustsadvisor.com/">
            <img src={trustAdvisorLogo} alt="trustAdvisorLogo" className="h-[60px]"/>
          </a>
        </div>
       
      </div> */}
    </div>
  );
}

export default TestimonialFlowSection;
