import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PerformanceChart from "../components/landing/PerformanceChart.tsx";
import LeaderboardSection from "../components/landing/LeaderboardSection";
import FaqSection from "../components/landing/FaqSection";
import TextScrollerSection from "../components/landing/TextScrollerSection";
import DashboardAdSection from "../components/landing/DashboardAdSection.tsx";
import CertificateScrollSection from "../components/landing/CertificateScrollSection"
// import FinalSubscribe from "../components/landing/FinalSubscribe";
import JoinOurTeamSection from "@/components/landing/JoinOurTeamSection";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { BrokerSection } from "@/components/landing/BrokerSection";
import TestimonialFlowSection  from "../../src/components/landing/TestimonialFlowSection";
import CommunitySupportSection from "@/components/landing/CommunitySupportSection";
import Footer from "@/components/Footer";

export default function LandingView() {
  // const { hash } = useLocation();

  // useEffect(() => {
  //   if (hash) {
  //     const targetElement = document.getElementById(hash.replace("#", ""));
  //     if (targetElement) {
  //       targetElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   } else {
  //     const landingElement = document.body;
  //     if (landingElement) {
  //       landingElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [hash]);
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col overflow-hidden dark:bg-black bg-white">
        <HeroSection />
        <LeaderboardSection />
        <TextScrollerSection />
        <CertificateScrollSection/>
        <CommunitySupportSection/>
        <PerformanceChart />
        <FeaturesSection />
        <DashboardAdSection />
        {/* <BrokerSection/> */}
        <TestimonialFlowSection/>
        <JoinOurTeamSection />
        <FaqSection />
        {/* <FinalSubscribe /> */}
        <Footer />
    </div>
  );
}
