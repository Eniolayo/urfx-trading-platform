import { useEffect, useRef, useState } from "react";
import {
  Rocket,
  DollarSign,
  LineChart,
  HeartHandshake,
  Brain,
  Users,
  Youtube,
  MessageCircle,
  Building2,
  Send,
  ChevronRight,
} from "lucide-react";
import "../../style/StyleBecomeaPartner.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "@/utils/api";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

interface BecomePartnerRequestType {
  name: string;
  email: string;
  socialUserName: string;
  socialUrl: string;
  partnershipType: string;
  message: string;
}

import Footer from '../Footer';
function BecomePartner() {
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formData, setFormData] = useState<BecomePartnerRequestType>({
    name: "",
    email: "",
    socialUserName: "",
    socialUrl: "",
    partnershipType: "",
    message: "",
  });

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-partner");
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

  const submitMutate = useMutation({
    mutationFn: async (data: BecomePartnerRequestType) => {
      const response = await axios.post("service/become-partner", data);

      return response.data;
    },
    onSuccess: () => {
      toast.success(t("You successfully applied!"));
      setFormData({
        name: "",
        email: "",
        socialUserName: "",
        socialUrl: "",
        partnershipType: "",
        message: "",
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast.warn((err?.response?.data as { message: string }).message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutate.mutate(formData);
  };

  return (
    <div className="min-h-screen  from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t("Become a URFX Partner")}
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            {t("Let's Build the Future of Trading—Together")}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("At URFX, we're not just another prop firm. We're building an elite trading ecosystem—and we want the right partners beside us.")}
          </p>
        </div>

        {/* Why Partner Section */}
        <section id="why-partner" className="mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Rocket className="text-blue-400" />
            {t("Why Partner With URFX?")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <DollarSign className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("Generous Commissions")}
              </h3>
              <p className="text-gray-400">
                {t("Earn high recurring commissions for every referral that joins our evaluation programs.")}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <LineChart className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("Scalable Earnings")}</h3>
              <p className="text-gray-400">
                {t("No cap on your potential. Grow with us as we expand globally.")}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <HeartHandshake className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("Full Support")}</h3>
              <p className="text-gray-400">
                {t("Get access to performance dashboards, creatives, tracking links, and a dedicated partner manager.")}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <Brain className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("Trusted Brand")}</h3>
              <p className="text-gray-400">
                {t("URFX is built by experienced traders and entrepreneurs, backed by real payouts and a proven funding model.")}
              </p>
            </div>
          </div>
        </section>

        {/* Ideal Partners Section */}
        <section
          id="ideal-partners"
          className="mb-16 animate-on-scroll opacity-0"
        >
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Users className="text-purple-400" />
              {t("Ideal Partner Profiles")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Youtube className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {t("Trading Educators & Course Creators")}
                    </h3>
                    <p className="text-gray-400">
                      {t("Share your knowledge and earn from your audience.")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t("Social Media Influencers")}</h3>
                    <p className="text-gray-400">
                      {t("YouTube, Instagram, TikTok, X - all platforms welcome.")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{t("Discord/Telegram Admins")}</h3>
                    <p className="text-gray-400">
                      {t("Connect your community with opportunities.")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {t("Brokers & Fintech Platforms")}
                    </h3>
                    <p className="text-gray-400">
                      {t("Create strategic partnerships and integrations.")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LineChart className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {t("Fund Managers & Signal Providers")}
                    </h3>
                    <p className="text-gray-400">
                      {t("Expand your reach with our platform.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="animate-on-scroll opacity-0">
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Send className="text-blue-400" />
              {t("Apply Now to Become a Partner")}
            </h2>
            <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Full Name*")}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Email Address*")}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Telegram/Discord Username*")}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.socialUserName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialUserName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Website / Social Media")}
                  </label>
                  <input
                    type="url"
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.socialUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, socialUrl: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Partnership Type*")}
                  </label>
                  <select
                    required
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.partnershipType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        partnershipType: e.target.value,
                      })
                    }
                  >
                    <option value="">{t("Select Partnership Type")}</option>
                    <option value="affiliate">{t("Affiliate / Influencer")}</option>
                    <option value="broker">{t("Broker Referral")}</option>
                    <option value="educator">
                      {t("Educator / Course Collaboration")}
                    </option>
                    <option value="community">{t("Trading Community")}</option>
                    <option value="other">{t("Other")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t("Tell Us About Yourself*")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={t("Share your experience and why you want to partner with URFX.")}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-6 py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                >
                  {t("Apply Now")}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Questions Section */}
        <section className="mt-16 text-center animate-on-scroll opacity-0">
          <h2 className="text-2xl font-bold mb-4">{t("Questions?")}</h2>
          <p className="text-gray-400">
            {t("Reach out to us directly at")}{" "}
            <a
              href="mailto:support@urfx.io"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@urfx.io
            </a>{" "}
            {t("or message us via Telegram.")}
          </p>
          <p className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t("Let's grow—together.")}
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default BecomePartner;
