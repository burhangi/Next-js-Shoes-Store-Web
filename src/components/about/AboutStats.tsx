"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { aboutStats } from '@/lib/data/about-data';
import { cn } from '@/lib/utils/cn';

export const AboutStats: React.FC = () => {
  const statColors = [
    { bg: 'from-blue-50 to-indigo-50', icon: 'text-blue-600', border: 'border-blue-100' },
    { bg: 'from-amber-50 to-orange-50', icon: 'text-amber-600', border: 'border-amber-100' },
    { bg: 'from-emerald-50 to-green-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
    { bg: 'from-purple-50 to-pink-50', icon: 'text-purple-600', border: 'border-purple-100' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 border-y border-gray-100 relative overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of customers worldwide, delivering excellence every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {aboutStats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = statColors[index % statColors.length];
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className={cn(
                  "p-6 md:p-8 rounded-2xl bg-gradient-to-br border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                  colors.bg,
                  colors.border
                )}>
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={cn(
                      "w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                      colors.border
                    )}>
                      <Icon className={cn("w-6 h-6 md:w-7 md:h-7", colors.icon)} />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary tracking-tight mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
