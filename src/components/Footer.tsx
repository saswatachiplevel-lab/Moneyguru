import React from 'react';
import { ArrowUpRight, ShieldCheck, Mail, Phone, Clock, FileText } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
  onOpenConsultation: (service?: string) => void;
  onSelectServiceById: (id: string) => void;
  onOpenPartner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  onOpenConsultation,
  onSelectServiceById,
  onOpenPartner,
}) => {
  return (
    <footer className="bg-[#071D29] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#123B43] border border-[#C9F24A]/40 flex items-center justify-center">
                <span className="text-[#C9F24A] font-bold text-lg leading-none">M</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9F24A] -ml-0.5 mt-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight leading-none">
                  Moneyguru
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C9F24A] font-semibold mt-0.5">
                  Financial Services
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm mt-3">
              Clear, practical financial guidance across investments, insurance, loans, credit, stocks, and bonds. Helping beginners build long-term wealth with total peace of mind.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C9F24A]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/80 font-medium">
                Regulated products & unbiased advisory
              </span>
            </div>
          </div>

          {/* Column 2: Financial Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#C9F24A] mb-4">
              Financial Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onSelectServiceById('mutual-funds')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Mutual Funds (SIP & Lumpsum)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('life-insurance')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Life & Term Insurance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('health-insurance')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Health Insurance & Critical Illness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('loans')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Loans & EMI Planning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('credit-cards')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Credit Cards & Score Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('stocks')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Stocks & Equity Markets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectServiceById('bonds')}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Bonds & Fixed Income Securities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#C9F24A] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <a href="#about" className="hover:text-[#C9F24A] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9F24A] transition-colors">
                  Services Overview
                </a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-[#C9F24A] transition-colors">
                  SIP & EMI Calculators
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#C9F24A] transition-colors">
                  Beginner Roadmap
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-[#C9F24A] transition-colors">
                  Financial Insights
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPartner}
                  className="hover:text-[#C9F24A] transition-colors"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C9F24A] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory Desk & AMFI Credentials (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#C9F24A] mb-4">
              AMFI Distributor Desk
            </h4>
            
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <p className="text-xs font-bold text-white uppercase tracking-wide">
                SASWATA ROY
              </p>
              <p className="text-[11px] text-[#C9F24A] font-semibold mt-0.5">
                AMFI-Registered Mutual Fund Distributor
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[11px] text-white/80">
                <span className="text-white/50">ARN:</span>
                <span className="font-mono font-bold text-[#C9F24A]">136048</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-white/80">
                <span className="text-white/50">Mobile:</span>
                <a href="tel:6291390883" className="font-bold text-white hover:text-[#C9F24A] transition-colors">
                  6291390883
                </a>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultation()}
              className="w-full flex items-center justify-center gap-2 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9F24A]" />
                <span>Mon – Sat: 9:30 AM – 6:30 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer Banner */}
        <div className="py-6 border-b border-white/10 text-[11px] text-white/60 leading-relaxed">
          <p>
            <strong className="text-white/90">Distributor Disclosure:</strong> SASWATA ROY is an AMFI-registered Mutual Fund Distributor (ARN- 136048, Mobile: 6291390883). Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Information published on this website is for general educational and informational purposes only.
          </p>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Moneyguru Financial Services. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </button>
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Risk Disclosures
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
