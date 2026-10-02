import React from 'react';
import { Handshake, CheckCircle2, ArrowUpRight, Building, Award } from 'lucide-react';

interface PartnerSectionProps {
  onOpenPartnerModal: () => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ onOpenPartnerModal }) => {
  const benefits = [
    {
      title: 'Simple Collaboration Process',
      desc: 'Seamless onboarding for corporate HRs, chartered accountants, legal firms, and affiliates.',
    },
    {
      title: 'Access to All 7 Categories',
      desc: 'Offer your clients or employees comprehensive advisory across funds, insurance, debt, and equities.',
    },
    {
      title: 'Dedicated Professional Support',
      desc: 'Direct access to senior financial specialists for complex case reviews and custom presentations.',
    },
    {
      title: 'Relationship-Focused Approach',
      desc: 'Transparent reporting, ethical client handling, and long-term mutual growth.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#071D29] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#123B43]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Copy & Benefits */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Lime Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123B43] border border-[#C9F24A]/30 w-fit mb-5">
              <Handshake className="w-4 h-4 text-[#C9F24A]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C9F24A]">
                PARTNER WITH MONEYGURU
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.15]">
              Build Meaningful Financial Relationships Together
            </h2>

            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              Are you an organization looking to offer employee financial wellness workshops, or an independent professional seeking trusted financial guidance for your clients? Collaborate with Moneyguru to expand access to objective financial guidance.
            </p>

            {/* Benefits Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{b.title}</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed pl-7">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                onClick={onOpenPartnerModal}
                className="group flex items-center gap-3 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-xl shadow-[#C9F24A]/20 active:scale-95"
              >
                <span>Become a Partner</span>
                <span className="w-6 h-6 rounded-full bg-[#071D29] text-[#C9F24A] flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Partnership Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Corporate professionals collaborating on financial partnership"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D29]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B2733]/90 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C9F24A] text-[#071D29] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Institutional Standards</p>
                    <p className="text-[11px] text-white/70">Ethical data privacy & rigorous compliance</p>
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
