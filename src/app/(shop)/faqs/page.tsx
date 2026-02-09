"use client";

import React, { useState, useMemo } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { FAQAccordion } from '@/components/faqs/FAQAccordion';
import { FAQCategories } from '@/components/faqs/FAQCategories';
import { TrendingFaqs } from '@/components/faqs/TrendingFaqs';
import { SupportChannels } from '@/components/faqs/SupportChannels';
import { FAQS, FAQ_CATEGORIES } from '@/lib/data/faqs';
import { HelpCircle, Search, MessageCircle, Phone, ArrowRight, Sparkles, LifeBuoy, BookOpen, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = faq.category === activeCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (searchQuery) return matchesSearch;
      return matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="bg-white overflow-x-hidden w-full">
      {/* Modern Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary pt-32 pb-20 overflow-hidden w-full">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <HelpCircle className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">24/7 Knowledge Base</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              How Can We
              <span className="block mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Help You Today?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Search our comprehensive knowledge base or browse by category to find instant answers to your questions.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
              <input
                type="text"
                placeholder="Search for answers... (e.g., shipping, returns, sizing)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 md:h-18 pl-16 pr-6 rounded-2xl bg-white border-2 border-white/20 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-base md:text-lg shadow-2xl"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{FAQS.length}+</div>
                <div className="text-sm text-white/80 font-medium">Articles</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5</div>
                <div className="text-sm text-white/80 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">&lt;2m</div>
                <div className="text-sm text-white/80 font-medium">Avg Response</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-[#F8FAFC] w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-[12px] font-black text-[#FF6B35] uppercase tracking-widest">In High Demand</span>
              </div>
              <h2 className="text-[32px] font-black text-[#1A1A1A] tracking-tighter">Popular Topics</h2>
            </div>
          </div>
          <TrendingFaqs />
        </div>
      </section>

      {/* Core FAQ Section */}
      <section className="py-24 bg-white relative w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sidebar Navigation */}
            <div className="lg:w-[380px] flex-shrink-0">
              <div className="sticky top-32">
                <div className="mb-10">
                   <h2 className="text-[40px] font-black text-[#1A1A1A] leading-[1] tracking-tighter mb-4">
                     Explore <br />
                     <span className="text-[#FF6B35]">Resources</span>
                   </h2>
                   <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
                     Navigate through our specialized service categories to find the exact guidance you need for your luxury purchase.
                   </p>
                </div>
                
                <FAQCategories 
                  categories={FAQ_CATEGORIES}
                  activeCategory={activeCategory}
                  onCategoryChange={(id) => {
                    setActiveCategory(id);
                    setSearchQuery('');
                  }}
                />

                {/* Status Indicator */}
                <div className="mt-12 p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-black/[0.02]">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse" />
                      <span className="text-[12px] font-black uppercase text-[#1A1A1A] tracking-wider">Live Agent Support Active</span>
                   </div>
                   <p className="text-[13px] text-gray-500 mb-8 font-medium">Wait times are currently under 2 minutes. Our specialists are ready to help.</p>
                   <Link href="/contact">
                     <Button className="w-full h-14 bg-[#1A1A1A] hover:bg-[#FF6B35] text-white rounded-full font-bold transition-all duration-300 shadow-lg shadow-black/10">
                       Chat With Expert <ArrowRight className="ml-2 w-4 h-4" />
                     </Button>
                   </Link>
                </div>
              </div>
            </div>

            {/* FAQ content */}
            <div className="flex-1">
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Knowledge Base</span>
                   <h3 className="text-[24px] md:text-[28px] font-black text-[#1A1A1A] tracking-tight">
                     {searchQuery ? `Search Results: "${searchQuery}"` : FAQ_CATEGORIES.find(c => c.id === activeCategory)?.name}
                   </h3>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                   <span className="text-[13px] font-bold text-[#FF6B35]">
                     {filteredFaqs.length} Related Articles
                   </span>
                </div>
              </div>

              {filteredFaqs.length > 0 ? (
                <FAQAccordion faqs={filteredFaqs} />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 bg-gray-50/50 rounded-[48px] border-2 border-dashed border-gray-100"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 border border-gray-100">
                     <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <h4 className="text-[22px] font-black text-[#1A1A1A] mb-3">No Results Found</h4>
                  <p className="text-gray-500 max-w-sm mx-auto mb-10 text-[15px]">We couldn't find matches for <span className="text-[#FF6B35] font-bold">"{searchQuery}"</span>. Try adjusting your search or contact support.</p>
                  <Button 
                    variant="outline"
                    onClick={() => {setSearchQuery(''); setActiveCategory('orders');}}
                    className="h-12 border-gray-200 text-gray-600 rounded-full font-bold px-8"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}

              {/* Quick links block */}
              {!searchQuery && (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-8 rounded-[40px] bg-[#1A1A1A] text-white flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-[#FF6B35] transition-colors">
                         <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-[18px] font-black mb-1">User Manuals</h4>
                         <p className="text-[12px] text-gray-400 font-medium">Download product guides</p>
                      </div>
                   </div>
                   <div className="p-8 rounded-[40px] bg-white border border-gray-100 flex items-center gap-6 group hover:translate-y-[-4px] hover:border-[#FF6B35] transition-all shadow-xl shadow-black/[0.01]">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-[18px] font-black mb-1 text-[#1A1A1A]">Warranty Info</h4>
                         <p className="text-[12px] text-gray-500 font-medium tracking-tight">Check your coverage status</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Support Omnichannel Section */}
      <section className="py-24 bg-[#F8FAFC] w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center mb-16">
            <LifeBuoy className="w-12 h-12 text-[#FF6B35] mx-auto mb-6" />
            <h2 className="text-[40px] md:text-[48px] font-black text-[#1A1A1A] tracking-tighter leading-tight">
              Still Need <span className="text-[#FF6B35]">Support?</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-[15px] font-medium leading-relaxed">
              If our documentation didn't solve your issue, our team of dedicated specialists is standing by to provide white-glove assistance across all major platforms.
            </p>
          </div>
          <SupportChannels />
        </div>
      </section>

      {/* Trust & Policy Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100 w-full overflow-hidden">
         <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Your Trust, Our Priority
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing transparent policies and secure shopping experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Link href="/returns" className="group">
                 <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                   <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                     <ArrowRight className="w-6 h-6 text-primary group-hover:text-white" />
                   </div>
                   <h5 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Refund Policy</h5>
                   <p className="text-gray-600 text-sm mb-3">30-day hassle-free returns</p>
                   <span className="text-primary font-bold text-sm group-hover:underline">Learn More →</span>
                 </div>
               </Link>

               <Link href="/privacy" className="group">
                 <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                   <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                     <ShieldCheck className="w-6 h-6 text-blue-500 group-hover:text-white" />
                   </div>
                   <h5 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Privacy Policy</h5>
                   <p className="text-gray-600 text-sm mb-3">Your data is protected</p>
                   <span className="text-primary font-bold text-sm group-hover:underline">Read More →</span>
                 </div>
               </Link>

               <Link href="/terms" className="group">
                 <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                   <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:scale-110 transition-all">
                     <BookOpen className="w-6 h-6 text-purple-500 group-hover:text-white" />
                   </div>
                   <h5 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Terms of Service</h5>
                   <p className="text-gray-600 text-sm mb-3">Know your rights</p>
                   <span className="text-primary font-bold text-sm group-hover:underline">View Terms →</span>
                 </div>
               </Link>

               <div className="group cursor-default">
                 <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 h-full">
                   <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                     <ShieldCheck className="w-6 h-6 text-green-600" />
                   </div>
                   <h5 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Secure Shopping</h5>
                   <p className="text-gray-600 text-sm mb-3">256-bit SSL Encryption</p>
                   <div className="flex items-center gap-1">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-green-600 font-bold text-sm">100% Protected</span>
                   </div>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
