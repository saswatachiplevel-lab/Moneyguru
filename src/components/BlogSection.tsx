import React from 'react';
import { Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  return (
    <section id="insights" className="py-20 lg:py-28 bg-[#F7F8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9F24A]/25 border border-[#C9F24A]/50 w-fit mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#071D29]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071D29]">
                FINANCIAL INSIGHTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092532] tracking-tight">
              Learn. Understand. Make Better Decisions.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#607078] max-w-xl">
              Practical guides written without industry jargon to help you navigate everyday financial planning with total confidence.
            </p>
          </div>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#071D29]/80 backdrop-blur-md text-[#C9F24A] px-3 py-1 rounded-full border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Details */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#607078] mb-2.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#092532] group-hover:text-[#123B43] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#607078] mt-2.5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                <span className="text-xs font-bold text-[#071D29] group-hover:text-[#123B43]">
                  Read Full Article
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F7F8F5] group-hover:bg-[#C9F24A] text-[#071D29] flex items-center justify-center transition-all group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
