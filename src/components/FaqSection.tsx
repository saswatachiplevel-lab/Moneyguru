import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Search,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'mutual-funds' | 'insurance' | 'loans';
  categoryLabel: string;
  question: string;
  answer: string;
  highlightTag?: string;
}

const FAQ_DATA: FaqItem[] = [
  // --- MUTUAL FUNDS ---
  {
    id: 'mf-1',
    category: 'mutual-funds',
    categoryLabel: 'Mutual Funds & SIP',
    highlightTag: 'Beginner Essential',
    question: 'How much money do I need to start a Mutual Fund SIP in India?',
    answer:
      'You can start an equity or debt mutual fund SIP (Systematic Investment Plan) with as little as ₹500 per month. SIPs allow you to automate regular monthly investments, benefiting from Rupee Cost Averaging and power of compounding without needing a lump-sum amount.',
  },
  {
    id: 'mf-2',
    category: 'mutual-funds',
    categoryLabel: 'Mutual Funds & SIP',
    question: 'What is the key difference between Direct Plans and Regular Plans?',
    answer:
      'Direct plans are purchased directly from Asset Management Companies (AMCs) without intermediary distributor commissions, having a slightly lower expense ratio. Regular plans are transacted through AMFI-registered Mutual Fund Distributors (like Saswata Roy, ARN- 136048) who provide ongoing personalized portfolio guidance, scheme rebalancing recommendations, tax harvesting support, and dedicated operational assistance throughout market cycles.',
  },
  {
    id: 'mf-3',
    category: 'mutual-funds',
    categoryLabel: 'Mutual Funds & SIP',
    highlightTag: 'Tax Planning',
    question: 'Can mutual funds help me save income tax under Section 80C?',
    answer:
      'Yes, ELSS (Equity Linked Savings Schemes) offer tax deductions of up to ₹1.5 Lakh per financial year under Section 80C of the Income Tax Act. ELSS has the shortest mandatory lock-in period (3 years) among all 80C options (compared to 5 years for Tax Saver FDs and 15 years for PPF) while providing long-term equity growth potential.',
  },
  {
    id: 'mf-4',
    category: 'mutual-funds',
    categoryLabel: 'Mutual Funds & SIP',
    question: 'Are returns from mutual funds guaranteed?',
    answer:
      'No, mutual fund investments are subject to market risks and returns are not guaranteed. Equity funds fluctuate with stock market movements and are suitable for long-term horizons (3–7+ years), whereas debt funds invest in fixed-income securities offering stability for short-to-medium horizons. A diversified asset allocation across equities and debt protects your capital against localized market swings.',
  },

  // --- INSURANCE ---
  {
    id: 'ins-1',
    category: 'insurance',
    categoryLabel: 'Insurance Planning',
    highlightTag: 'Life Protection',
    question: 'Why is Pure Term Insurance recommended over Endowment or ULIP policies?',
    answer:
      'Pure Term Life Insurance provides maximum financial protection for your dependents at the lowest annual premium. For example, a healthy 30-year-old non-smoker can secure a ₹1 Crore coverage for ~₹10,000–₹14,000 per year. Combining term insurance with dedicated mutual fund SIPs typically produces far higher wealth and better coverage than bundled investment-insurance policies (like endowment or traditional ULIPs).',
  },
  {
    id: 'ins-2',
    category: 'insurance',
    categoryLabel: 'Insurance Planning',
    question: 'How much health insurance coverage does a family of four actually need?',
    answer:
      'Given double-digit healthcare inflation in tier-1/tier-2 Indian cities, a baseline family floater of ₹15–₹25 Lakh is recommended, supplemented by a Super Top-Up policy (e.g. ₹50 Lakh with a ₹10 Lakh deductible) for low-cost catastrophic protection. Relying solely on corporate employer health insurance is risky, as coverage terminates immediately upon job transitions.',
  },
  {
    id: 'ins-3',
    category: 'insurance',
    categoryLabel: 'Insurance Planning',
    highlightTag: 'Claim Settlement',
    question: 'What is a pre-existing disease (PED) waiting period in Health Insurance?',
    answer:
      'A Pre-Existing Disease (PED) is any medical condition diagnosed or treated within 36 to 48 months before purchasing a health policy. IRDAI guidelines specify standard waiting periods (typically 1 to 3 years) before claims related to declared PEDs are honored. Full transparency at the time of proposal ensures smooth cashless claim settlements when you need it most.',
  },

  // --- LOANS & DEBT ---
  {
    id: 'loan-1',
    category: 'loans',
    categoryLabel: 'Loans & Debt Strategy',
    highlightTag: 'Smart Math',
    question: 'Should I prepay my Home Loan early or invest that surplus cash in Mutual Funds?',
    answer:
      'This depends on your loan interest rate versus expected post-tax investment return. If your home loan is at 8.5% and long-term equity SIPs historically generate 12–14%, continuing your systematic investment strategy often creates substantially higher net worth over 15–20 years. However, high-interest consumer debt (personal loans at 14–18% or credit cards at 36–42%) should ALWAYS be cleared before making non-emergency investments.',
  },
  {
    id: 'loan-2',
    category: 'loans',
    categoryLabel: 'Loans & Debt Strategy',
    question: 'How does high credit card balance utilization damage my CIBIL credit score?',
    answer:
      'Credit Bureaus track your Credit Utilization Ratio (CUR) — the percentage of your approved credit limit you use each billing cycle. Keeping utilization above 30% signals credit hunger and pulls down your CIBIL score. Aim to keep card balances below 30% of limits and pay statements in full before the due date to reach a 750+ score, qualifying you for the lowest loan interest rates.',
  },
  {
    id: 'loan-3',
    category: 'loans',
    categoryLabel: 'Loans & Debt Strategy',
    highlightTag: 'Consolidation',
    question: 'What is debt consolidation and when should I consider it?',
    answer:
      'Debt consolidation combines multiple scattered loans (such as multiple credit card balances and high-interest personal loans) into a single loan with a lower interest rate and unified monthly EMI. This simplifies cash flow management, lowers cumulative interest costs, and relieves financial stress for salaried professionals.',
  },
];

interface FaqSectionProps {
  onOpenConsultation: (service?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mutual-funds' | 'insurance' | 'loans'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['mf-1', 'ins-1']); // default first items open

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F7F8F5] relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9F24A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123B43]/10 border border-[#123B43]/20 w-fit mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#123B43]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092532] tracking-tight leading-[1.15]">
            Got Questions? We Have Straightforward Answers
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#607078] leading-relaxed">
            Clear, transparent answers to the most common inquiries regarding mutual fund SIPs, term insurance, health coverage, and smart loan repayment.
          </p>

          {/* Search Input Bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. SIP, 80C tax, term insurance, CIBIL)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm text-[#092532] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#071D29] focus:border-transparent shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Category Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Topics ({FAQ_DATA.length})
            </button>

            <button
              onClick={() => setSelectedCategory('mutual-funds')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedCategory === 'mutual-funds'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>Mutual Funds</span>
            </button>

            <button
              onClick={() => setSelectedCategory('insurance')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedCategory === 'insurance'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>Insurance</span>
            </button>

            <button
              onClick={() => setSelectedCategory('loans')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedCategory === 'loans'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'bg-white text-[#607078] hover:text-[#092532] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>Loans & Debt</span>
            </button>
          </div>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#092532]">No matching questions found</h3>
              <p className="text-sm text-[#607078] mt-1">
                Try searching for different keywords or select another topic category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-xs font-bold text-[#071D29] bg-[#C9F24A] px-4 py-2 rounded-xl hover:bg-[#D9F77A] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl sm:rounded-3xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-white border-[#071D29]/30 shadow-lg shadow-black/5 ring-1 ring-[#071D29]/10'
                      : 'bg-white hover:bg-white/90 border-gray-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none focus:outline-none cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#F7F8F5] text-[#123B43] border border-gray-200">
                          {faq.categoryLabel}
                        </span>
                        {faq.highlightTag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C9F24A]/30 text-[#071D29] border border-[#C9F24A]/60 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{faq.highlightTag}</span>
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-base sm:text-lg font-bold transition-colors ${
                          isOpen ? 'text-[#071D29]' : 'text-[#092532]'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#071D29] text-[#C9F24A] rotate-180'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-gray-100 mt-1">
                      <p className="text-sm sm:text-base text-[#607078] leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Reassurance / Direct Advisor Box */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-[#071D29] text-white p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#C9F24A] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F24A] animate-pulse" />
              <span>Personalized Advisory Available</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Have a specific question about your financial situation?
            </h4>
            <p className="text-xs sm:text-sm text-white/70">
              Speak directly with <strong>Saswata Roy</strong> (AMFI Registered Distributor, ARN- 136048).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:6291390883"
              className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-all border border-white/15 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>Call 6291390883</span>
            </a>

            <button
              onClick={() => onOpenConsultation('Mutual Funds')}
              className="text-xs font-bold bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Ask an Advisor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
