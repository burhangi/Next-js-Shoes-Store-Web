// 📦src/components/layout/header/CategoriesOverlay.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Grid, Flame, Star, TrendingUp, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { megaMenuCategories } from '@/lib/navigation-data';

interface CategoriesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoriesOverlay: React.FC<CategoriesOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(megaMenuCategories[0]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredCategories = searchQuery
    ? megaMenuCategories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.subcategories.some((sub) =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : megaMenuCategories;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Overlay */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-0 z-[10000] bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <Grid className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary">Categories</h2>
                    <p className="text-xs text-text-secondary">Browse all products</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="p-4">
                {searchQuery ? (
                  // Search Results
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      Results for "{searchQuery}"
                    </div>
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <Link
                          href={`/categories/${category.id}`}
                          onClick={onClose}
                          className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <span className="font-medium text-gray-900">{category.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Main Content
                  <div className="space-y-6">
                    {/* Category Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">All Categories</h3>
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <TrendingUp className="h-3 w-3" />
                          <span>Popular Now</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {megaMenuCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                              activeCategory.id === category.id
                                ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary"
                                : "bg-gray-50 border-gray-200 hover:border-primary/50"
                            )}
                          >
                            <span className="text-2xl mb-2">{category.icon}</span>
                            <span className="font-medium text-gray-900 text-sm">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              {category.subcategories.length} types
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Category Subcategories */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          {activeCategory.name}
                        </h3>
                        <Link
                          href={`/categories/${activeCategory.id}`}
                          onClick={onClose}
                          className="text-sm text-primary font-medium flex items-center gap-1"
                        >
                          View all <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="space-y-2">
                        {activeCategory.subcategories.map((subcat) => (
                          <Link
                            key={subcat.name}
                            href={subcat.href}
                            onClick={onClose}
                            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-primary/30 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg">
                                👟
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-primary">
                                  {subcat.name}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                  <span>{subcat.count} products</span>
                                  {subcat.isTrending && (
                                    <>
                                      <span className="text-[8px]">•</span>
                                      <span className="flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                        <span className="text-red-500 font-medium">Trending</span>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {subcat.isTrending && (
                                <span className="text-[10px] bg-gradient-to-r from-red-500 to-primary text-white px-2 py-1 rounded-full font-bold">
                                  HOT
                                </span>
                              )}
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-center hover:shadow-lg transition-shadow"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};