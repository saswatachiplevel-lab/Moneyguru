import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  PieChart,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MoneyguruLogo } from './MoneyguruLogo';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'allocation' | 'goals'>('allocation');

  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:max-w-none flex justify-center items-center py-6 select-none">
      {/* Background Ambient Glows */}
      <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#C9F24A]/15 rounded-full blur-3xl pointer-events-none animate-glow" />
      <div className="absolute -bottom-16 -left-12 w-80 h-80 bg-[#123B43]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Reassurance Pill Badge 1: Top Right */}
      <div className="absolute -top-4 right-2 sm:right-6 z-30 bg-[#071D29]/90 border border-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
        <div className="w-7 h-7 rounded-full bg-[#C9F24A]/20 flex items-center justify-center text-[#C9F24A]">
          <ShieldCheck className="w-4 h-4 text-[#C9F24A]" />
        </div>
        <div>
          <p className="text-[10px] text-white/60 uppercase font-semibold tracking-wider">Protection Shield</p>
          <p className="text-xs font-bold text-white">100% Comprehensive</p>
        </div>
      </div>

      {/* Floating Main Lime Badge: "Your Goals. Your Plan." */}
      <div className="absolute -bottom-6 left-2 sm:-left-4 z-30 bg-[#C9F24A] text-[#071D29] px-5 py-3 rounded-2xl shadow-2xl shadow-[#C9F24A]/30 border border-[#D9F77A] flex items-center gap-3 transition-transform hover:scale-105">
        <MoneyguruLogo size={34} showText={false} />
        <div>
          <p className="text-xs font-extrabold tracking-tight uppercase leading-none">Your Goals. Your Plan.</p>
          <p className="text-[11px] font-medium text-[#071D29]/80 mt-0.5">Simple, structured guidance</p>
        </div>
      </div>

      {/* Perspective Container */}
      <div className="relative w-full max-w-[420px] sm:max-w-[460px] pt-4">
        {/* UNDERNEATH LAYER: Secondary Angled Phone (creating reference depth) */}
        <div className="absolute top-12 -right-4 sm:-right-8 w-[270px] sm:w-[300px] h-[480px] bg-gradient-to-br from-[#123B43] via-[#0B2733] to-[#071D29] rounded-[42px] border-4 border-[#28515A]/60 shadow-2xl transform rotate-[14deg] opacity-75 hidden sm:block p-4 overflow-hidden">
          {/* Subtle phone screen contents */}
          <div className="w-24 h-4 bg-black/40 rounded-full mx-auto mb-4" />
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-3">
            <span className="text-[10px] text-white/50">Next Monthly SIP</span>
            <p className="text-base font-bold text-white">₹15,000</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#C9F24A] h-full w-3/4 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-white/5 rounded-xl border border-white/5 flex items-center px-3 justify-between">
              <span className="text-[10px] text-white/60">Large Cap Index</span>
              <span className="text-[10px] text-[#C9F24A] font-bold">+16.2%</span>
            </div>
            <div className="h-8 bg-white/5 rounded-xl border border-white/5 flex items-center px-3 justify-between">
              <span className="text-[10px] text-white/60">Emergency Fund</span>
              <span className="text-[10px] text-white font-bold">Secure</span>
            </div>
          </div>
        </div>

        {/* FOREGROUND LAYER: Primary Hero Phone (inspired by reference composition) */}
        <div className="relative z-20 w-[310px] sm:w-[350px] mx-auto bg-[#071D29] rounded-[44px] border-[5px] border-[#28515A] shadow-2xl shadow-black/70 transform sm:-rotate-[4deg] transition-transform duration-500 hover:rotate-0 p-3.5">
          {/* Phone Frame Speaker / Notch */}
          <div className="relative w-full bg-[#0B2733] rounded-[34px] overflow-hidden border border-white/10 p-4">
            {/* Top Phone Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#C9F24A]" />
                <span className="text-[11px] font-bold text-white tracking-wide">Moneyguru Live</span>
              </div>
              <div className="flex items-center gap-1 bg-[#123B43] px-2 py-0.5 rounded-full text-[10px] text-[#C9F24A] font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Beginner View</span>
              </div>
            </div>

            {/* Main Value Display Card (matches reference $1,543 card aesthetic) */}
            <div className="mt-3.5 bg-gradient-to-br from-[#123B43]/80 to-[#071D29] p-4 rounded-2xl border border-[#C9F24A]/25 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9F24A]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70 font-medium">Sample Portfolio Value</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#071D29] bg-[#C9F24A] px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  +18.4%
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">₹4,85,250</span>
                <span className="text-[11px] text-[#D9F77A]/90 font-medium">Target: ₹10,00,000</span>
              </div>

              {/* Dynamic Mini SVG Chart Curve */}
              <div className="mt-3 h-12 w-full">
                <svg viewBox="0 0 280 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9F24A" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C9F24A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 45 Q 40 40, 70 30 T 140 22 T 210 14 T 280 5 L 280 50 L 0 50 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0 45 Q 40 40, 70 30 T 140 22 T 210 14 T 280 5"
                    fill="none"
                    stroke="#C9F24A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Point Marker */}
                  <circle cx="280" cy="5" r="4" fill="#071D29" stroke="#C9F24A" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Interactive Toggle Pill */}
            <div className="mt-3.5 flex bg-[#071D29] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('allocation')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'allocation'
                    ? 'bg-[#C9F24A] text-[#071D29] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Asset Allocation
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'goals'
                    ? 'bg-[#C9F24A] text-[#071D29] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Planned Milestones
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'allocation' ? (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#C9F24A]/20 flex items-center justify-center text-[#C9F24A]">
                      <PieChart className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Mutual Funds</p>
                      <p className="text-[10px] text-white/50">Large & Flexi-Cap SIPs</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#C9F24A]">45%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#123B43] flex items-center justify-center text-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D9F77A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Term & Health Cover</p>
                      <p className="text-[10px] text-white/50">Pure Protection Shield</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">25%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#28515A]/60 flex items-center justify-center text-white">
                      <Layers className="w-3.5 h-3.5 text-[#C9F24A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Bonds & Liquid Corpus</p>
                      <p className="text-[10px] text-white/50">Capital Stability</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">30%</span>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Emergency Fund (6 Months)</span>
                    <span className="text-[#C9F24A]">Completed</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                    <div className="bg-[#C9F24A] h-full w-full rounded-full" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Child Higher Education</span>
                    <span className="text-white/70">65% on track</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                    <div className="bg-[#C9F24A] h-full w-[65%] rounded-full" />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Insight Row */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
              <span className="flex items-center gap-1 text-[#C9F24A] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero Confusing Jargon
              </span>
              <span className="text-white/40">Updated Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
