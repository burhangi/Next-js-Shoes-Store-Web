"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HelpCategory } from '@/lib/data/help-data';
import { cn } from '@/lib/utils/cn';

interface HelpCategoriesProps {
  categories: HelpCategory[];
  onCategorySelect?: (categoryId: string) => void;
}

export const HelpCategories: React.FC<HelpCategoriesProps> = ({ 
  categories,
  onCategorySelect 
}) => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Browse by
            <span className="block mt-2 text-primary">Category</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Find the information you need organized by topic.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => onCategorySelect && onCategorySelect(category.id)}
                className="group text-left"
              >
                <div className="p-6 md:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                      category.color
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Article Count & Arrow */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-500">
                      {category.articleCount} articles
                    </span>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                      <span>Browse</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
