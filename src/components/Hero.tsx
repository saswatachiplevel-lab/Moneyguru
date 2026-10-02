import React from 'react';
import { ArrowUpRight, Play, Star, Sparkles, Shield, Users } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenHowItWorks,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[760px] lg:min-h-[840px] pt-32 pb-20 sm:pb-28 overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(180deg, #071B27 0%, #0B2935 55%, #254F57 88%, #41636A 100%)',
      }}
    >
      {/* Subtle Grid and Radial Light Accents */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9F24A 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#123B43]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-[#C9F24A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Small Lime Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123B43]/80 border border-[#C9F24A]/30 w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9F24A] animate-ping" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C9F24A]">
                SMART FINANCIAL GUIDANCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-xl">
              Build Your Financial Future With <span className="text-[#C9F24A] underline decoration-[#C9F24A]/30 decoration-wavy decoration-2">Clarity</span> & Confidence
            </h1>

            {/* Supporting Paragraph */}
            <p className="mt-6 text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-lg">
              From investments and insurance to loans and credit solutions, Moneyguru helps you understand your options and make informed financial decisions with confidence.
            </p>

            {/* Action Buttons (Primary Lime & Secondary Play style) */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onOpenConsultation}
                className="group flex items-center gap-3 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-full transition-all shadow-xl shadow-[#C9F24A]/20 hover:shadow-2xl hover:shadow-[#C9F24A]/30 active:scale-95"
              >
                <span>Book a Free Consultation</span>
                <span className="w-6 h-6 rounded-full bg-[#071D29] text-[#C9F24A] flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={onOpenHowItWorks}
                className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base px-5 py-3.5 rounded-full transition-all backdrop-blur-sm"
              >
                <span className="w-7 h-7 rounded-full bg-[#123B43] flex items-center justify-center text-[#C9F24A] border border-[#C9F24A]/30 group-hover:scale-105 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-[#C9F24A]" />
                </span>
                <span>How It Works</span>
              </button>
            </div>

            {/* Trust Reassurance Row */}
            <div className="mt-10 pt-7 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#C9F24A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9F24A]" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Trusted Guidance</p>
                  <p className="text-[11px] text-white/60 mt-0.5">Clear & Objective Advice</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#123B43] flex items-center justify-center text-[#C9F24A]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">Beginner-Friendly</p>
                  <p className="text-[11px] text-white/60 mt-0.5">No Prior Experience Needed</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Hero Visual Focal Point */}
          <div className="lg:col-span-6 xl:col-span-6">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
