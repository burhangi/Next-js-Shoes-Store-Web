"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Award, Users, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-secondary via-secondary-dark to-primary overflow-hidden w-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 md:mb-5 border border-white/20">
              <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              <span className="text-xs md:text-sm font-bold text-white">Our Story</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-5 leading-tight">
              Crafting Excellence
              <span className="block mt-1 md:mt-2">Since 2015</span>
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-white/90 mb-5 md:mb-6 leading-relaxed">
              From a small workshop in NYC to a global premium footwear brand, we've been dedicated to delivering exceptional quality, timeless style, and unmatched comfort in every pair we create.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-7">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 md:mb-1">120K+</div>
                <div className="text-xs md:text-sm text-white/70">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 md:mb-1">850+</div>
                <div className="text-xs md:text-sm text-white/70">Products</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 md:mb-1">65+</div>
                <div className="text-xs md:text-sm text-white/70">Countries</div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-secondary rounded-full font-bold text-sm md:text-base hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>

          {/* Right: Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[1/1] lg:aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
                alt="Brand Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Video Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-3 md:border-4 border-white/40 hover:bg-white/30 hover:scale-110 transition-all duration-300 group">
                  <Play className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white ml-0.5 md:ml-1" fill="white" />
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">Watch Our Journey</p>
                    <p className="text-white/80 text-xs md:text-sm">2 min video</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gradient-to-br from-primary to-accent text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">99.9%</div>
                  <div className="text-[10px] md:text-xs text-white/80">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
