"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HelpHeroProps {
  onSearch?: (query: string) => void;
}

export const HelpHero: React.FC<HelpHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary pt-32 pb-20 overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative Icons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 rotate-12">
          <HelpCircle className="w-20 h-20 text-white" />
        </div>
        <div className="absolute top-40 right-20 -rotate-12">
          <Sparkles className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <HelpCircle className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
          >
            <HelpCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">24/7 Support Center</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
          >
            How Can We
            <span className="block mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Help You Today?
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Search our knowledge base or browse categories below to find the answers you need.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto relative group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search for help... (e.g., track order, return policy, sizing)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 md:h-18 pl-16 pr-32 rounded-2xl bg-white border-2 border-white/20 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-white focus:ring-4 focus:ring-white/20 transition-all duration-300 text-base md:text-lg shadow-2xl"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </motion.form>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-sm text-white/70">Popular:</span>
            {['Track Order', 'Returns', 'Sizing Guide', 'Payment Methods'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  if (onSearch) onSearch(term);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                {term}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
