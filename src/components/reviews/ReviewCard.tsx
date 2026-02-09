"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ThumbsUp, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Testimonial } from '@/lib/data/testimonials';

interface ReviewCardProps {
  review: Testimonial;
  index: number;
  variant?: 'default' | 'compact' | 'featured';
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  index,
  variant = 'default' 
}) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className={cn(
        "group p-8 rounded-2xl border transition-all duration-300",
        isFeatured
          ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800"
          : "bg-white border-gray-200 hover:border-[#FF6B35]",
        isCompact ? "p-4" : "p-8",
        !isCompact && "hover:shadow-xl"
      )}
    >
      {/* Review Header */}
      <div className={cn(
        "flex items-start justify-between mb-6",
        isCompact && "mb-4"
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "rounded-lg overflow-hidden flex-shrink-0",
            isCompact 
              ? "w-10 h-10" 
              : "w-14 h-14 rounded-xl",
            isFeatured 
              ? "bg-white/10 border border-white/20" 
              : "bg-gray-100"
          )}>
            {review.image ? (
              <img 
                src={review.image} 
                alt={review.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cn(
                "w-full h-full flex items-center justify-center",
                isFeatured 
                  ? "bg-gradient-to-br from-white/20 to-transparent text-white" 
                  : "bg-gradient-to-br from-[#FF6B35] to-[#E85A28] text-white"
              )}>
                <span className={cn(
                  "font-bold",
                  isCompact ? "text-lg" : "text-xl"
                )}>
                  {review.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h4 className={cn(
              "font-bold",
              isFeatured ? "text-white" : "text-gray-900",
              isCompact ? "text-base" : "text-lg"
            )}>
              {review.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              {review.verified && (
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium rounded-full",
                  isFeatured
                    ? "bg-white/20 text-white"
                    : "bg-green-100 text-green-700",
                  isCompact ? "px-2 py-0.5" : "px-2 py-1"
                )}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
              <span className={cn(
                "font-medium",
                isFeatured ? "text-gray-300" : "text-gray-600",
                isCompact ? "text-xs" : "text-sm"
              )}>
                {review.role}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                isCompact ? "w-3 h-3" : "w-4 h-4",
                i < review.rating 
                  ? isFeatured 
                    ? "text-yellow-400 fill-current" 
                    : "text-[#FF6B35] fill-current"
                  : isFeatured 
                    ? "text-gray-600" 
                    : "text-gray-300"
              )} 
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-6">
        <p className={cn(
          "leading-relaxed italic",
          isFeatured ? "text-gray-300" : "text-gray-700",
          isCompact ? "text-sm" : "text-base"
        )}>
          "{review.content}"
        </p>
      </div>

      {/* Review Footer */}
      <div className={cn(
        "pt-4 border-t flex flex-wrap items-center justify-between gap-4",
        isFeatured 
          ? "border-gray-700" 
          : "border-gray-100",
        isCompact && "pt-3"
      )}>
        <div className="flex items-center gap-4">
          {review.location && (
            <div className={cn(
              "flex items-center gap-1.5",
              isFeatured ? "text-gray-400" : "text-gray-500",
              isCompact ? "text-xs" : "text-sm"
            )}>
              <MapPin className={cn("flex-shrink-0", isCompact ? "w-3 h-3" : "w-4 h-4")} />
              <span>{review.location}</span>
            </div>
          )}
          {review.purchaseDate && (
            <div className={cn(
              "flex items-center gap-1.5",
              isFeatured ? "text-gray-400" : "text-gray-500",
              isCompact ? "text-xs" : "text-sm"
            )}>
              <Calendar className={cn("flex-shrink-0", isCompact ? "w-3 h-3" : "w-4 h-4")} />
              <span>
                {new Date(review.purchaseDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>
        
        <button className={cn(
          "flex items-center gap-1.5 font-medium transition-colors",
          isFeatured 
            ? "text-white hover:text-yellow-400" 
            : "text-gray-700 hover:text-[#FF6B35]",
          isCompact ? "text-xs" : "text-sm"
        )}>
          <ThumbsUp className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
          Helpful
        </button>
      </div>
    </motion.div>
  );
};