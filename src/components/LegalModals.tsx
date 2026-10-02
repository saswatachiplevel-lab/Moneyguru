import React from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071D29]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#071D29] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && <Shield className="w-5 h-5 text-[#C9F24A]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#C9F24A]" />}
            {type === 'disclaimer' && <AlertTriangle className="w-5 h-5 text-[#C9F24A]" />}
            <div>
              <h3 className="text-lg font-bold">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms & Conditions'}
                {type === 'disclaimer' && 'Risk Disclosures & Regulatory Disclaimer'}
              </h3>
              <p className="text-[11px] text-white/60">Moneyguru Financial Services</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Legal Text */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#092532] text-xs sm:text-sm leading-relaxed">
          
          {type === 'privacy' && (
            <div className="space-y-4 text-[#607078]">
              <div>
                <h4 className="font-bold text-[#092532] text-sm">1. Introduction</h4>
                <p>Moneyguru Financial Services ("we", "our", or "us") is dedicated to safeguarding the privacy and confidentiality of individuals who visit our website, submit consultation inquiries, and access our educational financial planning resources.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">2. Information We Collect</h4>
                <p>We collect basic identifying information that you voluntarily provide to us when requesting a consultation, such as your full name, email address, phone number, and preferred communication method.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">3. Information Submitted Through Forms</h4>
                <p>Any details shared through our consultation booking, partnership inquiries, or investor questionnaire (such as risk comfort level or financial service interest) are collected strictly to enable an informed, relevant introductory discussion.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">4. How Information Is Used</h4>
                <p>We use your information solely to schedule appointments, respond to enquiries, tailor educational resources, verify authentication via Firebase Auth, and improve the user experience across our platform. We do not sell or rent your personal information.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">5. Cookies and Analytics</h4>
                <p>We may use minimal session cookies and local storage to remember authentication states and client preferences for seamless usability.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">6. Third-Party Services</h4>
                <p>Our application uses secure cloud infrastructure provided by Google Cloud and Firebase for data storage and user authentication. These providers operate under stringent global security and compliance certifications.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">7. Data Security</h4>
                <p>We implement industry-standard encryption, strict access control rules, and tokenized session validation to prevent unauthorized access or disclosure of personal data.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">8. Data Retention</h4>
                <p>Client inquiry data is retained only for as long as necessary to fulfill the consultation purpose and comply with applicable record-keeping guidelines.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">9. User Rights</h4>
                <p>You have the right to request access to the personal data we hold about you, request corrections, or ask for deletion of your profile by reaching out to our advisory team.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">10. Contact Information</h4>
                <p>For inquiries regarding this Privacy Policy, please reach out through our online consultation portal or website contact form.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">11. Policy Updates</h4>
                <p>We reserve the right to amend this Privacy Policy periodically. Continued use of our website signifies acceptance of any updated terms.</p>
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4 text-[#607078]">
              <div>
                <h4 className="font-bold text-[#092532] text-sm">1. Terms of Use</h4>
                <p>By browsing this website or scheduling an appointment with Moneyguru Financial Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">2. Informational & Educational Scope</h4>
                <p>All content, tools, calculators, articles, and service overviews provided on this website are intended solely for general informational and educational purposes. Nothing on this website constitutes a binding offer to buy, sell, or subscribe to any financial security or policy.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">3. Client Responsibilities</h4>
                <p>Clients are solely responsible for ensuring the accuracy of all information submitted on application forms, disclosing all relevant medical and financial histories to insurance and lending institutions, and reviewing final contract documentation before executing any transaction.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">4. Limitation of Liability</h4>
                <p>Moneyguru Financial Services and its consultants shall not be liable for any direct, indirect, incidental, or consequential losses resulting from market volatility, regulatory changes, or third-party institutional actions.</p>
              </div>
            </div>
          )}

          {type === 'disclaimer' && (
            <div className="space-y-4 text-[#607078]">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                Please read this financial risk disclosure carefully before making any decisions regarding investments, insurance, or credit instruments.
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">1. Market Volatility & Risk of Loss</h4>
                <p>Mutual fund investments, stocks, and bond yields are subject to market risks. Values fluctuate in response to economic trends, corporate earnings, interest rate shifts, and liquidity conditions. Principal capital is not guaranteed, and past performance is never a reliable predictor of future returns.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">2. Insurance Disclosures</h4>
                <p>Insurance is a subject matter of solicitation. Policy terms, exclusions, sub-limits, waiting periods, and deductibles vary across insurers. Please review the detailed policy prospectus and claim settlement conditions before purchasing any term or health plan.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">3. Borrowing & Credit Responsibility</h4>
                <p>Borrowing involves legal repayment commitments. Failure to make timely EMI or credit card payments will result in penal compounding interest, processing penalties, and adverse reporting to credit bureaus (e.g. CIBIL), impairing your future borrowing capability.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#092532] text-sm">4. Independent Advice</h4>
                <p>Every individual’s financial standing, tax bracket, and risk capacity is distinct. We strongly encourage visitors to seek individualized professional advice before committing capital.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-700 bg-white border border-gray-300 px-5 py-2 rounded-full hover:bg-gray-100"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
};
