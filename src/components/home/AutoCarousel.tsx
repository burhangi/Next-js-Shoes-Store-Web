"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AutoCarouselProps {
  children: React.ReactNode[];
  autoPlayInterval?: number;
  /** Card width classes for each breakpoint - use Tailwind classes */
  cardWidthClass?: string;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  children,
  autoPlayInterval = 4000,
  cardWidthClass = 'w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]',
  showArrows = true,
  showDots = true,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;

  // Duplicate for infinite scroll
  const allItems = [...children, ...children, ...children];

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector('.ac-card') as HTMLElement;
    if (!card) return;

    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 12 : 24;
    const itemWidth = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'right' ? itemWidth : -itemWidth,
      behavior: 'smooth',
    });

    setCurrentIndex((prev) => {
      if (direction === 'right') return (prev + 1) % totalItems;
      return (prev - 1 + totalItems) % totalItems;
    });
  }, [totalItems]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => scrollTo('right'), autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, autoPlayInterval, scrollTo]);

  // Infinite loop: reset scroll position silently
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      if (container.scrollLeft >= maxScroll * 0.85) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = maxScroll * 0.33;
        container.style.scrollBehavior = 'smooth';
      }
      if (container.scrollLeft <= maxScroll * 0.05) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = maxScroll * 0.33;
        container.style.scrollBehavior = 'smooth';
      }
    };

    container.addEventListener('scrollend', onScrollEnd);
    return () => container.removeEventListener('scrollend', onScrollEnd);
  }, []);

  // Initialize scroll position to middle set
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const timer = setTimeout(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = maxScroll * 0.33;
      container.style.scrollBehavior = 'smooth';
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const dotCount = Math.min(totalItems, 5);

  return (
    <div className={`relative group/carousel ${className}`}>
      {/* Left Arrow */}
      {showArrows && (
        <button
          onClick={() => { scrollTo('left'); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
          className="hidden md:flex absolute -left-4 xl:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-700 shadow-lg hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white hover:scale-110 hover:shadow-xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden py-2 gap-3 md:gap-6 scroll-smooth hide-scrollbar snap-x snap-mandatory"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
      >
        {allItems.map((child, index) => (
          <div
            key={index}
            className={`ac-card flex-shrink-0 select-none snap-start ${cardWidthClass}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showArrows && (
        <button
          onClick={() => { scrollTo('right'); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
          className="hidden md:flex absolute -right-4 xl:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-700 shadow-lg hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white hover:scale-110 hover:shadow-xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {Array.from({ length: dotCount }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex % dotCount
                  ? 'w-6 h-2 bg-[#FF6B35]'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
