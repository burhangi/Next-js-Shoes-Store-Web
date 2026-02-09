"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, ArrowRight } from 'lucide-react';
import { contactMethods } from '@/lib/data/help-data';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export const HelpContactSupport: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-secondary via-secondary-dark to-primary overflow-hidden w-full relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <Headphones className="w-32 h-32 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 rotate-180">
          <Headphones className="w-40 h-40 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Headphones className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Still Need Help?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get in Touch With
            <span className="block mt-2">Our Support Team</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Our dedicated team is available 24/7 to provide you with personalized assistance.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            
            return (
              <motion.a
                key={method.method}
                href={method.action}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  {/* Availability Badge */}
                  {method.available && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 border border-green-400/30 w-fit mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-bold text-green-300">Available Now</span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                      method.color
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Method Name */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {method.method}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-3">
                    {method.description}
                  </p>

                  {/* Detail */}
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-semibold text-white/90">
                      {method.detail}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-8 md:p-10 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Our support team is ready to help you with any questions or concerns.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-secondary rounded-full font-bold shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              <span>Contact Us Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">&lt;2min</div>
            <div className="text-sm text-white/70">Avg Response Time</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-white/70">Support Available</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <div className="text-sm text-white/70">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
