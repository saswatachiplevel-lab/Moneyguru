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
    <section className="relative z-10 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 0: "Personalized Guidance" / How Can We Help? */}
        <div
          onClick={onLearnMore}
          className="group relative h-[210px] sm:h-[225px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#071D29]"
        >
          <img
            src="/consultation-card.jpg"
            alt="Personalized Guidance"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/80 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9F24A] bg-[#123B43]/90 px-2 py-0.5 rounded-full border border-[#C9F24A]/30">
                Personalized Guidance
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">How Can We Help?</h3>
            <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
              Explore tailored financial roadmaps and transparent advice designed for your family.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9F24A] transition-colors">
              <span>Learn More</span>
              <span className="w-4 h-4 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center text-[10px] transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
          </div>
        </div>

        {/* Card 1: "Investing" / Mutual Fund Guidance */}
        <div
          onClick={() => onSelectService('mutual-funds')}
          className="group relative h-[210px] sm:h-[225px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#071D29]"
        >
          <img
            src="/investing-card.jpg"
            alt="Mutual Fund Investing"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/80 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/90 px-2 py-0.5 rounded-full border border-[#C9F24A]/30">
                Investing
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-[#D9F77A] transition-colors">
              Mutual Fund Guidance
            </h3>
            <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
              Simple guidance for diversified funds and systematic monthly SIP compounding.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9F24A] transition-colors">
              <span>Explore Funds</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Card 2: "Protection" / Insurance Planning */}
        <div
          onClick={() => onSelectService('life-insurance')}
          className="group relative h-[210px] sm:h-[225px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#071D29]"
        >
          <img
            src="/protection-card.jpg"
            alt="Insurance Protection Planning"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/80 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/90 px-2 py-0.5 rounded-full border border-[#C9F24A]/30">
                Protection
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-[#D9F77A] transition-colors">
              Insurance Planning
            </h3>
            <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
              Explore pure term protection and comprehensive medical safety for your loved ones.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9F24A] transition-colors">
              <span>Explore Insurance</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Card 3: "Solutions" / Financial Solutions */}
        <div
          onClick={() => onSelectService('loans')}
          className="group relative h-[210px] sm:h-[225px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#071D29]"
        >
          <img
            src="/solutions-card.jpg"
            alt="Financial Solutions"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80";
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/80 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider bg-[#123B43]/90 px-2 py-0.5 rounded-full border border-[#C9F24A]/30">
                Solutions
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-[#D9F77A] transition-colors">
              Financial Solutions
            </h3>
            <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
              Understand loans, credit cards, stocks, and bonds in one place with zero marketing bias.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#C9F24A] transition-colors">
              <span>Explore Solutions</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
