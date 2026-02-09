// 📦 src/components/home/Testimonials.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/data/testimonials';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  // Get visible testimonials based on screen size
  // Mobile: 2 cards, Desktop: 3 cards
  const getVisibleTestimonials = () => {
    const result = [];
    const count = 3; // Always prepare 3 for desktop
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push({ ...testimonials[index], displayIndex: i });
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-[40px] md:py-[80px] bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header - Matching New Arrivals exactly */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-[#1A1A1A] mb-[4px] md:mb-[8px] leading-tight">
              Customer Stories
            </h2>
            <p className="text-[13px] md:text-[16px] text-[#6B7280]">
              Hear what our customers have to say
            </p>
          </div>

          <Link 
            href="/reviews" 
            className="flex items-center gap-1 md:gap-2 text-primary text-[13px] md:text-[15px] font-bold hover:text-primary-dark group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Reviews</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials Grid - 2 cols mobile, 3 cols desktop */}
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
          >
            {visibleTestimonials.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.id}-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={idx === 2 ? 'hidden md:block' : ''} // Hide 3rd card on mobile
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={idx}
                  featured={idx === 1} // Center card is featured
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-[#FF6B35] rounded-full shadow-lg hover:shadow-xl items-center justify-center transition-all duration-300 group border border-gray-200 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-[#FF6B35] rounded-full shadow-lg hover:shadow-xl items-center justify-center transition-all duration-300 group border border-gray-200 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#FF6B35]'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
