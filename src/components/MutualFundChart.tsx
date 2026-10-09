import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Info,
  Maximize2,
  Sparkles
} from 'lucide-react';

export interface DataPoint {
  date: Date;
  value: number; // Fund NAV / Index points
  benchmarkValue: number; // Benchmark points
}

export type TimeRange = '1M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL';

export interface FundOption {
  id: string;
  name: string;
  category: string;
  benchmarkName: string;
  baseNav: number;
  cagr5Y: string;
  cagr3Y: string;
  cagr1Y: string;
  expenseRatio: string;
  riskRating: 'Moderate' | 'Moderately High' | 'Very High';
  accentColor: string;
}

export const FUND_OPTIONS: FundOption[] = [
  {
    id: 'flexi-cap',
    name: 'Moneyguru Flexi-Cap Wealth Index',
    category: 'Multi-Cap Blend',
    benchmarkName: 'NIFTY 500 TRI',
    baseNav: 100,
    cagr5Y: '21.4%',
    cagr3Y: '23.8%',
    cagr1Y: '19.2%',
    expenseRatio: '0.62%',
    riskRating: 'Very High',
    accentColor: '#10B981', // Emerald
  },
  {
    id: 'bluechip',
    name: 'Moneyguru Large-Cap Bluechip Index',
    category: 'Top 100 Enterprises',
    benchmarkName: 'NIFTY 50 TRI',
    baseNav: 100,
    cagr5Y: '17.8%',
    cagr3Y: '19.1%',
    cagr1Y: '15.4%',
    expenseRatio: '0.45%',
    riskRating: 'Moderately High',
    accentColor: '#0284C7', // Sky
  },
  {
    id: 'midcap-growth',
    name: 'Moneyguru Emerging Midcap Index',
    category: 'High-Growth Midcaps',
    benchmarkName: 'NIFTY Midcap 150 TRI',
    baseNav: 100,
    cagr5Y: '26.2%',
    cagr3Y: '29.5%',
    cagr1Y: '24.1%',
    expenseRatio: '0.74%',
    riskRating: 'Very High',
    accentColor: '#8B5CF6', // Purple
  },
  {
    id: 'hybrid-balanced',
    name: 'Moneyguru Balanced Advantage Index',
    category: 'Dynamic Asset Allocation',
    benchmarkName: 'CRISIL Hybrid 50+50',
    baseNav: 100,
    cagr5Y: '14.6%',
    cagr3Y: '15.9%',
    cagr1Y: '13.2%',
    expenseRatio: '0.55%',
    riskRating: 'Moderate',
    accentColor: '#F59E0B', // Amber
  },
];

// Helper to generate simulated historical daily data over 10 years (2016 - 2026)
function generateHistoricalData(fundId: string): DataPoint[] {
  const points: DataPoint[] = [];
  const endDate = new Date(2026, 9, 8); // Oct 2026
  const startDate = new Date(2016, 9, 8); // 10 years prior
  
  // Fund characteristics
  let annualDriftFund = 0.18;
  let annualDriftBm = 0.14;
  let volatilityFund = 0.17;
  let volatilityBm = 0.15;

  if (fundId === 'bluechip') {
    annualDriftFund = 0.16;
    annualDriftBm = 0.14;
    volatilityFund = 0.14;
    volatilityBm = 0.14;
  } else if (fundId === 'midcap-growth') {
    annualDriftFund = 0.23;
    annualDriftBm = 0.18;
    volatilityFund = 0.22;
    volatilityBm = 0.20;
  } else if (fundId === 'hybrid-balanced') {
    annualDriftFund = 0.13;
    annualDriftBm = 0.11;
    volatilityFund = 0.09;
    volatilityBm = 0.11;
  }

  let fundNav = 100.0;
  let bmPoints = 100.0;

  // Generate weekly intervals for clean performance & smooth rendering
  const totalWeeks = 520;
  const daysPerStep = 7;

  // Seeded deterministic pseudo-random generator so the curves remain smooth and stable
  let seed = fundId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 12345);
  function pseudoRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i <= totalWeeks; i++) {
    const currentDate = new Date(startDate.getTime() + i * daysPerStep * 24 * 60 * 60 * 1000);
    if (currentDate > endDate) break;

    const yearProgress = currentDate.getFullYear() + currentDate.getMonth() / 12;

    // Simulate notable real-world market macro events:
    // 1. Feb - March 2020 COVID shock
    let shockFactor = 0;
    if (yearProgress >= 2020.1 && yearProgress <= 2020.3) {
      shockFactor = -0.06; // Steep fall
    } else if (yearProgress > 2020.3 && yearProgress <= 2021.5) {
      shockFactor = 0.04; // Rapid bull post-covid recovery
    } else if (yearProgress >= 2022.0 && yearProgress <= 2022.6) {
      shockFactor = -0.015; // Global rate hikes & inflation consolidation
    } else if (yearProgress >= 2023.2 && yearProgress <= 2026.8) {
      shockFactor = 0.025; // Sustained Indian capex & manufacturing expansion
    }

    const weeklyDt = 7 / 365;
    const randNorm1 = (pseudoRandom() + pseudoRandom() + pseudoRandom() - 1.5) * 1.4;
    const randNorm2 = (pseudoRandom() + pseudoRandom() + pseudoRandom() - 1.5) * 1.4;

    const fundReturn = (annualDriftFund * weeklyDt) + (volatilityFund * Math.sqrt(weeklyDt) * randNorm1) + shockFactor;
    const bmReturn = (annualDriftBm * weeklyDt) + (volatilityBm * Math.sqrt(weeklyDt) * randNorm2) + (shockFactor * 0.95);

    fundNav = Math.max(20, fundNav * (1 + fundReturn));
    bmPoints = Math.max(20, bmPoints * (1 + bmReturn));

    points.push({
      date: currentDate,
      value: Math.round(fundNav * 100) / 100,
      benchmarkValue: Math.round(bmPoints * 100) / 100,
    });
  }

  return points;
}

interface MutualFundChartProps {
  initialFundId?: string;
  onOpenConsultation?: (fundName?: string) => void;
  isCompact?: boolean;
}

export const MutualFundChart: React.FC<MutualFundChartProps> = ({
  initialFundId = 'flexi-cap',
  onOpenConsultation,
  isCompact = false,
}) => {
  const [selectedFundId, setSelectedFundId] = useState<string>(initialFundId);
  const [timeRange, setTimeRange] = useState<TimeRange>('3Y');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [showSipSimulation, setShowSipSimulation] = useState<boolean>(false);
  const [monthlySipAmount, setMonthlySipAmount] = useState<number>(10000);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const selectedFund = useMemo(() => {
    return FUND_OPTIONS.find((f) => f.id === selectedFundId) || FUND_OPTIONS[0];
  }, [selectedFundId]);

  // Master generated data
  const rawData = useMemo(() => {
    return generateHistoricalData(selectedFundId);
  }, [selectedFundId]);

  // Filtered by TimeRange
  const chartData = useMemo(() => {
    if (!rawData.length) return [];
    const lastDate = rawData[rawData.length - 1].date;
    let cutoff = new Date(lastDate);

    switch (timeRange) {
      case '1M':
        cutoff.setMonth(cutoff.getMonth() - 1);
        break;
      case '6M':
        cutoff.setMonth(cutoff.getMonth() - 6);
        break;
      case '1Y':
        cutoff.setFullYear(cutoff.getFullYear() - 1);
        break;
      case '3Y':
        cutoff.setFullYear(cutoff.getFullYear() - 3);
        break;
      case '5Y':
        cutoff.setFullYear(cutoff.getFullYear() - 5);
        break;
      case 'ALL':
      default:
        return rawData;
    }

    const filtered = rawData.filter((d) => d.date >= cutoff);
    if (!filtered.length) return rawData.slice(-10);

    // Normalize starting values to 100 at the start of the chosen window for apples-to-apples comparison
    const baseFundVal = filtered[0].value;
    const baseBmVal = filtered[0].benchmarkValue;

    return filtered.map((d) => ({
      date: d.date,
      value: Math.round((d.value / baseFundVal) * 10000) / 100, // Rebase to 100
      benchmarkValue: Math.round((d.benchmarkValue / baseBmVal) * 10000) / 100,
    }));
  }, [rawData, timeRange]);

  // Calculations for display
  const stats = useMemo(() => {
    if (!chartData.length) {
      return {
        returnPct: 0,
        bmReturnPct: 0,
        alpha: 0,
        lumpsumEnd: 10000,
        monthsCount: 0,
        totalInvested: 0,
        sipFutureValue: 0,
      };
    }
    const startVal = chartData[0].value;
    const endVal = chartData[chartData.length - 1].value;
    const returnPct = ((endVal - startVal) / startVal) * 100;

    const startBm = chartData[0].benchmarkValue;
    const endBm = chartData[chartData.length - 1].benchmarkValue;
    const bmReturnPct = ((endBm - startBm) / startBm) * 100;

    const alpha = returnPct - bmReturnPct;
    const lumpsumEnd = 10000 * (endVal / startVal);

    // Simple SIP calculation over the selected window
    const monthsCount = Math.max(1, Math.round((chartData.length * 7) / 30.4));
    const totalInvested = monthlySipAmount * monthsCount;
    // Weighted average compound accumulation
    const sipFutureValue = totalInvested * (1 + (returnPct / 100) * 0.58);

    return {
      returnPct: Math.round(returnPct * 10) / 10,
      bmReturnPct: Math.round(bmReturnPct * 10) / 10,
      alpha: Math.round(alpha * 10) / 10,
      lumpsumEnd: Math.round(lumpsumEnd),
      monthsCount,
      totalInvested,
      sipFutureValue: Math.round(sipFutureValue),
    };
  }, [chartData, monthlySipAmount]);

  // D3 Chart Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !chartData.length) return;

    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = isCompact ? 320 : 420;
    const margin = { top: 25, right: 30, bottom: 40, left: 55 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Defs for gradients & shadow filters
    const defs = svg.append('defs');

    // Gradient for the fund line fill
    const areaGradient = defs
      .append('linearGradient')
      .attr('id', `fundAreaGradient-${selectedFundId}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', selectedFund.accentColor)
      .attr('stop-opacity', 0.35);

    areaGradient
      .append('stop')
      .attr('offset', '75%')
      .attr('stop-color', selectedFund.accentColor)
      .attr('stop-opacity', 0.05);

    areaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', selectedFund.accentColor)
      .attr('stop-opacity', 0);

    // Drop shadow filter for active pointer dot
    const filter = defs.append('filter').attr('id', 'glowDot').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xExtent = d3.extent(chartData, (d) => d.date) as [Date, Date];
    const xScale = d3.scaleTime().domain(xExtent).range([0, innerWidth]);

    // Y Scale (combine min and max of both series if benchmark shown)
    let yMin = d3.min(chartData, (d) => (showBenchmark ? Math.min(d.value, d.benchmarkValue) : d.value)) || 90;
    let yMax = d3.max(chartData, (d) => (showBenchmark ? Math.max(d.value, d.benchmarkValue) : d.value)) || 150;

    // Add padding to Y scale
    const yPadding = (yMax - yMin) * 0.12;
    yMin = Math.max(0, yMin - yPadding);
    yMax = yMax + yPadding;

    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]).nice();

    // Horizontal Grid Lines
    const yAxisGrid = d3
      .axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => '')
      .ticks(5);

    g.append('g')
      .attr('class', 'grid-lines')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-opacity', 0.8);

    g.select('.grid-lines .domain').remove();

    // Baseline Line at 100 (Break-even index start)
    if (yScale(100) >= 0 && yScale(100) <= innerHeight) {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', yScale(100))
        .attr('y2', yScale(100))
        .attr('stroke', '#94A3B8')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2 2')
        .attr('opacity', 0.7);

      g.append('text')
        .attr('x', innerWidth - 5)
        .attr('y', yScale(100) - 5)
        .attr('text-anchor', 'end')
        .attr('fill', '#94A3B8')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .text('Base (100)');
    }

    // Benchmark Path (if enabled)
    if (showBenchmark) {
      const benchmarkLine = d3
        .line<DataPoint>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.benchmarkValue))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', '#64748B')
        .attr('stroke-width', 1.8)
        .attr('stroke-dasharray', '4 4')
        .attr('stroke-opacity', 0.75)
        .attr('d', benchmarkLine);
    }

    // Fund Area Generator
    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(chartData)
      .attr('fill', `url(#fundAreaGradient-${selectedFundId})`)
      .attr('d', areaGenerator);

    // Fund Main Line Generator
    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const mainLine = g
      .append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', selectedFund.accentColor)
      .attr('stroke-width', 2.8)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', lineGenerator);

    // Smooth Entrance Animation
    const totalLength = mainLine.node()?.getTotalLength() || 1000;
    mainLine
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    // X Axis
    let timeTickFormat = d3.timeFormat('%b %y');
    if (timeRange === '1M') timeTickFormat = d3.timeFormat('%d %b');
    if (timeRange === '6M') timeTickFormat = d3.timeFormat('%b %y');

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width < 500 ? 4 : 6)
      .tickFormat((d) => timeTickFormat(d as Date))
      .tickSizeOuter(0);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#64748B')
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', '#64748B')
      .attr('dy', '1em');

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}`)
      .tickSizeOuter(0);

    g.append('g')
      .call(yAxis)
      .attr('color', '#64748B')
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', '#64748B');

    // Remove domain boundary strokes for modern minimalism
    g.selectAll('.domain').attr('stroke', '#CBD5E1');

    // ----------------------------------------
    // Interactive Crosshair & Tooltip Overlay
    // ----------------------------------------
    const focusGroup = g.append('g').style('display', 'none');

    // Vertical Tracking Line
    const verticalLine = focusGroup
      .append('line')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#0F172A')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '3 3')
      .attr('opacity', 0.6);

    // Fund Focus Dot
    const fundFocusHalo = focusGroup
      .append('circle')
      .attr('r', 8)
      .attr('fill', selectedFund.accentColor)
      .attr('opacity', 0.25);

    const fundFocusDot = focusGroup
      .append('circle')
      .attr('r', 4.5)
      .attr('fill', selectedFund.accentColor)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glowDot)');

    // Benchmark Focus Dot (if enabled)
    let bmFocusDot: d3.Selection<SVGCircleElement, unknown, null, undefined> | null = null;
    if (showBenchmark) {
      bmFocusDot = focusGroup
        .append('circle')
        .attr('r', 3.5)
        .attr('fill', '#64748B')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1.5);
    }

    // Transparent Overlay for capturing pointer events
    const bisectDate = d3.bisector<DataPoint, Date>((d) => d.date).center;

    svg
      .append('rect')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair')
      .on('mouseenter', () => {
        focusGroup.style('display', null);
        if (tooltipRef.current) tooltipRef.current.style.opacity = '1';
      })
      .on('mouseleave', () => {
        focusGroup.style('display', 'none');
        if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
      })
      .on('mousemove', function (event) {
        const [mouseX] = d3.pointer(event);
        const xDate = xScale.invert(mouseX);
        const index = bisectDate(chartData, xDate);
        const d = chartData[index];
        if (!d) return;

        const cx = xScale(d.date);
        const cyFund = yScale(d.value);

        verticalLine.attr('x1', cx).attr('x2', cx);
        fundFocusHalo.attr('cx', cx).attr('cy', cyFund);
        fundFocusDot.attr('cx', cx).attr('cy', cyFund);

        if (bmFocusDot && showBenchmark) {
          const cyBm = yScale(d.benchmarkValue);
          bmFocusDot.attr('cx', cx).attr('cy', cyBm);
        }

        // Update HTML Floating Tooltip
        if (tooltipRef.current) {
          const startFundVal = chartData[0].value;
          const pointGainPct = (((d.value - startFundVal) / startFundVal) * 100).toFixed(1);
          const bmStartVal = chartData[0].benchmarkValue;
          const bmGainPct = (((d.benchmarkValue - bmStartVal) / bmStartVal) * 100).toFixed(1);
          const alphaPt = (parseFloat(pointGainPct) - parseFloat(bmGainPct)).toFixed(1);

          const dateStr = d.date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          const isPositive = parseFloat(pointGainPct) >= 0;
          const valueOn10k = (10000 * (d.value / startFundVal)).toLocaleString('en-IN', {
            maximumFractionDigits: 0,
          });

          tooltipRef.current.innerHTML = `
            <div class="p-3 bg-[#071D29]/95 text-white backdrop-blur-md rounded-xl shadow-2xl border border-white/15 text-xs font-sans min-w-[210px]">
              <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                <span class="text-white/60 text-[10px] uppercase font-semibold flex items-center gap-1">
                  📅 ${dateStr}
                </span>
                <span class="font-mono text-[10px] text-white/50">Idx: ${d.value.toFixed(1)}</span>
              </div>
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="flex items-center gap-1.5 font-medium text-white/90">
                    <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${selectedFund.accentColor}"></span>
                    ${selectedFund.name.split(' ')[1]} NAV:
                  </span>
                  <span class="font-bold font-mono text-white text-[13px]">
                    ${isPositive ? '+' : ''}${pointGainPct}%
                  </span>
                </div>
                ${
                  showBenchmark
                    ? `
                  <div class="flex items-center justify-between text-white/60">
                    <span class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full inline-block bg-slate-400"></span>
                      ${selectedFund.benchmarkName}:
                    </span>
                    <span class="font-mono">${parseFloat(bmGainPct) >= 0 ? '+' : ''}${bmGainPct}%</span>
                  </div>
                  <div class="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                    <span class="text-[#C9F24A] font-medium">Alpha (Outperformance):</span>
                    <span class="font-mono font-bold text-[#C9F24A]">${parseFloat(alphaPt) >= 0 ? '+' : ''}${alphaPt}%</span>
                  </div>
                `
                    : ''
                }
                <div class="pt-1.5 mt-1 border-t border-white/10 text-[10px] text-white/70 flex justify-between">
                  <span>₹10,000 Invested Value:</span>
                  <span class="font-bold text-white font-mono">₹${valueOn10k}</span>
                </div>
              </div>
            </div>
          `;

          // Keep tooltip bounded inside container
          const tooltipWidth = 230;
          let leftPos = margin.left + cx + 15;
          if (leftPos + tooltipWidth > width) {
            leftPos = margin.left + cx - tooltipWidth - 15;
          }
          tooltipRef.current.style.left = `${Math.max(10, leftPos)}px`;
          tooltipRef.current.style.top = `${Math.max(10, margin.top + cyFund - 50)}px`;
        }
      });
  }, [chartData, selectedFund, showBenchmark, isCompact]);

  // Window resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // Trigger a re-render cycle on width changes
      setSelectedFundId((curr) => curr);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/40 overflow-hidden transition-all duration-300">
      {/* Top Banner / Category Selector */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-[#071D29] to-[#0A2E3D] text-white border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C9F24A] text-[#071D29]">
                <Sparkles className="w-3 h-3" />
                D3.JS PERFORMANCE VISUALIZER
              </span>
              <span className="text-[11px] text-white/60 font-medium hidden sm:inline-block">
                Simulated Historical Index Compounding
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {selectedFund.name}
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              Benchmark: <span className="font-semibold text-white/90">{selectedFund.benchmarkName}</span> • Category: <span className="text-white/90">{selectedFund.category}</span>
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 text-right min-w-[85px]">
              <span className="block text-[10px] text-white/60 uppercase font-semibold">
                {timeRange} Growth
              </span>
              <span
                className={`text-base font-extrabold font-mono flex items-center justify-end gap-0.5 ${
                  stats.returnPct >= 0 ? 'text-[#C9F24A]' : 'text-rose-400'
                }`}
              >
                {stats.returnPct >= 0 ? '+' : ''}{stats.returnPct}%
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 text-right min-w-[85px]">
              <span className="block text-[10px] text-white/60 uppercase font-semibold">
                3Y CAGR
              </span>
              <span className="text-base font-extrabold font-mono text-emerald-400">
                {selectedFund.cagr3Y}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 text-right min-w-[85px]">
              <span className="block text-[10px] text-white/60 uppercase font-semibold">
                Alpha vs BM
              </span>
              <span className="text-base font-extrabold font-mono text-[#C9F24A]">
                +{stats.alpha}%
              </span>
            </div>
          </div>
        </div>

        {/* Fund Picker Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FUND_OPTIONS.map((fund) => {
            const isCurrent = fund.id === selectedFundId;
            return (
              <button
                key={fund.id}
                onClick={() => setSelectedFundId(fund.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#C9F24A] text-[#071D29] shadow-md shadow-[#C9F24A]/20 scale-102'
                    : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isCurrent ? '#071D29' : fund.accentColor }}
                />
                {fund.name.split(' ')[1]} Fund
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Timeframe & Toggles */}
      <div className="p-3 sm:p-4 bg-gray-50/80 border-b border-gray-200/70 flex flex-wrap items-center justify-between gap-3">
        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
          {(['1M', '6M', '1Y', '3Y', '5Y', 'ALL'] as TimeRange[]).map((range) => {
            const active = timeRange === range;
            return (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#071D29] text-[#C9F24A] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>

        {/* Additional Toggles */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={showBenchmark}
              onChange={(e) => setShowBenchmark(e.target.checked)}
              className="w-4 h-4 rounded text-[#071D29] focus:ring-emerald-500 accent-[#071D29]"
            />
            <span>Compare vs {selectedFund.benchmarkName}</span>
          </label>

          <button
            onClick={() => setShowSipSimulation(!showSipSimulation)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              showSipSimulation
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{showSipSimulation ? 'Hide SIP Simulator' : 'SIP Calculator'}</span>
          </button>
        </div>
      </div>

      {/* D3 Chart Canvas Container */}
      <div ref={containerRef} className="relative p-2 sm:p-5 bg-white select-none">
        {/* Floating Tooltip Target */}
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none transition-opacity duration-150 z-30 opacity-0"
          style={{ top: 0, left: 0 }}
        />

        <svg ref={svgRef} className="w-full overflow-visible" />

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium text-gray-800">
              <span className="w-3.5 h-1 rounded-full" style={{ backgroundColor: selectedFund.accentColor }} />
              <span>{selectedFund.name}</span>
            </div>
            {showBenchmark && (
              <div className="flex items-center gap-1.5 font-medium text-gray-500">
                <span className="w-3.5 h-1 border-b-2 border-dashed border-gray-500" />
                <span>{selectedFund.benchmarkName} (Benchmark)</span>
              </div>
            )}
          </div>
          <div className="text-[11px] text-gray-400">
            Hover along the timeline to inspect returns & alpha
          </div>
        </div>
      </div>

      {/* Optional Interactive SIP & Lumpsum Simulator Panel */}
      {showSipSimulation && (
        <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border-t border-emerald-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Compounding Impact
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-[#092532]">
                  Systematic Investment Plan (SIP) Simulation
                </h4>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full font-semibold">
                Historical Reinvestment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Slider */}
              <div className="md:col-span-1 bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                  <span>Monthly SIP:</span>
                  <span className="font-mono text-emerald-700 text-sm">
                    ₹{monthlySipAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="2000"
                  value={monthlySipAmount}
                  onChange={(e) => setMonthlySipAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹2,000/mo</span>
                  <span>₹50,000/mo</span>
                  <span>₹1 Lakh/mo</span>
                </div>
              </div>

              {/* Total Invested vs Future Value */}
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100 text-center shadow-xs">
                  <span className="text-[11px] text-gray-500 font-semibold block">
                    Total Invested ({stats.monthsCount} mos)
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-gray-800 mt-0.5 block">
                    ₹{stats.totalInvested.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-emerald-100 text-center shadow-xs">
                  <span className="text-[11px] text-gray-500 font-semibold block">
                    Accumulated Value
                  </span>
                  <span className="text-base sm:text-lg font-mono font-extrabold text-emerald-700 mt-0.5 block">
                    ₹{stats.sipFutureValue.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-emerald-600 text-white p-3.5 rounded-xl text-center shadow-md col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-emerald-100 font-semibold block">
                    Net Wealth Gain
                  </span>
                  <span className="text-base sm:text-lg font-mono font-extrabold mt-0.5 block">
                    +₹{(stats.sipFutureValue - stats.totalInvested).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Strip */}
      <div className="p-4 bg-gray-50 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Regulated advisory: AMFI Registered Mutual Fund Distributor & SEBI Compliant Guidance.
          </span>
        </div>

        {onOpenConsultation && (
          <button
            onClick={() => onOpenConsultation(selectedFund.name)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#071D29] text-[#C9F24A] text-xs font-bold hover:bg-[#0c2e42] transition-colors shadow-sm"
          >
            <span>Plan My SIP in this Index</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
