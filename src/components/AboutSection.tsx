import React, { useState, useRef } from 'react';
import { CheckCircle, ArrowUpRight, Compass, Target, Sparkles, Camera, RotateCcw } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMore,
  onOpenConsultation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem('moneyguru_advisor_photo') || '/about-portrait.jpg';
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          try {
            localStorage.setItem('moneyguru_advisor_photo', result);
          } catch (err) {
            console.warn('Could not cache photo to localStorage:', err);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('moneyguru_advisor_photo');
    setPhotoSrc('/about-portrait.jpg');
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Large Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-gray-100 group bg-gray-100">
              <img
                src={photoSrc}
                alt="Saswata Roy - AMFI-Registered Mutual Fund Distributor"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // If local image fails, fallback to high-availability CDN portrait or SVG
                  if (photoSrc !== 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85') {
                    setPhotoSrc('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85');
                  } else {
                    e.currentTarget.src = '/saswata-roy.svg';
                  }
                }}
                className="w-full h-[440px] sm:h-[500px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D29]/80 via-transparent to-transparent pointer-events-none" />

              {/* Photo Upload / Reload Action on Hover */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload or reload your custom portrait photo"
                  className="px-3 py-1.5 rounded-full bg-[#071D29]/80 hover:bg-[#071D29] text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1.5 transition-all opacity-85 group-hover:opacity-100"
                >
                  <Camera className="w-3.5 h-3.5 text-[#C9F24A]" />
                  <span>Update Photo</span>
                </button>
                {photoSrc !== '/about-portrait.jpg' && (
                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    title="Reset to default photo"
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              
              {/* Floating Credential Tag on Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#071D29]/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#123B43] flex items-center justify-center text-[#C9F24A] shrink-0 border border-[#C9F24A]/40">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                      SASWATA ROY
                    </p>
                    <p className="text-[11px] text-[#C9F24A] font-semibold">
                      AMFI-Registered Mutual Fund Distributor • ARN- 136048
                    </p>
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

            {/* Horizontal CTA Banner */}
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
