"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WriteReviewCTAProps {
  variant?: 'default' | 'compact' | 'featured';
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const WriteReviewCTA: React.FC<WriteReviewCTAProps> = ({
  variant = 'default',
  title = "Loved Your New Perfect Pair?",
  description = "Share your experience with the community. Your reviews help fellow footwear enthusiasts find their next favorite pair of shoes.",
  buttonText = "Write A Review",
  onButtonClick
}) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-2xl text-center flex flex-col items-center justify-center overflow-hidden",
        isFeatured
          ? "bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-white p-12"
          : "bg-gradient-to-br from-gray-50 to-white border border-gray-200",
        isCompact ? "p-8" : "p-12"
      )}
    >
      {/* Background patterns */}
      {!isCompact && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Sparkles className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 text-gray-400" />
          <MessageSquare className="absolute bottom-0 left-0 w-48 h-48 translate-y-1/4 -translate-x-1/4 text-gray-400" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={cn(
            "rounded-lg border backdrop-blur-md",
            isFeatured
              ? "bg-white/10 border-white/10 p-2"
              : "bg-white/80 border-gray-200 p-2"
          )}>
            <PenSquare className={cn(
              isFeatured ? "text-[#FF6B35]" : "text-gray-700",
              isCompact ? "w-4 h-4" : "w-5 h-5"
            )} />
          </div>
          <span className={cn(
            "font-bold uppercase tracking-widest",
            isFeatured ? "text-[#FF6B35]" : "text-gray-600",
            isCompact ? "text-xs" : "text-sm"
          )}>
            Your Feedback Matters
          </span>
        </div>
        
        <h2 className={cn(
          "font-bold leading-tight mb-4",
          isFeatured ? "text-white" : "text-gray-900",
          isCompact ? "text-2xl" : "text-4xl"
        )}>
          {title}
        </h2>
        
        <p className={cn(
          "max-w-xl mx-auto mb-6",
          isFeatured ? "text-gray-400" : "text-gray-600",
          isCompact ? "text-sm" : "text-lg"
        )}>
          {description}
        </p>

        <Button
          onClick={onButtonClick}
          className={cn(
            "font-bold shadow-lg transition-all duration-300 transform hover:scale-105",
            isFeatured
              ? "bg-[#FF6B35] hover:bg-white hover:text-[#1A1A1A] text-white"
              : "bg-[#FF6B35] hover:bg-[#E85A28] text-white",
            isCompact ? "h-10 px-6 text-sm" : "h-14 px-10 text-base"
          )}
        >
          {buttonText}
        </Button>
      </div>
    </motion.section>
  );
};

// Helper function (if not imported)
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}