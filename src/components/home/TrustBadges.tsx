// components/home/TrustBadges.tsx
"use client";

import React from 'react';
import { Shield, Truck, RefreshCw, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const TrustBadges: React.FC = () => {
  const badges: TrustBadge[] = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Shopping',
      description: '100% protected payments'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Premium Quality',
      description: 'Guaranteed authentic'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center text-white bg-gradient-to-br from-[#FF6B35] to-[#E85A28] group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
