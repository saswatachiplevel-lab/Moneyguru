import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MutualFundChart } from './MutualFundChart';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isCurrencyOrYield?: boolean;
  prefix?: string;
  suffix?: string;
  fundMapId?: string;
}

const INITIAL_INDICES: MarketIndex[] = [
  {
    symbol: 'NIFTY 50',
    name: 'NSE Benchmark',
    value: 25842.10,
    change: 142.30,
    changePercent: 0.55,
    fundMapId: 'bluechip',
  },
  {
    symbol: 'SENSEX',
    name: 'BSE Benchmark',
    value: 84560.85,
    change: 418.20,
    changePercent: 0.50,
    fundMapId: 'bluechip',
  },
  {
    symbol: 'NIFTY BANK',
    name: 'Banking Index',
    value: 53780.40,
    change: 210.65,
    changePercent: 0.39,
    fundMapId: 'flexi-cap',
  },
  {
    symbol: 'NIFTY IT',
    name: 'Technology',
    value: 42190.15,
    change: -85.40,
    changePercent: -0.20,
    fundMapId: 'flexi-cap',
  },
  {
    symbol: 'NIFTY MIDCAP 150',
    name: 'Midcap Growth',
    value: 21430.70,
    change: 188.50,
    changePercent: 0.89,
    fundMapId: 'midcap-growth',
  },
  {
    symbol: 'GOLD (10g)',
    name: 'MCX Spot',
    value: 76420,
    change: 310.00,
    changePercent: 0.41,
    prefix: '₹',
    fundMapId: 'hybrid-balanced',
  },
  {
    symbol: '10Y G-SEC YIELD',
    name: 'Govt Bond Yield',
    value: 6.84,
    change: -0.02,
    changePercent: -0.29,
    suffix: '%',
    fundMapId: 'hybrid-balanced',
  },
  {
    symbol: 'USD / INR',
    name: 'Forex Spot',
    value: 83.84,
    change: 0.03,
    changePercent: 0.04,
    prefix: '₹',
    fundMapId: 'flexi-cap',
  },
  {
    symbol: 'BRENT CRUDE',
    name: 'Commodity',
    value: 74.20,
    change: -0.45,
    changePercent: -0.60,
    prefix: '$',
    fundMapId: 'flexi-cap',
  },
];

interface MarketTickerProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onOpenConsultation }) => {
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [lastUpdatedSymbol, setLastUpdatedSymbol] = useState<string | null>(null);
  const [isChartModalOpen, setIsChartModalOpen] = useState<boolean>(false);
  const [activeFundId, setActiveFundId] = useState<string>('flexi-cap');

  // Micro-tick simulation every 3.5 seconds to enhance financial credibility
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        
        // Random micro fluctuation between -0.08% and +0.08%
        const deltaPercent = (Math.random() * 0.16 - 0.08);
        const factor = 1 + deltaPercent / 100;
        
        let newValue = item.value * factor;
        newValue = item.isCurrencyOrYield || item.value < 100
          ? Math.round(newValue * 100) / 100
          : Math.round(newValue * 10) / 10;

        const newChange = item.change + (newValue - item.value);
        const newChangePercent = Math.round(((newChange / (newValue - newChange)) * 100) * 100) / 100;

        const updated = [...prev];
        updated[randomIndex] = {
          ...item,
          value: newValue,
          change: Math.round(newChange * 100) / 100,
          changePercent: newChangePercent,
        };

        setLastUpdatedSymbol(item.symbol);
        setTimeout(() => setLastUpdatedSymbol(null), 1200);

        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when chart modal is active
  useEffect(() => {
    if (isChartModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChartModalOpen]);

  const handleOpenChart = (fundId?: string) => {
    setActiveFundId(fundId || 'flexi-cap');
    setIsChartModalOpen(true);
  };

  const formatNumber = (num: number) => {
    if (num < 100) {
      return num.toFixed(2);
    }
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
    <>
      <div className="relative bg-[#05151E] border-y border-white/10 overflow-hidden shadow-inner select-none z-20">
        <div className="flex items-center">
          
          {/* Left Fixed Label Pill */}
          <div className="shrink-0 z-30 bg-[#071D29] border-r border-white/15 px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2.5 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F24A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9F24A]" />
            </span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white whitespace-nowrap">
                MARKET PULSE
              </span>
            </div>
            <span className="hidden md:inline-block text-[10px] text-[#C9F24A] bg-[#123B43] px-2 py-0.5 rounded-full font-semibold border border-[#C9F24A]/30">
              SIMULATED LIVE
            </span>
          </div>

          {/* Scrolling Ticker Track */}
          <div className="overflow-hidden flex-1 relative flex items-center py-2 sm:py-2.5">
            {/* Gradient edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#05151E] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#05151E] to-transparent z-10 pointer-events-none" />

            {/* Marquee Container with duplicate tracks for infinite loop */}
            <div className="animate-ticker flex items-center">
              {[0, 1].map((copyIndex) => (
                <div key={copyIndex} className="flex items-center shrink-0">
                  {indices.map((idx) => {
                    const isPositive = idx.change >= 0;
                    const isRecentlyUpdated = lastUpdatedSymbol === idx.symbol;

                    return (
                      <button
                        type="button"
                        key={`${copyIndex}-${idx.symbol}`}
                        onClick={() => handleOpenChart(idx.fundMapId)}
                        title={`Click to analyze ${idx.symbol} in D3.js Mutual Fund Chart`}
                        className={`inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1 mx-1 rounded-xl transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                          isRecentlyUpdated
                            ? isPositive
                              ? 'bg-emerald-500/25 ring-1 ring-emerald-400/50 scale-102'
                              : 'bg-rose-500/25 ring-1 ring-rose-400/50 scale-102'
                            : 'hover:bg-white/10 hover:ring-1 hover:ring-white/20'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1">
                            {idx.symbol}
                          </span>
                          <span className="text-[9px] text-white/50 leading-none">
                            {idx.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="text-xs sm:text-[13px] font-extrabold text-white">
                            {idx.prefix || ''}{formatNumber(idx.value)}{idx.suffix || ''}
                          </span>

                          <span
                            className={`inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                              isPositive
                                ? 'text-[#C9F24A] bg-[#C9F24A]/10'
                                : 'text-rose-400 bg-rose-500/10'
                            }`}
                          >
                            {isPositive ? (
                              <TrendingUp className="w-2.5 h-2.5 stroke-[2.5]" />
                            ) : (
                              <TrendingDown className="w-2.5 h-2.5 stroke-[2.5]" />
                            )}
                            <span>
                              {isPositive ? '+' : ''}
                              {idx.changePercent.toFixed(2)}%
                            </span>
                          </span>
                        </div>

                        {/* Dot */}
                        <span className="w-1 h-1 rounded-full bg-white/20 ml-1" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Button: Open D3 Performance Chart */}
          <div className="shrink-0 z-30 bg-[#071D29] border-l border-white/15 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">
            <button
              onClick={() => handleOpenChart('flexi-cap')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9F24A] text-[#071D29] text-xs font-extrabold hover:bg-[#d6fb5a] transition-all duration-200 shadow-md shadow-[#C9F24A]/20 cursor-pointer active:scale-95"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">D3.js</span>
              <span>Index Chart</span>
            </button>
          </div>

        </div>
      </div>

      {/* D3 Chart Interactive Modal Dialog */}
      {isChartModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsChartModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-gray-100">
            {/* Modal Top Bar */}
            <div className="bg-[#071D29] px-5 py-4 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C9F24A]/10 border border-[#C9F24A]/30 flex items-center justify-center text-[#C9F24A]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    Historical Mutual Fund Index Performance
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-[#C9F24A] text-[#071D29]">
                      D3.js SVG
                    </span>
                  </h3>
                  <p className="text-xs text-white/60">
                    Interactive time-series analysis with benchmark comparison & SIP projection
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsChartModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chart dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-2 sm:p-5 max-h-[82vh] overflow-y-auto">
              <MutualFundChart
                initialFundId={activeFundId}
                onOpenConsultation={(fundName) => {
                  setIsChartModalOpen(false);
                  if (onOpenConsultation) {
                    onOpenConsultation(fundName || 'Mutual Funds SIP Advisory');
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
