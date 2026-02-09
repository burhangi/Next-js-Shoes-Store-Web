"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  recommendationRate: string;
  ratingBreakdown: Array<{ rating: number; count: number; percentage: number }>;
  filterRating: number | null;
  onFilterChange: (rating: number | null) => void;
  variant?: 'default' | 'compact';
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({
  averageRating,
  totalReviews,
  recommendationRate,
  ratingBreakdown,
  filterRating,
  onFilterChange,
  variant = 'default'
}) => {
  const isCompact = variant === 'compact';

  return (
    <div className={cn(
      "mb-12",
      !isCompact && "grid grid-cols-1 lg:grid-cols-12 gap-8"
    )}>
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-gray-900 text-white text-center relative overflow-hidden group",
          isCompact 
            ? "p-6 mb-6" 
            : "lg:col-span-4 p-8 flex flex-col items-center justify-center"
        )}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
           <Star className="w-32 h-32 fill-white" />
        </div>
        
        <h3 className={cn(
          "font-bold uppercase tracking-widest text-[#FF6B35] mb-4",
          isCompact ? "text-xs" : "text-sm"
        )}>
          Verified Satisfaction
        </h3>
        <div className={cn(
          "font-black leading-none mb-4",
          isCompact ? "text-5xl" : "text-7xl"
        )}>
          {averageRating.toFixed(1)}
        </div>
        
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                i < Math.floor(averageRating) ? "fill-[#FF6B35] text-[#FF6B35]" : "text-white/20",
                isCompact ? "w-5 h-5" : "w-6 h-6"
              )} 
            />
          ))}
        </div>
        
        <p className={cn(
          "text-gray-400",
          isCompact ? "text-sm" : "text-base"
        )}>
          Based on <span className="text-white font-bold">{totalReviews.toLocaleString()}</span> reviews
        </p>
      </motion.div>

      {/* Rating Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "rounded-2xl bg-white border border-gray-200",
          isCompact 
            ? "p-6 mb-6" 
            : "lg:col-span-5 p-8"
        )}
      >
        <div className={cn(
          "flex items-center justify-between mb-6",
          isCompact && "mb-4"
        )}>
          <h3 className={cn(
            "font-bold text-gray-900",
            isCompact ? "text-lg" : "text-xl"
          )}>
            Rating Breakdown
          </h3>
          <button 
            onClick={() => onFilterChange(null)}
            className={cn(
              "font-medium text-[#FF6B35] hover:underline",
              isCompact ? "text-xs" : "text-sm"
            )}
          >
            Clear Filter
          </button>
        </div>
        
        <div className="space-y-3">
          {ratingBreakdown.map((item) => (
            <button
              key={item.rating}
              onClick={() => onFilterChange(filterRating === item.rating ? null : item.rating)}
              className={cn(
                "w-full group flex items-center gap-4 transition-all duration-300 p-2 rounded-xl",
                filterRating === item.rating ? "bg-orange-50" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-1.5 w-16">
                <span className={cn(
                  "font-bold text-gray-900",
                  isCompact ? "text-sm" : "text-base"
                )}>
                  {item.rating}
                </span>
                <Star className={cn(
                  "fill-[#FF6B35] text-[#FF6B35]",
                  isCompact ? "w-3 h-3" : "w-4 h-4"
                )} />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E85A28] rounded-full"
                />
              </div>
              <span className={cn(
                "font-bold text-gray-500 w-12 text-right",
                isCompact ? "text-xs" : "text-sm"
              )}>
                {item.percentage.toFixed(0)}%
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trust Badges */}
      {!isCompact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 flex flex-col gap-4"
        >
          <div className="p-6 rounded-xl bg-orange-50 border border-orange-100 flex-1 flex flex-col justify-center">
              <TrendingUp className="w-8 h-8 text-[#FF6B35] mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{recommendationRate}</div>
              <p className="text-sm text-gray-600">Would recommend to a friend</p>
          </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 flex-1 flex flex-col justify-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600 mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">100% Verified</div>
              <p className="text-sm text-gray-600">Genuine purchase reviews only</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};