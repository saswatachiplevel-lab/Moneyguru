import React from 'react';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FeaturedGuidanceProps {
  onOpenConsultation: () => void;
}

export const FeaturedGuidance: React.FC<FeaturedGuidanceProps> = ({ onOpenConsultation }) => {
  const checklists = [
    {
      title: 'Simple, Human Explanations',
      desc: 'We translate complex prospectus jargon into clear, plain-language insights anyone can follow.',
    },
    {
      title: 'Goal-Oriented Discussions',
      desc: 'Every recommendation starts with your real-life milestones, emergency cushions, and time horizons.',
    },
    {
      title: 'Integrated Financial Solutions',
      desc: 'Unbiased guidance coordinating investments, insurance protection, loans, and bonds together.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0B2733] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#123B43]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Dark Navy Content Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Small Lime Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123B43] border border-[#C9F24A]/30 w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C9F24A]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C9F24A]">
                SMARTER FINANCIAL DECISIONS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.15]">
              Understand Your Options Before You Decide
            </h2>

            <p className="mt-5 text-base text-white/80 leading-relaxed">
              Financial missteps usually happen when products are purchased without understanding how they work or how they fit your broader life. Moneyguru focuses strictly on education and transparent comparisons before you commit a single rupee.
            </p>

            {/* Checklist Items */}
            <div className="mt-8 space-y-5">
              {checklists.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                onClick={onOpenConsultation}
                className="group flex items-center gap-3 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-xl shadow-[#C9F24A]/20 active:scale-95"
              >
                <span>Talk to Our Team</span>
                <span className="w-6 h-6 rounded-full bg-[#071D29] text-[#C9F24A] flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

          </div>

          {/* RIGHT: Large Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80"
                alt="Financial advisor reviewing tailored portfolio with client"
                className="w-full h-[420px] sm:h-[490px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D29]/80 via-transparent to-transparent" />
              
              {/* Bottom Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#071D29]/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#123B43] flex items-center justify-center text-[#C9F24A] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Client-First Standard</p>
                    <p className="text-[11px] text-white/70">
                      Independent analysis without product distributor quotas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
