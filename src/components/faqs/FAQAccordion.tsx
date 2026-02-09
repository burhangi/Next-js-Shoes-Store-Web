"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { FAQ } from '@/lib/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "group bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300",
            openId === faq.id 
              ? "shadow-2xl shadow-primary/10 border-primary" 
              : "border-gray-100 hover:border-gray-200 hover:shadow-lg"
          )}
        >
          <button
            onClick={() => toggle(faq.id)}
            className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              {/* Question Number Badge */}
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "text-xs font-bold px-2 py-1 rounded-md transition-colors",
                  openId === faq.id 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-primary"
                )}>
                  Q{index + 1}
                </span>
                {faq.isPopular && (
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-green-50 text-green-600">
                    ⭐ Popular
                  </span>
                )}
              </div>
              
              {/* Question */}
              <span className={cn(
                "text-base md:text-lg font-bold transition-colors leading-snug block",
                openId === faq.id ? "text-secondary" : "text-secondary group-hover:text-primary"
              )}>
                {faq.question}
              </span>
            </div>

            {/* Toggle Icon */}
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
              openId === faq.id 
                ? "bg-primary text-white rotate-180 shadow-lg" 
                : "bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white"
            )}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>
          
          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-5 md:px-6 pb-6">
                  <div className="pt-4 border-t-2 border-dashed border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mt-1">
                        <span className="text-sm font-bold text-primary">A</span>
                      </div>
                      <p className="flex-1 text-gray-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
