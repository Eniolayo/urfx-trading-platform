import React, { useEffect, useRef } from 'react';
import {
  BookOpen,
  TrendingUp,
  Shield,
  Settings,
  Target,
  Users,
  AlertTriangle,
} from 'lucide-react';
import "../../style/StyleTradingRules.css";
import Footer from '../Footer';
import { useTranslation } from 'react-i18next';

interface Rule {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string[];
}

function TradingRules() {
  const  { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-tradingrules');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.rule-section').forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const rules: Rule[] = [
    {
      id: 1,
      title: t("Leverage and Margin Requirements"),
      icon: <TrendingUp className="w-8 h-8" />,
      content: [
        t("Leverage: Maximum leverage of up to 1:100, chosen based on risk tolerance"),
        t("Margin Calls: 80% margin call level and 50% stop-out level"),
      ]
    },
    {
      id: 2,
      title: t("Risk Management"),
      icon: <AlertTriangle className="w-8 h-8" />,
      content: [
        t("Daily Drawdown Limit: Maximum 6% daily loss"),
        t("Overall Drawdown Limit: Maximum 12% total loss"),
      ]
    },
    {
      id: 3,
      title: t("Trading Strategies and Instruments"),
      icon: <Settings className="w-8 h-8" />,
      content: [
        t("All FXTM instruments available"),
        t("Manual and automated trading allowed"),
        t("HFT, martingale, and grid trading prohibited"),
      ]
    },
    {
      id: 4,
      title: t("Position Management"),
      icon: <Target className="w-8 h-8" />,
      content: [
        t("Overnight and weekend holding permitted"),
        t("Maximum 50 lots per Forex order"),
      ]
    },
    {
      id: 5,
      title: t("Consistency and Performance"),
      icon: <TrendingUp className="w-8 h-8" />,
      content: [
        t("10% profit target during evaluation"),
        t("Single day profits capped at 40% of total"),
      ]
    },
    {
      id: 6,
      title: t("Account Activity"),
      icon: <Users className="w-8 h-8" />,
      content: [
        t("Minimum 5 trading days required"),
        t("30 days inactivity leads to suspension"),
      ]
    },
    {
      id: 7,
      title: t("Ethical Conduct and Compliance"),
      icon: <Shield className="w-8 h-8" />,
      content: [
        t("No account sharing or market manipulation"),
        t("Must comply with FXTM terms and conditions"),
      ]
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient-tradingrules"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl mb-8 backdrop-blur-xl border border-white/10">
            <BookOpen className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6 animate-gradient-text-tradingrules">
            {t("Trading Rules")}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("Our proprietary trading firm guidelines for FXTM traders")}
          </p>
        </div>

        <div className="space-y-12">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="rule-section opacity-0 relative group"
            >
              <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 transform -translate-x-20 mt-2 group-hover:scale-110 transition-transform duration-300">
                {rule.icon}
              </div>
              <div className="ml-4 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 mr-6">
                    {String(rule.id).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {t(rule.title)}
                  </h2>
                </div>
                <ul className="space-y-4 pl-6">
                  {rule.content.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300 relative flex items-start group/item"
                    >
                      <span className="absolute -left-6 top-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform scale-0 group-hover/item:scale-100 transition-transform duration-300"></span>
                      <span className="group-hover/item:text-blue-400 transition-colors duration-300">
                        {t(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default TradingRules;
