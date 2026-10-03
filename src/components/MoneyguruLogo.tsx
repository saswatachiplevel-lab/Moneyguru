import React from 'react';

interface MoneyguruLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const MoneyguruLogo: React.FC<MoneyguruLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Exact Circular SVG Emblem matching user's uploaded logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none"
      >
        {/* Main Background Circle */}
        <circle cx="250" cy="250" r="240" fill="#1C0270" />

        {/* Double Concentric White Rings */}
        <circle cx="250" cy="250" r="238" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="250" cy="250" r="226" stroke="#FFFFFF" strokeWidth="5" />

        {/* Candlesticks on the Left */}
        {/* Candlestick 1 */}
        <line x1="197" y1="140" x2="197" y2="210" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="190" y="156" width="14" height="38" rx="2" fill="#FFFFFF" />

        {/* Candlestick 2 */}
        <line x1="215" y1="130" x2="215" y2="195" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="208" y="142" width="14" height="38" rx="2" fill="#FFFFFF" />

        {/* Candlestick 3 */}
        <line x1="233" y1="115" x2="233" y2="185" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="226" y="126" width="14" height="40" rx="2" fill="#FFFFFF" />

        {/* Upward Stepping Bar Chart / Columns */}
        <rect x="187" y="244" width="13" height="15" rx="3" fill="#FFFFFF" />
        <rect x="204" y="235" width="13" height="24" rx="3" fill="#FFFFFF" />
        <rect x="221" y="224" width="13" height="35" rx="3" fill="#FFFFFF" />
        <rect x="238" y="212" width="13" height="47" rx="3" fill="#FFFFFF" />
        <rect x="255" y="200" width="13" height="59" rx="3" fill="#FFFFFF" />
        <rect x="272" y="188" width="13" height="71" rx="3" fill="#FFFFFF" />
        <rect x="289" y="174" width="13" height="85" rx="3" fill="#FFFFFF" />

        {/* Dynamic Growth Trend Line / Zig-zag Curve */}
        <path
          d="M182 245 L215 198 L242 216 L284 175 L300 178"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Coin / Currency Seal at top right peak */}
        <g transform="translate(288, 125)">
          <circle cx="30" cy="30" r="30" fill="#1C0270" stroke="#FFFFFF" strokeWidth="6" />
          <circle cx="30" cy="30" r="23" fill="#1C0270" stroke="#FFFFFF" strokeWidth="3" />
          {/* Currency Dollar symbol */}
          <text
            x="30"
            y="41"
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            $
          </text>

          {/* Sparkle Radiating Dots */}
          <circle cx="68" cy="12" r="3.5" fill="#FFFFFF" />
          <circle cx="75" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="58" cy="-5" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Logo Text: "Moneyguru" */}
        <text
          x="250"
          y="318"
          fill="#FFFFFF"
          fontSize="49"
          fontWeight="900"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          Moneyguru
        </text>

        {/* Subtitle Text: "Grow with us" */}
        <text
          x="250"
          y="370"
          fill="#FFFFFF"
          fontSize="31"
          fontWeight="500"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          letterSpacing="6.5"
          textAnchor="middle"
        >
          Grow with us
        </text>
      </svg>

      {/* Optional Horizontal Text Label next to the emblem */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-none">
              Moneyguru
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C9F24A] font-bold mt-1">
            Grow with us
          </span>
        </div>
      )}
    </div>
  );
};
