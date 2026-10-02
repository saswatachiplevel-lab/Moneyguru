import React from 'react';
import { CheckCircle, ArrowUpRight, Compass, Target, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMore,
  onOpenConsultation,
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Large Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Moneyguru financial advisors collaborating with clients"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D29]/70 via-transparent to-transparent" />
              
              {/* Floating Reassurance Tag on Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#123B43] flex items-center justify-center text-[#C9F24A]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#092532]">Objective & Client-First</p>
                    <p className="text-[11px] text-[#607078]">No aggressive sales quotas or biased pitches</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle decorative lime dot cluster */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C9F24A]/20 rounded-full blur-2xl -z-10" />
          </div>

          {/* RIGHT COLUMN: Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Small Lime Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D29]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
                ABOUT MONEYGURU
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092532] tracking-tight leading-[1.15]">
              Financial Guidance Made Easier to Understand
            </h2>

            {/* Body Copy */}
            <p className="mt-5 text-base sm:text-lg text-[#607078] leading-relaxed">
              At Moneyguru Financial Services, we believe that taking control of your financial destiny should not require deciphering hundred-page prospectuses or overwhelming financial jargon. We help beginner investors, families, and salaried professionals gain practical clarity across investments, insurance, loans, and wealth planning.
            </p>

            {/* Two Feature Blocks */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Feature 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F8F5] border border-gray-200/80 hover:border-[#123B43]/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center mb-3 shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#092532]">Clear Guidance</h3>
                <p className="text-xs text-[#607078] mt-1.5 leading-relaxed">
                  We explain financial options in straightforward language so you truly understand the risks and rewards of every decision.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F8F5] border border-gray-200/80 hover:border-[#123B43]/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center mb-3 shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#092532]">Goal-Focused Approach</h3>
                <p className="text-xs text-[#607078] mt-1.5 leading-relaxed">
                  We begin with your unique family milestones and cash flow priorities before discussing any suitable financial products.
                </p>
              </div>

            </div>

            {/* Horizontal CTA Banner (matches reference banner composition) */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#071D29] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#C9F24A] flex items-center justify-center text-[#071D29] shrink-0">
                  <CheckCircle className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Start your financial conversation today
                </p>
              </div>

              <button
                onClick={onOpenConsultation}
                className="group flex items-center justify-center gap-2 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all shrink-0"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
