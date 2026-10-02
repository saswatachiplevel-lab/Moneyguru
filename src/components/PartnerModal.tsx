import React, { useState } from 'react';
import { X, Handshake, CheckCircle2, AlertCircle, Send, Shield } from 'lucide-react';
import { submitPartnerInquiry, auth } from '../lib/firebase';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnershipType, setPartnershipType] = useState('Referral Partner');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid business email.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }

    try {
      setLoading(true);
      const docId = await submitPartnerInquiry({
        fullName: fullName.trim(),
        organization: organization.trim() || 'Independent Professional',
        email: email.trim(),
        phone: cleanPhone,
        partnershipType,
        message: message.trim() || 'Expressed interest in partnering with Moneyguru Financial Services.',
        userId: auth.currentUser?.uid || 'guest',
      });
      setSuccessId(docId);
    } catch (err) {
      console.error('Partner submission error:', err);
      setErrorMessage('Failed to submit partner application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071D29]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {successId ? (
          <div className="py-8 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#092532]">Partnership Application Logged</h3>
            <p className="text-xs sm:text-sm text-[#607078] mt-2 max-w-md mx-auto">
              Thank you, <strong>{fullName}</strong>. Our institutional and partnership desk will review your proposal and get in touch within 1–2 business days.
            </p>
            <p className="text-[11px] font-mono text-gray-400 mt-4">
              Inquiry Ref: {successId}
            </p>
            <div className="mt-6">
              <button
                onClick={handleReset}
                className="bg-[#071D29] text-[#C9F24A] font-bold text-xs px-6 py-2.5 rounded-full hover:bg-[#0B2733] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#092532]">Partner With Moneyguru</h3>
                <p className="text-xs text-[#607078]">Collaborate on wellness workshops, corporate seminars, and client advisory.</p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Iyer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                  Organization / Firm
                </label>
                <input
                  type="text"
                  placeholder="e.g. TechCorp / FinLegal"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                Partnership Category
              </label>
              <select
                value={partnershipType}
                onChange={(e) => setPartnershipType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
              >
                <option value="Referral Partner">Referral Partner / Affiliate</option>
                <option value="Corporate Wellness">Corporate Employee Financial Wellness</option>
                <option value="Financial Advisory Associate">Financial Advisory Associate (CA / Tax Advisor)</option>
                <option value="Strategic Distribution">Strategic Distribution Network</option>
                <option value="Other">Other Strategic Opportunity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#092532] uppercase mb-1">
                Proposal / Message
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe how you would like to collaborate..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                <span>{loading ? 'Submitting Application...' : 'Submit Partnership Proposal'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#607078]">
              <Shield className="w-3.5 h-3.5 text-[#123B43]" />
              <span>Strictly confidential and non-binding preliminary inquiry.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
