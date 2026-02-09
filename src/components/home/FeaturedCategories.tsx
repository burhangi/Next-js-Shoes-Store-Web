// 📄 /components/home/FeaturedCategories.tsx - FIXED
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/lib/data/mockData";
import { Button } from "@/components/ui/button";

export const FeaturedCategories = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Calculate badges for demo purposes
  const getBadge = (index: number) => {
    if (index % 5 === 0) return { text: "NEW", color: "bg-[#10B981] text-white" };
    if (index % 5 === 1) return { text: "🔥 HOT", color: "bg-[#F59E0B] text-white" };
    if (index % 5 === 2) return { text: "SALE", color: "bg-[#EF4444] text-white" };
    return null;
  };

  const duplicatedCategories = [...categories, ...categories, ...categories];
  
  // Auto-scroll interval
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        handleScroll('right');
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.querySelector('.carousel-card');
    if (!card) return;

    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 12 : 24;
    const itemWidth = card.clientWidth + gap;
    const scrollAmount = isMobile ? itemWidth * 2 : itemWidth;
    
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-[40px] md:py-[80px] bg-white overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              Featured Categories
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              Browse our premium footwear
            </p>
          </div>
        
          <Link href="/categories" className="flex items-center gap-1 md:gap-2 text-[#FF6B35] text-[13px] md:text-[15px] font-bold hover:text-[#E85A28] group transition-all duration-300 shrink-0">
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Categories</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Navigation Button - Left (Desktop Only) */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full border-2 border-[#E5E7EB] items-center justify-center text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous category"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Carousel Track */}
          <div 
            ref={scrollContainerRef}
            className="carousel-wrapper flex overflow-x-auto overflow-y-hidden py-4 gap-3 md:gap-6 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedCategories.map((category, index) => {
               const badge = getBadge(index);
               return (
                <div
                  key={`${category.id}-${index}`}
                  className="carousel-card flex-shrink-0 select-none snap-start w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] xl:w-[calc((100%-96px)/5)]"
                >
                  <Link href={`/categories/${category.slug}`} className="block h-full group relative">
                    <div className="h-full bg-white border border-[#E5E7EB] rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 group-hover:border-[#FF6B35] group-hover:shadow-[0_8px_24px_rgba(255,107,53,0.15)] group-hover:-translate-y-2 group-active:border-[#E85A28] group-active:shadow-[0_4px_12px_rgba(255,107,53,0.12)] group-active:scale-[0.98]">
                      
                      {/* Image Container */}
                      <div className="relative h-[120px] md:h-[200px] bg-[#F8F9FA] overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 group-active:scale-105"
                        />
                        
                        {/* Mobile Overlay */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:to-[#FF6B35]/10 transition-colors duration-200" />
                        
                        {/* Badge */}
                        {badge && (
                          <span 
                            className={`absolute top-2 right-2 md:top-4 md:right-4 ${badge.color} text-[9px] md:text-[12px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105 z-10`}
                          >
                            {badge.text}
                          </span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-2.5 md:p-4">
                        <div className="block md:flex items-center justify-between mb-1 md:mb-2">
                           <h3 className="text-[14px] md:text-[20px] font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors duration-300 truncate leading-tight">
                             {category.name}
                           </h3>
                           <ArrowRight className="hidden md:block h-4 w-4 text-[#9CA3AF] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#FF6B35] transition-all duration-300" />
                        </div>
                        <p className="text-[11px] md:text-[14px] text-[#9CA3AF] group-hover:text-[#4B5563] transition-colors duration-300 font-medium">
                          {category.itemCount || category.productCount || 0}+ Items
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Navigation Button - Right (Desktop Only) */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full border-2 border-[#E5E7EB] items-center justify-center text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next category"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Pagination Dots (Mobile) */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          <div className="w-[20px] h-[4px] bg-[#FF6B35] rounded-full"></div>
          <div className="w-[4px] h-[4px] bg-[#E5E7EB] rounded-full"></div>
          <div className="w-[4px] h-[4px] bg-[#E5E7EB] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};