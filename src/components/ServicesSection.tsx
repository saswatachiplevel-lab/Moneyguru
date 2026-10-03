import React, { useState } from 'react';
import {
  TrendingUp,
  Shield,
  HeartPulse,
  Building2,
  CreditCard,
  BarChart3,
  Landmark,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { FinancialService } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: FinancialService) => void;
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenConsultation,
}) => {
  const [filter, setFilter] = useState<'all' | 'invest' | 'protect' | 'borrow'>('all');

  const filteredServices = servicesData.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'invest') return ['mutual-funds', 'stocks', 'bonds'].includes(s.id);
    if (filter === 'protect') return ['life-insurance', 'health-insurance'].includes(s.id);
    if (filter === 'borrow') return ['loans', 'credit-cards'].includes(s.id);
    return true;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F7F8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-gray-200">
          <div>
            {/* Small Lime Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D29]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
                OUR SERVICES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092532] tracking-tight leading-[1.15] max-w-2xl">
              Financial Solutions Designed Around Your Goals
            </h2>
            <p className="mt-3 text-base text-[#607078] max-w-xl">
              Explore investment, protection, borrowing, and market-related financial solutions in one place, backed by unbiased advisory and zero jargon.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200'
              }`}
            >
              All Categories (7)
            </button>
            <button
              onClick={() => setFilter('invest')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === 'invest'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200'
              }`}
            >
              Wealth & Investing
            </button>
            <button
              onClick={() => setFilter('protect')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === 'protect'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200'
              }`}
            >
              Insurance Protection
            </button>
            <button
              onClick={() => setFilter('borrow')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === 'borrow'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200'
              }`}
            >
              Credit & Loans
            </button>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group bg-white rounded-[28px] overflow-hidden border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Consistent Aspect Ratio */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#071D29]/80 backdrop-blur-md text-[#C9F24A] px-3 py-1 rounded-full border border-white/10">
                    {service.category}
                  </span>
                </div>

                {/* Badge if available */}
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold bg-[#C9F24A] text-[#071D29] px-2.5 py-1 rounded-full shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Circular Lime Icon */}
                <div className="absolute -bottom-4 right-6 w-12 h-12 rounded-2xl bg-[#071D29] text-[#C9F24A] border-2 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:bg-[#C9F24A] group-hover:text-[#071D29]">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#092532] group-hover:text-[#123B43] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#C9F24A]-dark font-semibold text-[#123B43] mt-1">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#607078] mt-2.5 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#092532] group-hover:text-[#123B43] flex items-center gap-1">
                    Read Guide & Insights
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F7F8F5] group-hover:bg-[#C9F24A] text-[#092532] flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Consultation Ribbon */}
        <div className="mt-14 bg-[#071D29] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C9F24A] text-[#071D29] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Not sure which financial product to start with?</h4>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                Our advisors will review your current cash flow, debts, and future goals to design a personalized roadmap.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenConsultation('General Financial Guidance')}
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md active:scale-95"
          >
            <span>Talk to an Advisor</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
