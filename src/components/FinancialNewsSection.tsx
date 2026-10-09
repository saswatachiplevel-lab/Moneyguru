import React, { useState, useEffect } from 'react';
import {
  Globe,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Clock,
  Compass,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  url?: string;
  time: string;
  impact: 'Bullish' | 'Bearish' | 'Neutral' | string;
}

interface FinancialNewsSectionProps {
  onOpenConsultation?: (topic?: string) => void;
}

export const FinancialNewsSection: React.FC<FinancialNewsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isGrounded, setIsGrounded] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  const fetchNews = async (forceRefresh: boolean = false) => {
    try {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);

      const url = forceRefresh ? '/api/news?refresh=true' : '/api/news';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (data.success && Array.isArray(data.news)) {
        setArticles(data.news);
        setIsGrounded(Boolean(data.grounded));
        setSearchQueries(data.searchQueries || []);
        if (data.lastUpdated) {
          const d = new Date(data.lastUpdated);
          setLastUpdated(
            d.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          );
        }
      }
    } catch (err) {
      console.warn('Could not fetch grounded financial news:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const categories = ['All', 'Markets', 'Mutual Funds', 'Economy', 'Policy'];

  const filteredArticles = articles.filter((item) => {
    if (activeCategory === 'All') return true;
    return (item.category || '').toLowerCase().includes(activeCategory.toLowerCase());
  });

  const getImpactBadge = (impact: string) => {
    const lower = (impact || '').toLowerCase();
    if (lower.includes('bullish') || lower.includes('positive')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
          <TrendingUp className="w-3 h-3 text-emerald-600" />
          Bullish
        </span>
      );
    }
    if (lower.includes('bearish') || lower.includes('negative')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 border border-rose-500/20">
          <TrendingDown className="w-3 h-3 text-rose-600" />
          Bearish
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-700 border border-slate-500/20">
        <Minus className="w-3 h-3 text-slate-500" />
        Neutral
      </span>
    );
  };

  const getCategoryColor = (cat: string) => {
    const lower = (cat || '').toLowerCase();
    if (lower.includes('market')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (lower.includes('mutual')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (lower.includes('economy')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (lower.includes('policy')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <section className="bg-gradient-to-b from-[#0A2635] via-[#071D29] to-[#0A2635] text-white py-12 lg:py-16 border-b border-white/10 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9F24A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            {/* Grounding Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-3.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F24A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9F24A]" />
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#C9F24A]">
                <Globe className="w-3.5 h-3.5" />
                <span>GOOGLE SEARCH GROUNDED</span>
              </div>
              <span className="text-[10px] text-white/50 border-l border-white/20 pl-2">
                Daily Financial Intelligence
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Today’s Market Pulse & Financial Headlines
            </h2>
            <p className="mt-2 text-sm text-white/70 max-w-2xl leading-relaxed">
              Curated daily macroeconomic, stock index, mutual fund, and policy updates grounded in live web search data to keep your investment roadmap clear and timely.
            </p>
          </div>

          {/* Controls: Refresh & Live Timestamp */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {lastUpdated && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
                <Clock className="w-3.5 h-3.5 text-[#C9F24A]" />
                <span>Updated today at {lastUpdated}</span>
              </div>
            )}

            <button
              onClick={() => fetchNews(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9F24A] text-[#071D29] text-xs font-extrabold hover:bg-[#d6fb5a] transition-all shadow-md shadow-[#C9F24A]/20 cursor-pointer active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Searching...' : 'Refresh Headlines'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Grounding Citations */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#071D29] shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search queries grounded badges */}
          {searchQueries.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/50">
              <Search className="w-3.5 h-3.5 text-[#C9F24A]" />
              <span className="truncate max-w-xs">
                Grounded via: {searchQueries.slice(0, 2).join(' • ')}
              </span>
            </div>
          )}
        </div>

        {/* News Cards Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse min-h-[220px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-20 h-5 bg-white/10 rounded-full" />
                      <div className="w-16 h-5 bg-white/10 rounded-full" />
                    </div>
                    <div className="w-full h-5 bg-white/10 rounded mb-2" />
                    <div className="w-3/4 h-5 bg-white/10 rounded mb-4" />
                    <div className="w-full h-3 bg-white/5 rounded mb-2" />
                    <div className="w-5/6 h-3 bg-white/5 rounded" />
                  </div>
                  <div className="w-24 h-4 bg-white/10 rounded mt-4" />
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-white/5 rounded-2xl p-10 text-center border border-white/10">
              <Compass className="w-8 h-8 text-[#C9F24A] mx-auto mb-3" />
              <p className="text-white font-bold">No updates found for this category</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-3 text-xs text-[#C9F24A] underline font-semibold"
              >
                View all headlines
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <article
                  key={article.id || `news-${idx}`}
                  className="group bg-white rounded-2xl p-5 sm:p-6 text-[#092532] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    {/* Top Meta: Category + Sentiment Impact */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                          article.category
                        )}`}
                      >
                        {article.category || 'Financial Markets'}
                      </span>
                      {getImpactBadge(article.impact)}
                    </div>

                    {/* Headline Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#092532] group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#4A5D68] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Bottom Meta & Actions */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#092532] truncate max-w-[140px]">
                        {article.source}
                      </span>
                      <span className="text-[10px] text-gray-500">{article.time || 'Today'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View source"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {onOpenConsultation && (
                        <button
                          onClick={() => onOpenConsultation(`Market News: ${article.title}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#071D29] text-[#C9F24A] text-xs font-bold hover:bg-[#0c2e42] transition-colors cursor-pointer"
                        >
                          <span>Ask Advisor</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Grounding Verification Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C9F24A]" />
            <span>
              Real-time Google Search grounding active • Sourced from leading Indian & global financial news networks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Non-partisan institutional financial data</span>
          </div>
        </div>

      </div>
    </section>
  );
};
