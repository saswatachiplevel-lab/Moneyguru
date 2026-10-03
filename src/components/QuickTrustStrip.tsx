import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Landmark, ChevronRight } from 'lucide-react';

interface QuickTrustStripProps {
  onLearnMore: () => void;
  onSelectService: (serviceId: string) => void;
}

export const QuickTrustStrip: React.FC<QuickTrustStripProps> = ({
  onLearnMore,
  onSelectService,
}) => {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Left Visual Card: "How Can We Help?" */}
        <div
          onClick={onLearnMore}
          className="group relative h-[180px] sm:h-[190px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80"
            alt="Financial Consultation"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/75 to-transparent flex flex-col justify-end p-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9F24A]">
              Personalized Guidance
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">How Can We Help?</h3>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9F24A] transition-colors">
              <span>Learn More</span>
              <span className="w-4 h-4 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center text-[10px] transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
          </div>
        </div>

        {/* Card 1: Mutual Fund Guidance */}
        <div
          onClick={() => onSelectService('mutual-funds')}
          className="group bg-[#0B2733] hover:bg-[#123B43] p-5 rounded-3xl border border-white/10 hover:border-[#C9F24A]/40 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#123B43] group-hover:bg-[#C9F24A] text-[#C9F24A] group-hover:text-[#071D29] flex items-center justify-center transition-colors shadow-inner">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/80 px-2 py-0.5 rounded-full">
                Investing
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-3.5 group-hover:text-[#D9F77A] transition-colors">
              Mutual Fund Guidance
            </h4>
            <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
              Simple guidance for understanding diversified investment options and monthly SIP compounding.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60 group-hover:text-[#C9F24A]">
            <span className="font-medium">Explore Funds</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Card 2: Insurance Planning */}
        <div
          onClick={() => onSelectService('life-insurance')}
          className="group bg-[#0B2733] hover:bg-[#123B43] p-5 rounded-3xl border border-white/10 hover:border-[#C9F24A]/40 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#123B43] group-hover:bg-[#C9F24A] text-[#C9F24A] group-hover:text-[#071D29] flex items-center justify-center transition-colors shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/80 px-2 py-0.5 rounded-full">
                Protection
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-3.5 group-hover:text-[#D9F77A] transition-colors">
              Insurance Planning
            </h4>
            <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
              Explore pure protection solutions and comprehensive medical coverage for yourself and family.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60 group-hover:text-[#C9F24A]">
            <span className="font-medium">Explore Insurance</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Card 3: Financial Solutions */}
        <div
          onClick={() => onSelectService('loans')}
          className="group bg-[#0B2733] hover:bg-[#123B43] p-5 rounded-3xl border border-white/10 hover:border-[#C9F24A]/40 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#123B43] group-hover:bg-[#C9F24A] text-[#C9F24A] group-hover:text-[#071D29] flex items-center justify-center transition-colors shadow-inner">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/80 px-2 py-0.5 rounded-full">
                Solutions
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-3.5 group-hover:text-[#D9F77A] transition-colors">
              Financial Solutions
            </h4>
            <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
              Understand loans, credit cards, stocks, and bonds in one place with zero marketing bias.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60 group-hover:text-[#C9F24A]">
            <span className="font-medium">Explore Solutions</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </div>
    </section>
  );
};
