import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Sparkles,
  ArrowUpRight,
  User as UserIcon
} from 'lucide-react';
import { auth, submitConsultation } from '../lib/firebase';
import type { User } from 'firebase/auth';

interface ContactConsultationSectionProps {
  preselectedService?: string;
  onOpenPortal?: () => void;
}

export const ContactConsultationSection: React.FC<ContactConsultationSectionProps> = ({
  preselectedService,
  onOpenPortal,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('General Financial Guidance');
  const [preferredContact, setPreferredContact] = useState<'Phone' | 'Email' | 'WhatsApp'>('Phone');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);

  // Status State
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        if (user.displayName && !name) setName(user.displayName);
        if (user.email && !email) setEmail(user.email);
        if (user.phoneNumber && !phone) setPhone(user.phoneNumber);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim() || name.length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid phone number with area/country code.');
      return;
    }
    if (!consent) {
      setErrorMessage('Please check the consent box to proceed with your enquiry.');
      return;
    }

    try {
      setSubmitting(true);
      const docId = await submitConsultation({
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        service,
        preferredContact,
        message: message.trim() || 'Requesting beginner-friendly consultation regarding financial planning options.',
        userId: currentUser?.uid || 'guest',
      });
      setSubmittedId(docId);
    } catch (err: unknown) {
      console.error('Error booking consultation:', err);
      setErrorMessage('Could not record your consultation at this time. Please try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedId(null);
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Headline & Trust Reassurance */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071D29]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
                LET'S TALK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092532] tracking-tight leading-[1.15]">
              Let's Start a Conversation About Your Financial Goals
            </h2>

            <p className="mt-4 text-base text-[#607078] leading-relaxed">
              Have questions about your first mutual fund SIP, choosing between term vs health insurance, or restructuring high-interest loans? Schedule a free introductory discussion with one of our certified advisors.
            </p>

            {/* Registered Distributor Information Card */}
            <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-[#071D29] text-white border border-[#C9F24A]/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9F24A]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#C9F24A] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C9F24A]">
                  AMFI-Registered Mutual Fund Distributor
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    SASWATA ROY
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/70">Registration ARN:</span>
                    <span className="text-xs font-mono font-bold bg-[#123B43] text-[#C9F24A] px-2.5 py-0.5 rounded-md border border-[#C9F24A]/30">
                      ARN- 136048
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-white/60 block">Direct Mobile / Consultation Line:</span>
                  <a
                    href="tel:6291390883"
                    className="text-base sm:text-lg font-bold text-[#C9F24A] hover:text-[#D9F77A] transition-colors flex items-center gap-2 mt-0.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>6291390883</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:6291390883"
                    className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all border border-white/15 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9F24A]" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/916291390883?text=Hi%20Saswata,%20I%20would%20like%20to%20consult%20regarding%20financial%20guidance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3 Trust Points */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F8F5] border border-gray-200">
                <div className="w-8 h-8 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#092532]">Beginner-Friendly Experience</h4>
                  <p className="text-[11px] text-[#607078]">We start with basic fundamentals at your own comfort level.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F8F5] border border-gray-200">
                <div className="w-8 h-8 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#092532]">Zero Confusing Jargon</h4>
                  <p className="text-[11px] text-[#607078]">Plain language explanations of every fee, rule, and risk.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F7F8F5] border border-gray-200">
                <div className="w-8 h-8 rounded-xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#092532]">Personalized Conversation</h4>
                  <p className="text-[11px] text-[#607078]">Recommendations structured strictly around your specific priorities.</p>
                </div>
              </div>
            </div>

            {/* Signed In Quick Note */}
            {currentUser && (
              <div className="mt-6 p-4 rounded-2xl bg-[#123B43]/10 border border-[#123B43]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <UserIcon className="w-4 h-4 text-[#123B43]" />
                  <span className="text-xs text-[#092532]">
                    Logged in as <strong>{currentUser.email}</strong>
                  </span>
                </div>
                {onOpenPortal && (
                  <button
                    onClick={onOpenPortal}
                    className="text-xs font-bold text-[#123B43] hover:underline"
                  >
                    View My Bookings →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Premium Contact Form */}
          <div className="lg:col-span-7 bg-[#F7F8F5] p-6 sm:p-10 rounded-[32px] border border-gray-200/90 shadow-lg relative">
            
            {submittedId ? (
              <div className="py-8 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#C9F24A] text-[#071D29] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <CheckCircle2 className="w-8 h-8 stroke-[3]" />
                </div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#071D29] bg-[#C9F24A] px-3 py-1 rounded-full">
                  Consultation Request Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#092532] mt-3">
                  Thank You, {name.split(' ')[0]}!
                </h3>
                <p className="text-sm text-[#607078] mt-3 max-w-md mx-auto leading-relaxed">
                  Your enquiry for <strong>{service}</strong> has been logged in our secure system. One of our advisors will reach out via your preferred channel (<strong>{preferredContact}</strong>) shortly.
                </p>

                <div className="mt-6 p-4 bg-white rounded-2xl border border-gray-200 max-w-sm mx-auto text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference ID:</span>
                    <span className="font-mono font-bold text-[#071D29]">{submittedId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium text-[#071D29]">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-semibold text-emerald-700">Scheduled for Advisory Desk</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="text-xs font-bold text-[#071D29] bg-white border border-gray-300 px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Submit Another Query
                  </button>
                  {onOpenPortal && (
                    <button
                      onClick={onOpenPortal}
                      className="text-xs font-bold text-[#071D29] bg-[#C9F24A] px-5 py-2.5 rounded-full hover:bg-[#D9F77A] transition-colors"
                    >
                      View in My Portal
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-[#092532]">Book a Free Consultation</h3>
                  <p className="text-xs text-[#607078] mt-0.5">
                    No obligations, strictly educational guidance.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-[#092532] focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-[#092532] focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-[#092532] focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent transition-all"
                  />
                </div>

                {/* What are you interested in? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                      What are you interested in?
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-[#092532] focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="Mutual Funds">Mutual Funds</option>
                      <option value="Life Insurance">Life Insurance</option>
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Loans">Loans & Mortgages</option>
                      <option value="Credit Cards">Credit Cards</option>
                      <option value="Stocks & Bonds">Stocks & Bonds</option>
                      <option value="General Financial Guidance">General Financial Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Phone', 'Email', 'WhatsApp'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPreferredContact(method)}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                            preferredContact === method
                              ? 'bg-[#071D29] text-white border-[#071D29] shadow-sm'
                              : 'bg-white text-[#607078] border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#092532] mb-1.5">
                    Specific Questions or Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about what you would like to understand better (e.g. 'I want to start a 5k SIP and understand term insurance requirements')..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-[#092532] focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#071D29] focus:ring-[#071D29] accent-[#071D29] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-[#607078] leading-normal cursor-pointer select-none">
                    I agree to be contacted by Moneyguru Financial Services regarding my consultation enquiry. We strictly protect your privacy and never sell user information.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full group flex items-center justify-center gap-3 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-sm sm:text-base py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Submitting Your Request...' : 'Request a Consultation'}</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#607078]">
                  <Shield className="w-3.5 h-3.5 text-[#123B43]" />
                  <span>Your information is encrypted & preserved under strict privacy rules.</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
