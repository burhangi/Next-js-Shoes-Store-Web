"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { FAQCategory } from '@/lib/data/faqs';

interface FAQCategoriesProps {
  categories: FAQCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export const FAQCategories: React.FC<FAQCategoriesProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  const categoryColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100', text: 'text-blue-600' },
    { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100', text: 'text-green-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100', text: 'text-purple-600' },
    { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'bg-pink-100', text: 'text-pink-600' },
    { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-100', text: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {categories.map((category, index) => {
        const colors = categoryColors[index % categoryColors.length];
        
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "group w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border-2",
              activeCategory === category.id
                ? "bg-gradient-to-r from-primary to-accent border-primary shadow-xl shadow-primary/20 scale-105"
                : "bg-white border-gray-100 hover:border-primary/30 hover:shadow-lg hover:scale-102"
            )}
          >
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all shrink-0",
              activeCategory === category.id 
                ? "bg-white/20 scale-110" 
                : `${colors.icon} group-hover:scale-110`
            )}>
              {category.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "text-sm font-bold mb-1 transition-colors truncate",
                activeCategory === category.id 
                  ? "text-white" 
                  : "text-secondary group-hover:text-primary"
              )}>
                {category.name}
              </h4>
              <p className={cn(
                "text-xs leading-tight transition-colors line-clamp-1",
                activeCategory === category.id 
                  ? "text-white/80" 
                  : "text-gray-500 group-hover:text-gray-700"
              )}>
                {category.description}
              </p>
            </div>

            {/* Active Indicator */}
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0",
              activeCategory === category.id 
                ? "bg-white text-primary opacity-100 scale-100" 
                : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full",
                activeCategory === category.id ? "bg-primary" : "bg-gray-400"
              )} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
