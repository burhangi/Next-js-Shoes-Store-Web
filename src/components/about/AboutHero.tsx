"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowRight, Sparkles, Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary pt-32 pb-20 overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative Shoes Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 rotate-12">
          <Sparkles className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-40 right-20 -rotate-12">
          <Award className="w-20 h-20 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4 rotate-45">
          <Sparkles className="w-12 h-12 text-white" />
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
            <Info className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Established 2015</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
          >
            Redefining The
            <span className="block mt-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Luxury Footwear
            </span>
            <span className="block mt-2">Experience</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            A sanctuary for quality enthusiasts. We bridge the gap between timeless craftsmanship and contemporary design, delivering footwear that speaks to the modern connoisseur.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/products">
              <Button className="h-14 px-10 bg-white hover:bg-gray-100 text-secondary rounded-full text-base font-bold shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-105">
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-14 px-10 border-2 border-white/30 hover:border-white hover:bg-white/10 text-white rounded-full text-base font-bold transition-all duration-300 backdrop-blur-sm">
                Learn Our Story
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">120K+</div>
              <div className="text-sm text-white/80 font-medium">Happy Customers</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">850+</div>
              <div className="text-sm text-white/80 font-medium">Premium Designs</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-white/80 font-medium">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium uppercase tracking-wider">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
