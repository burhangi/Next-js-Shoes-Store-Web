"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutMission: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#1A1A1A] overflow-hidden relative w-full">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-black/50"
            >
              <Image 
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
                alt="Shoe Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-block px-3 py-1 rounded-full bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-widest mb-3">
                  The Gold Standard
                </div>
                <h3 className="text-white text-[22px] md:text-[28px] font-black leading-tight tracking-tighter">
                  Crafting Excellence <br />
                  Since 2015
                </h3>
              </div>
            </motion.div>
            
            {/* Floating Element - More compact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#FF6B35] rounded-full flex items-center justify-center p-6 hidden md:flex shadow-2xl shadow-[#FF6B35]/20 border-4 border-[#1A1A1A]"
            >
                <div className="text-white text-center">
                    <div className="text-[32px] font-black leading-none mb-1">100%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest leading-none">Handcrafted <br />Premium Quality</div>
                </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[28px] md:text-[42px] font-black text-white leading-[1.1] tracking-tighter mb-6">
                Our Mission <br />
                <span className="text-[#FF6B35]">Beyond The Footwear</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-[16px] leading-relaxed">
                <p>
                    Luxury Store was founded with a singular conviction: that everyone deserves to walk in shoes that embody both prestige and comfort. We began as a small workshop in NYC, driven by a obsession with premium leathers and timeless silhouettes.
                </p>
                <p>
                    Our mission is to empower individuals through exceptional footwear. We believe that the right pair of shoes isn't just an accessory—it's a foundation for confidence, a statement of intent, and a commitment to quality.
                </p>
                <p>
                    Today, we collaborate with heritage tanneries and modern designers to push the boundaries of what's possible in footwear. We are not just selling shoes; we are curating a legacy of excellence.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                <div>
                   <div className="text-[24px] font-black text-white mb-1">Authentic</div>
                   <div className="text-[12px] font-bold text-[#FF6B35] uppercase tracking-widest">Heritage Materials</div>
                </div>
                <div>
                   <div className="text-[24px] font-black text-white mb-1">Ethical</div>
                   <div className="text-[12px] font-bold text-[#FF6B35] uppercase tracking-widest">Global Sourcing</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
