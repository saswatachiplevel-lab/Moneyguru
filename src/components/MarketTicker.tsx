import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isCurrencyOrYield?: boolean;
  prefix?: string;
  suffix?: string;
}

const INITIAL_INDICES: MarketIndex[] = [
  {
    symbol: 'NIFTY 50',
    name: 'NSE Benchmark',
    value: 25842.10,
    change: 142.30,
    changePercent: 0.55,
  },
  {
    symbol: 'SENSEX',
    name: 'BSE Benchmark',
    value: 84560.85,
    change: 418.20,
    changePercent: 0.50,
  },
  {
    symbol: 'NIFTY BANK',
    name: 'Banking Index',
    value: 53780.40,
    change: 210.65,
    changePercent: 0.39,
  },
  {
    symbol: 'NIFTY IT',
    name: 'Technology',
    value: 42190.15,
    change: -85.40,
    changePercent: -0.20,
  },
  {
    symbol: 'NIFTY MIDCAP 150',
    name: 'Midcap Growth',
    value: 21430.70,
    change: 188.50,
    changePercent: 0.89,
  },
  {
    symbol: 'GOLD (10g)',
    name: 'MCX Spot',
    value: 76420,
    change: 310.00,
    changePercent: 0.41,
    prefix: '₹',
  },
  {
    symbol: '10Y G-SEC YIELD',
    name: 'Govt Bond Yield',
    value: 6.84,
    change: -0.02,
    changePercent: -0.29,
    suffix: '%',
  },
  {
    symbol: 'USD / INR',
    name: 'Forex Spot',
    value: 83.84,
    change: 0.03,
    changePercent: 0.04,
    prefix: '₹',
  },
  {
    symbol: 'BRENT CRUDE',
    name: 'Commodity',
    value: 74.20,
    change: -0.45,
    changePercent: -0.60,
    prefix: '$',
  },
];

export const MarketTicker: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [lastUpdatedSymbol, setLastUpdatedSymbol] = useState<string | null>(null);

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
        // Keep realistic precision
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

  const formatNumber = (num: number, isCurrencyOrYield?: boolean) => {
    if (num < 100) {
      return num.toFixed(2);
    }
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
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
          {/* Subtle gradient edge masks for smooth enter/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#05151E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#05151E] to-transparent z-10 pointer-events-none" />

          {/* Marquee Container with 2 duplicated tracks for smooth infinite loop */}
          <div className="animate-ticker flex items-center">
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center shrink-0">
                {indices.map((idx) => {
                  const isPositive = idx.change >= 0;
                  const isRecentlyUpdated = lastUpdatedSymbol === idx.symbol;

                  return (
                    <div
                      key={`${copyIndex}-${idx.symbol}`}
                      className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-1 mx-1 rounded-xl transition-all duration-300 ${
                        isRecentlyUpdated
                          ? isPositive
                            ? 'bg-emerald-500/20 ring-1 ring-emerald-400/50'
                            : 'bg-rose-500/20 ring-1 ring-rose-400/50'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white tracking-wide">
                          {idx.symbol}
                        </span>
                        <span className="text-[9px] text-white/50 leading-none">
                          {idx.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-xs sm:text-[13px] font-extrabold text-white">
                          {idx.prefix || ''}{formatNumber(idx.value, idx.isCurrencyOrYield)}{idx.suffix || ''}
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

                      {/* Small subtle separator dot */}
                      <span className="w-1 h-1 rounded-full bg-white/20 ml-2" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right Subtle Disclaimer / Hint (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-[10px] text-white/60 bg-[#071D29]/80 shrink-0 border-l border-white/10">
          <Clock className="w-3 h-3 text-[#C9F24A]" />
          <span>Hover to pause</span>
        </div>

      </div>
    </div>
  );
};
