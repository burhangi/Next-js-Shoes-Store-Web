"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  children?: ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  icon,
  bgColor = "bg-gradient-to-r from-[#1A1A1A] to-[#333333]",
  textColor = "text-white",
  className,
  children
}) => {
  return (
    <section className={cn(
      "relative overflow-hidden",
      bgColor,
      className
    )}>
      {/* Background patterns - Subtle Enterprise Style */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <div className="py-12 md:py-16 lg:py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge/Subtitle */}
            {(icon || subtitle) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                {icon && (
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
                    {icon}
                  </div>
                )}
                {subtitle && (
                  <span className={cn(
                    "text-[12px] font-black uppercase tracking-[0.2em] leading-none",
                    textColor
                  )}>
                    {subtitle}
                  </span>
                )}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn(
                "text-[32px] md:text-[48px] lg:text-[56px] font-black leading-[1.1] tracking-tighter mb-6",
                textColor
              )}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "text-[15px] md:text-[17px] opacity-80 leading-relaxed max-w-2xl",
                textColor
              )}
            >
              {description}
            </motion.p>
            
            {children && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
