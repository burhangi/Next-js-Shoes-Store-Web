"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Grid3X3, LayoutGrid, ArrowRight, Layers, Package, TrendingUp } from 'lucide-react';
import { categories } from '@/lib/data/mockData';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

export default function AllCategoriesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeatured, setShowFeatured] = useState<boolean | undefined>(undefined);

  const filteredCategories = useMemo(() => {
    let result = [...categories];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    if (showFeatured !== undefined) {
      result = result.filter(c => c.featured === showFeatured);
    }
    result.sort((a, b) => b.itemCount - a.itemCount);
    return result;
  }, [searchQuery, showFeatured]);

  const totalItems = categories.reduce((sum, c) => sum + c.itemCount, 0);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="py-10 md:py-14 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Browse Collections</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                All Categories
              </h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl mb-6">
                Explore our curated selection of premium footwear across various styles and occasions.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{categories.length}</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase">Categories</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{totalItems}+</div>
                    <div className="text-[10px] text-white/50 font-bold uppercase">Products</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/15 transition-all text-sm font-medium"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toolbar - Sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] md:top-[96px] z-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setShowFeatured(undefined)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all duration-300",
                  showFeatured === undefined
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                All Collections
              </button>
              <button
                onClick={() => setShowFeatured(true)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all duration-300",
                  showFeatured === true
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </button>

              <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                {filteredCategories.length} found
              </span>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === 'grid' ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-700"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === 'compact' ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-700"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Categories Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {filteredCategories.length > 0 ? (
            <div className={cn(
              "grid gap-3 md:gap-5",
              viewMode === 'grid'
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            )}>
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min((index % 4) * 0.08, 0.3), duration: 0.4 }}
                >
                  <Link href={`/categories/${category.slug}`} className="group block h-full">
                    {viewMode === 'grid' ? (
                      /* Grid Card */
                      <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-400">
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                          {/* Badge */}
                          <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3">
                            <span className="px-2 py-1 md:px-2.5 md:py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] md:text-[10px] font-bold text-secondary">
                              {category.itemCount} Styles
                            </span>
                          </div>

                          {/* Featured Badge */}
                          {category.featured && (
                            <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3">
                              <span className="px-2 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-[9px] md:text-[10px] font-bold text-white flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Featured
                              </span>
                            </div>
                          )}

                          {/* Hover Arrow */}
                          <div className="absolute bottom-3 right-3 w-8 h-8 md:w-9 md:h-9 bg-primary text-white rounded-lg flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-primary/30">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 md:p-4 flex-1 flex flex-col">
                          <h3 className="text-sm md:text-base font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-primary uppercase tracking-wide">
                            Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Compact Card */
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 border-gray-200 mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-400">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-center">
                            <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              {category.itemCount} items
                            </span>
                          </div>
                        </div>
                        <h4 className="text-xs md:text-sm font-bold text-secondary group-hover:text-primary transition-colors mb-0.5">
                          {category.name}
                        </h4>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">No categories found</h3>
              <p className="text-sm text-gray-600 mb-5">
                No results for <span className="text-primary font-bold">"{searchQuery}"</span>
              </p>
              <button
                onClick={() => { setSearchQuery(''); setShowFeatured(undefined); }}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-secondary via-secondary/95 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Can't find what you're looking for?
              </h2>
              <p className="text-sm text-white/70">
                Browse all our products or contact our team for personalized assistance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 bg-white text-secondary rounded-lg font-bold text-sm hover:shadow-xl transition-all hover:scale-105"
              >
                Browse All Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
