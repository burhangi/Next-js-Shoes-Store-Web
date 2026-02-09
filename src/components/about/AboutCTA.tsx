"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const AboutCTA: React.FC = () => {
  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-secondary via-secondary-dark to-primary rounded-3xl p-8 md:p-16 lg:p-20 text-center overflow-hidden"
        >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            {/* Decorative Icons */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 left-10"
                >
                  <ArrowRight className="w-16 h-16 text-white" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-10 right-10"
                >
                  <ArrowRight className="w-20 h-20 text-white" />
                </motion.div>
            </div>

            <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
                >
                  <span className="text-sm font-bold text-white">Ready to Step Up?</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto"
                >
                    Take Your Style To The
                    <span className="block mt-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                      Next Level Today
                    </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    Join over 120,000 satisfied customers who have discovered the perfect blend of comfort and luxury. Your next favorite pair is waiting.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Link href="/products">
                        <Button className="h-14 px-10 bg-white hover:bg-gray-100 text-secondary rounded-full text-base font-bold shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-105">
                            Shop The Collection
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="h-14 px-10 border-2 border-white/30 hover:border-white hover:bg-white/10 text-white rounded-full text-base font-bold transition-all duration-300 backdrop-blur-sm">
                            Contact Support
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
                >
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">Free Shipping</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-white/20" />
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">30-Day Returns</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-white/20" />
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
