// 📦 src/components/home/FeaturesBenefits.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { featureBenefits } from '@/lib/data/features-benefits';

export const FeaturesBenefits: React.FC = () => {
  return (
    <section className="py-[40px] md:py-[60px] bg-gradient-to-b from-gray-50 to-white border-y border-gray-100 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {featureBenefits.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-[14px] md:text-[18px] font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-[12px] md:text-[14px] text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
