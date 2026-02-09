"use client";

import React, { useState, useMemo } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { ReviewStats } from '@/components/reviews/ReviewStats';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { WriteReviewCTA } from '@/components/reviews/WriteReviewCTA';
import { testimonials, testimonialStats } from '@/lib/data/testimonials';
import { Star, Filter, Search, Grid, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = useMemo(() => {
    return testimonials.filter(review => {
      const matchesRating = filterRating ? review.rating === filterRating : true;
      const matchesSearch = searchQuery 
        ? review.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
          review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.role.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      return matchesRating && matchesSearch;
    });
  }, [filterRating, searchQuery]);

  return (
    <main className="bg-white">
      {/* Professional Enterprise Hero */}
      <PageHero
        title="Voice of Our Community"
        subtitle="Customer Experience"
        description="Exceptional quality isn't just a promise—it's the feedback we receive every day. Explore real stories from enthusiasts who chose the Luxury Store for their footwear journey."
        icon={<Star className="w-5 h-5 text-white fill-white" />}
        bgColor="bg-gradient-to-r from-[#FF6B35] to-[#E85A28]"
      />

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
          {/* Stats Section */}
          <ReviewStats 
            averageRating={testimonialStats.averageRating}
            totalReviews={testimonialStats.totalReviews}
            recommendationRate={testimonialStats.recommendationRate}
            ratingBreakdown={testimonialStats.ratingBreakdown}
            filterRating={filterRating}
            onFilterChange={setFilterRating}
          />

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
             <div className="w-full md:w-auto relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF6B35] transition-colors" />
                <input 
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[350px] h-12 pl-12 pr-6 rounded-full bg-white border border-gray-100 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all text-[14px] font-medium"
                />
             </div>
             
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full">
                   <Filter className="w-3.5 h-3.5 text-[#FF6B35]" />
                   <span className="text-[12px] font-black uppercase tracking-wider text-[#1A1A1A]">
                     {filterRating ? `${filterRating} Star Reviews` : 'All Reviews'}
                   </span>
                </div>
                {filterRating && (
                  <button 
                    onClick={() => setFilterRating(null)}
                    className="text-[12px] font-bold text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    Reset
                  </button>
                )}
             </div>
          </div>

          {/* Reviews Grid */}
          {filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {filteredReviews.map((review, index) => (
                <ReviewCard 
                  key={review.id}
                  review={review}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-[#F8FAFC] rounded-[48px] border-2 border-dashed border-gray-200 mb-24"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 border border-gray-100">
                 <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-[22px] font-black text-[#1A1A1A] mb-3">No matching reviews</h4>
              <p className="text-gray-500 max-w-sm mx-auto mb-10 text-[15px]">We couldn't find any reviews matching <span className="text-[#FF6B35] font-bold">"{searchQuery}"</span> for this rating.</p>
              <Button 
                variant="outline"
                onClick={() => {setSearchQuery(''); setFilterRating(null);}}
                className="h-12 border-gray-200 text-gray-600 rounded-full font-bold px-8"
              >
                Clear All Criteria
              </Button>
            </motion.div>
          )}

          {/* Write Review CTA */}
          <WriteReviewCTA />
        </div>
      </section>
    </main>
  );
}
