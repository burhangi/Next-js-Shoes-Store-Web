"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FAQS } from '@/lib/data/faqs';
import Link from 'next/link';

export const TrendingFaqs: React.FC = () => {
  const trending = FAQS.filter(f => f.isPopular).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trending.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative p-6 md:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Sparkles className="w-24 h-24 text-primary" />
          </div>
          
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
               <Sparkles className="w-4 h-4 text-white" />
             </div>
             <span className="text-xs font-bold uppercase tracking-wider text-primary">
               Most Asked
             </span>
          </div>
          
          {/* Question */}
          <h4 className="text-base md:text-lg font-bold text-secondary mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {faq.question}
          </h4>
          
          {/* Answer Preview */}
          <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {faq.answer}
          </p>
          
          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase">Quick Answer</span>
            <div className="flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
