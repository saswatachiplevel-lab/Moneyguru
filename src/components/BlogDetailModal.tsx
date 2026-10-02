import React from 'react';
import { X, Clock, Calendar, User, ArrowUpRight, Share2, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose,
  onBookConsultation,
}) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071D29]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Article Header Image */}
        <div className="relative h-60 sm:h-72 overflow-hidden shrink-0">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D29] via-[#071D29]/65 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C9F24A] text-[#071D29] px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C9F24A]" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium text-white">
                <User className="w-3.5 h-3.5 text-[#C9F24A]" />
                {post.author}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Article Text */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-[#092532] text-sm sm:text-base leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="text-[#607078] leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Key Takeaway Box */}
          <div className="p-5 rounded-2xl bg-[#F7F8F5] border-l-4 border-[#071D29] mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#071D29] mb-1">
              Moneyguru Key Takeaway
            </h4>
            <p className="text-xs sm:text-sm text-[#092532] font-medium leading-relaxed">
              Building wealth is about patience, asset allocation, and protecting your downside. Never rush into complex financial contracts without verifying fees, liquidity, and personal suitability.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#607078]">
            Want to apply these insights to your own finances?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="text-xs font-bold text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="flex items-center gap-2 bg-[#C9F24A] text-[#071D29] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-[#D9F77A] transition-colors"
            >
              <span>Book Discussion</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
