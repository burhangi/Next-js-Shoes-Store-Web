// 📦src/components/layout/header/SearchOverlay.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, Clock, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/app/context/NavigationContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { handleSearch } = useNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
      onClose();
    }
  };

  const recentSearches = ['Running Shoes', 'Nike Air Max', 'Formal Shoes', 'Casual Sneakers'];
  const trendingSearches = [
    { term: 'Basketball Shoes', count: 245 },
    { term: 'Designer Heels', count: 189 },
    { term: 'Trail Running', count: 156 },
    { term: 'Loafers', count: 132 },
  ];

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

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-[10000] bg-white shadow-2xl"
          >
            {/* Search Bar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
                <form onSubmit={handleSubmit} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for shoes, brands, or categories..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-base"
                      autoFocus
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Search Content */}
            <div className="h-[60vh] overflow-y-auto">
              {query ? (
                // Search Results
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing results for "{query}"
                  </div>
                  {/* Add your search results here */}
                </div>
              ) : (
                // Recent and Trending Searches
                <div className="p-4">
                  {/* Recent Searches */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{search}</span>
                          <Search className="h-4 w-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-gray-900">Trending Now</h3>
                    </div>
                    <div className="space-y-2">
                      {trendingSearches.map((search) => (
                        <Link
                          key={search.term}
                          href={`/search?q=${encodeURIComponent(search.term)}`}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                              <Star className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-primary">
                                {search.term}
                              </div>
                              <div className="text-xs text-gray-500">
                                {search.count} products
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Trending
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};