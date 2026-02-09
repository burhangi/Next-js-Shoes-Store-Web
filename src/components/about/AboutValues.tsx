"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { aboutValues } from '@/lib/data/about-data';
import { cn } from '@/lib/utils/cn';

export const AboutValues: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-[28px] md:text-[42px] font-black text-[#1A1A1A] leading-[1.1] tracking-tighter mb-6">
                    Guided by <br />
                    <span className="text-[#FF6B35]">Unwavering Values</span>
                </h2>
                <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
                    Our commitment to excellence goes beyond aesthetics. We believe in creating products that respect the craft, the customer, and the community.
                </p>
                <div className="w-16 h-1 bg-orange-100 rounded-full" />
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
            {aboutValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="p-6 md:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:scale-110",
                        value.color
                      )}>
                        <Icon className={cn("w-6 h-6 md:w-7 md:h-7", value.iconColor)} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {value.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-bold">Learn More</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
