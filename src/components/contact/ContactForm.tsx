"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  if (formState === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[40px] border border-gray-100 text-center shadow-xl"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-[32px] font-black text-[#1A1A1A] mb-4 tracking-tighter">Message Received!</h2>
        <p className="text-gray-500 max-w-[400px] mx-auto mb-10 leading-relaxed">
          Thank you for reaching out. One of our experts will get back to you within 24 hours.
        </p>
        <Button 
          onClick={() => setFormState('idle')}
          className="h-14 px-10 bg-[#FF6B35] hover:bg-[#E85A28] text-white rounded-full font-bold transition-all"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[32px] md:text-[48px] font-black text-[#1A1A1A] leading-[1.1] tracking-tighter mb-6">
                Send Us A <br />
                <span className="text-[#FF6B35]">Direct Message</span>
              </h2>
              <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
                Have a specific question about an order or a product? Fill out the form and our specialist team will provide a tailored response.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#1A1A1A]">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                   </div>
                   <span className="text-[14px] font-bold">24/7 Priority Support</span>
                </div>
                <div className="flex items-center gap-4 text-[#1A1A1A]">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                   </div>
                   <span className="text-[14px] font-bold">Expert Product Advice</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 border border-white"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full h-14 px-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full h-14 px-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full h-14 px-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all text-[#1A1A1A] appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                  <option>Technical Issue</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/5 transition-all text-[#1A1A1A] resize-none"
                />
              </div>

              <Button 
                disabled={formState === 'loading'}
                type="submit"
                className="w-full h-16 bg-[#1A1A1A] hover:bg-[#FF6B35] text-white rounded-2xl text-[16px] font-bold shadow-xl shadow-black/10 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {formState === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};
