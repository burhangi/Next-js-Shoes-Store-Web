// components/home/TrustFeatures.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { features } from '@/lib/data/features';

export const TrustFeatures: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-full text-2xl group-hover:bg-[#FF6B35] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:scale-110 transition-transform">{feature.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
