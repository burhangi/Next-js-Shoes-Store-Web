// 📦 src/components/home/NewsletterSection.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Shield, Gift, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const benefits = [
    { icon: Shield, text: 'No spam, ever' },
    { icon: Gift, text: 'Weekly exclusive deals' },
    { icon: Sparkles, text: 'Unsubscribe anytime' }
  ];

  return (
    <section className="pt-[40px] md:pt-[80px] pb-0 bg-gradient-to-br from-[#FF6B35] via-[#FF7A4D] to-[#E85A28] relative overflow-hidden w-full">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10 pb-[40px] md:pb-[80px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Mail className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-semibold">Join 10,000+ Subscribers</span>
            </div>

            {/* Title */}
            <h2 className="text-[24px] md:text-[42px] lg:text-[48px] font-bold text-white mb-4 md:mb-6 leading-tight">
              Subscribe & Save <span className="text-yellow-300">25%</span>
            </h2>

            {/* Description */}
            <p className="text-[14px] md:text-[18px] text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive newsletter family and get the latest deals, style updates, and a 25% discount code delivered straight to your inbox.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 md:py-5 rounded-xl md:rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 text-sm md:text-base font-medium shadow-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="px-8 md:px-10 py-4 md:py-5 bg-[#1A1A1A] hover:bg-black text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
              >
                {isSubmitted ? (
                  <>
                    <Check className="h-5 w-5" />
                    Subscribed!
                  </>
                ) : isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90 text-xs md:text-sm"
              >
                <benefit.icon className="h-4 w-4 md:h-5 md:w-5 text-yellow-300" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
