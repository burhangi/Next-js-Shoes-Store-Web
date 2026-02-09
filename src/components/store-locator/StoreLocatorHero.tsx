"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Navigation } from 'lucide-react';

export const StoreLocatorHero: React.FC = () => {
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
          <MapPin className="w-20 h-20 text-white" />
        </div>
        <div className="absolute top-40 right-20 -rotate-12">
          <Navigation className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <Sparkles className="w-16 h-16 text-white" />
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
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">9 Locations Nationwide</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
          >
            Find a Store
            <span className="block mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Near You
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Visit our premium retail locations for personalized service, exclusive collections, and an unforgettable shopping experience.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">9</div>
              <div className="text-sm text-white/80 font-medium">Store Locations</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2</div>
              <div className="text-sm text-white/80 font-medium">Flagship Stores</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">7</div>
              <div className="text-sm text-white/80 font-medium">Days a Week</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
