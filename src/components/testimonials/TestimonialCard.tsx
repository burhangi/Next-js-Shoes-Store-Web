"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Testimonial } from '@/lib/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  featured?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  index = 0,
  featured = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className={cn(
        "bg-white rounded-2xl md:rounded-[32px] p-3 md:p-6 lg:p-6 border transition-all duration-500 h-full flex flex-col relative overflow-hidden",
        featured 
          ? 'border-[#FF6B35]/30 shadow-xl md:shadow-2xl shadow-orange-500/5' 
          : 'border-gray-100 shadow-sm hover:shadow-lg md:hover:shadow-xl hover:shadow-black/[0.02] hover:border-orange-100'
      )}>
        {/* Quote Ornament */}
        <Quote className={cn(
          "absolute -top-3 -right-3 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 opacity-[0.03] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12",
          featured ? "text-[#FF6B35]" : "text-[#1A1A1A]"
        )} />

        {/* Rating & Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3 md:w-3.5 md:h-3.5",
                  i < testimonial.rating ? "fill-[#FF6B35] text-[#FF6B35]" : "text-gray-200"
                )}
              />
            ))}
          </div>
          {testimonial.verified && (
            <div className="flex items-center gap-0.5 md:gap-1 text-[8px] md:text-[9px] font-black text-green-600 uppercase tracking-wider md:tracking-widest bg-green-50 px-1.5 md:px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-2 h-2 md:w-2.5 md:h-2.5" />
              Verified
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-[12px] md:text-[14px] lg:text-[15px] text-gray-600 leading-relaxed italic mb-4 md:mb-6 flex-1 line-clamp-4 md:line-clamp-none">
          "{testimonial.content}"
        </p>

        {/* Customer Info */}
        <div className="flex items-center gap-2 md:gap-3 pt-3 md:pt-4 border-t border-dashed border-gray-100 mt-auto">
          <div className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#333333] flex items-center justify-center text-white font-black text-[14px] md:text-[16px] lg:text-[18px] group-hover:scale-105 transition-transform duration-300">
            {testimonial.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-black text-[#1A1A1A] text-[13px] md:text-[14px] lg:text-[15px] leading-none mb-0.5 md:mb-1 group-hover:text-[#FF6B35] transition-colors truncate">
              {testimonial.name}
            </h4>
            <p className="text-gray-400 text-[10px] md:text-[11px] font-bold uppercase tracking-tight truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
