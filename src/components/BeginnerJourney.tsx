import React from 'react';
import { Target, Compass, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { StepItem } from '../types';

interface BeginnerJourneyProps {
  onOpenConsultation: () => void;
}

export const BeginnerJourney: React.FC<BeginnerJourneyProps> = ({ onOpenConsultation }) => {
  const steps: (StepItem & { icon: React.ReactNode })[] = [
    {
      number: '01',
      title: 'Tell Us Your Goals',
      description: 'Understand what you are trying to achieve.',
      detail: 'Whether you want to build an emergency fund, buy a home, or secure child education, we start with your life priorities.',
      icon: <Target className="w-5 h-5" />,
    },
    {
      number: '02',
      title: 'Explore Your Options',
      description: 'Learn how different solutions work.',
      detail: 'We demystify mutual funds, insurance, debt instruments, and loans without confusing jargon or high-pressure pitches.',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      number: '03',
      title: 'Understand the Trade-Offs',
      description: 'Examine suitability, cost, risk, and time horizon.',
      detail: 'Every financial product has pros, cons, tax treatment, and liquidity terms. We lay out the complete, transparent picture.',
      icon: <Scale className="w-5 h-5" />,
    },
    {
      number: '04',
      title: 'Move Forward With Clarity',
      description: 'Make informed decisions with confidence.',
      detail: 'Begin with manageable automated steps, track your progress systematically, and adapt as your lifestyle evolves.',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  return (
    <section id="journey" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#071D29]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
              FOR BEGINNERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092532] tracking-tight">
            Your Financial Journey, Simplified
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#607078]">
            Getting started can be easier when financial decisions are broken into four clear, manageable milestones. No guesswork, no jargon.
          </p>
        </div>

        {/* Desktop Connected Steps Layout */}
        <div className="mt-16 hidden lg:block relative">
          
          {/* Subtle Horizontal Connecting Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] -translate-y-8 h-1 bg-gray-200 -z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#071D29] via-[#C9F24A] to-[#123B43] opacity-40" />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group bg-[#F7F8F5] hover:bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#123B43]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header with Lime Marker */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-[#071D29] bg-[#C9F24A] px-2.5 py-1 rounded-lg">
                      STEP {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center transition-transform group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#092532] mt-3 group-hover:text-[#123B43] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#123B43] mt-1">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#607078] mt-2.5 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-200/60 flex items-center text-[11px] font-bold text-[#092532] group-hover:text-[#123B43]">
                  <span>Phase {idx + 1} Guidance</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="mt-12 lg:hidden space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F7F8F5] rounded-2xl p-5 border border-gray-200 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#071D29] text-[#C9F24A] font-extrabold text-sm flex items-center justify-center shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#092532]">{step.title}</h3>
                <p className="text-xs font-semibold text-[#123B43] mt-0.5">{step.description}</p>
                <p className="text-xs text-[#607078] mt-2 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 bg-[#071D29] hover:bg-[#0B2733] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md active:scale-95"
          >
            <span>Start Step 01 With an Advisor</span>
            <ArrowRight className="w-4 h-4 text-[#C9F24A]" />
          </button>
        </div>

      </div>
    </section>
  );
};
