import React, { useState } from 'react';
import { Calculator, TrendingUp, Landmark, ArrowUpRight, HelpCircle } from 'lucide-react';

interface CalculatorsSectionProps {
  onOpenConsultation: (service?: string) => void;
}

export const CalculatorsSection: React.FC<CalculatorsSectionProps> = ({ onOpenConsultation }) => {
  const [calcType, setCalcType] = useState<'sip' | 'emi'>('sip');

  // SIP Calculator State
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipRate, setSipRate] = useState<number>(12);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(15);
  const [loanRate, setLoanRate] = useState<number>(8.5);

  // SIP Calculations: FV = P × [ (1 + i)^n - 1 ] × (1 + i) / i
  const totalMonths = sipYears * 12;
  const monthlyRate = sipRate / 12 / 100;
  const investedAmount = monthlyInvestment * totalMonths;
  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  const estimatedReturns = futureValue - investedAmount;

  // EMI Calculations: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
  const emiMonths = loanTenureYears * 12;
  const emiMonthlyRate = loanRate / 12 / 100;
  const monthlyEmi =
    (loanAmount * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiMonths)) /
    (Math.pow(1 + emiMonthlyRate, emiMonths) - 1);
  const totalLoanRepayment = monthlyEmi * emiMonths;
  const totalInterestPayable = totalLoanRepayment - loanAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculators" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#071D29]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
              INTERACTIVE PLANNING TOOLS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092532] tracking-tight">
            See How Your Money Can Grow or Work for You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#607078]">
            Experiment with numbers in real-time. Calculate compound wealth via Systematic Investment Plans (SIP) or plan sensible monthly loan repayments.
          </p>

          {/* Toggle Pills */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-[#F7F8F5] border border-gray-200">
            <button
              onClick={() => setCalcType('sip')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                calcType === 'sip'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'text-[#607078] hover:text-[#092532]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>SIP Growth Calculator</span>
            </button>
            <button
              onClick={() => setCalcType('emi')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                calcType === 'emi'
                  ? 'bg-[#071D29] text-white shadow-md'
                  : 'text-[#607078] hover:text-[#092532]'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span>Loan EMI Calculator</span>
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="mt-12 bg-[#F7F8F5] rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm max-w-4xl mx-auto">
          {calcType === 'sip' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Sliders on Left */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Monthly Investment (SIP)
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {formatCurrency(monthlyInvestment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Investment Horizon
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {sipYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>1 Yr</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Expected Annual Return (%)
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {sipRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>5% (Debt)</span>
                    <span>12% (Equity)</span>
                    <span>20% (Aggressive)</span>
                  </div>
                </div>
              </div>

              {/* Results on Right (Dark Navy Panel) */}
              <div className="md:col-span-5 bg-[#071D29] rounded-2xl p-6 text-white border border-white/10 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider">
                    Projected Corpus Value
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1 text-[#C9F24A]">
                    {formatCurrency(futureValue)}
                  </div>

                  <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Amount Invested:</span>
                      <span className="font-semibold text-white">{formatCurrency(investedAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Est. Growth Gain:</span>
                      <span className="font-semibold text-[#D9F77A]">{formatCurrency(estimatedReturns)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenConsultation('Mutual Funds')}
                    className="w-full flex items-center justify-center gap-2 bg-[#C9F24A] text-[#071D29] font-bold text-xs py-2.5 rounded-xl hover:bg-[#D9F77A] transition-colors"
                  >
                    <span>Build This SIP Portfolio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-white/50 text-center mt-2">
                    Projections are educational and assume steady compounding.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Sliders on Left */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Loan Principal Amount
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Loan Tenure
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {loanTenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>1 Yr</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#092532]">
                      Interest Rate (% p.a.)
                    </label>
                    <span className="text-sm font-extrabold text-[#071D29] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {loanRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.25"
                    value={loanRate}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#071D29]"
                  />
                  <div className="flex justify-between text-[10px] text-[#607078] mt-1">
                    <span>6% (Home Loan)</span>
                    <span>10.5% (Personal)</span>
                    <span>18%</span>
                  </div>
                </div>
              </div>

              {/* Results on Right (Dark Navy Panel) */}
              <div className="md:col-span-5 bg-[#071D29] rounded-2xl p-6 text-white border border-white/10 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C9F24A] tracking-wider">
                    Monthly EMI
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1 text-[#C9F24A]">
                    {formatCurrency(monthlyEmi)}
                  </div>

                  <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Principal Amount:</span>
                      <span className="font-semibold text-white">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Total Interest Payable:</span>
                      <span className="font-semibold text-[#D9F77A]">{formatCurrency(totalInterestPayable)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Total Payment:</span>
                      <span className="font-semibold text-white">{formatCurrency(totalLoanRepayment)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenConsultation('Loans')}
                    className="w-full flex items-center justify-center gap-2 bg-[#C9F24A] text-[#071D29] font-bold text-xs py-2.5 rounded-xl hover:bg-[#D9F77A] transition-colors"
                  >
                    <span>Compare Best Bank Rates</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-white/50 text-center mt-2">
                    Actual bank EMI may vary based on exact processing terms.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
