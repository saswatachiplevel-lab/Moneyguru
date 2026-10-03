import React from 'react';
import { X, CheckCircle2, AlertTriangle, Lightbulb, ArrowUpRight, Shield } from 'lucide-react';
import { FinancialService } from '../types';

interface ServiceDetailModalProps {
  service: FinancialService | null;
  onClose: () => void;
  onBookConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookConsultation,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071D29]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header with Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C9F24A] text-[#071D29] px-3 py-1 rounded-full">
              {service.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#092532]">
          
          {/* Detailed Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#123B43] mb-2">
              Understanding the Basics
            </h3>
            <p className="text-sm sm:text-base text-[#607078] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Advantages */}
          <div className="p-5 rounded-2xl bg-[#F7F8F5] border border-gray-200">
            <h3 className="text-sm font-bold text-[#092532] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#123B43]" />
              Key Benefits & Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#607078]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#071D29] mt-2 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beginner Tips */}
          <div className="p-5 rounded-2xl bg-[#123B43]/5 border border-[#123B43]/20">
            <h3 className="text-sm font-bold text-[#123B43] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#071D29]" />
              Moneyguru Guidance for Beginners
            </h3>
            <ul className="space-y-2">
              {service.beginnerTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#092532]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9F24A] mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Considerations / Risks */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <h3 className="text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Important Considerations & Disclosures
            </h3>
            <ul className="space-y-1">
              {service.keyConsiderations.map((c, idx) => (
                <li key={idx} className="text-xs text-amber-800 leading-relaxed">
                  • {c}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-[#607078] text-center sm:text-left">
            Have questions about suitability for your personal profile?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation(service.title);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#071D29] hover:bg-[#0B2733] text-[#C9F24A] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
