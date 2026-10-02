import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '7+',
      label: 'Financial Categories',
      description: 'Mutual funds, insurance, loans, cards, stocks, and bonds under one roof.',
    },
    {
      value: '1',
      label: 'Unified Destination',
      description: 'One trusted advisory to coordinate your investments, protection, and credit.',
    },
    {
      value: '100%',
      label: 'Beginner Friendly',
      description: 'Zero confusing jargon, zero intimidating formulas, complete clarity.',
    },
    {
      value: '360°',
      label: 'Guidance Approach',
      description: 'Comprehensive analysis evaluating cash flow, tax efficiency, and long-term milestones.',
    },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col group">
              {/* Thin Lime Accent Line Above Statistic (per specification) */}
              <div className="w-12 h-1 bg-[#C9F24A] rounded-full mb-4 transition-all duration-300 group-hover:w-20" />
              
              {/* Stat Value */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-[#071D29] tracking-tight">
                  {item.value}
                </span>
              </div>

              {/* Stat Label & Description */}
              <h4 className="text-sm sm:text-base font-bold text-[#092532] mt-2">
                {item.label}
              </h4>
              <p className="text-xs text-[#607078] mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
