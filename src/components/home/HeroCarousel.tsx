"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  theme: 'light' | 'dark';
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Street Style Essential",
    subtitle: "Urban Edge Collection",
    description: "Bold sneakers that make a statement on city streets",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1920&q=80",
    cta: "Shop Sneakers",
    theme: "dark"
  },
  {
    id: 2,
    title: "Athletic Performance",
    subtitle: "Run Further, Jump Higher",
    description: "Premium running shoes engineered for peak performance",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80",
    cta: "Explore Athletics",
    theme: "dark"
  },
  {
    id: 3,
    title: "Summer Collection 2024",
    subtitle: "Step Into Style",
    description: "Discover lightweight, breathable designs perfect for the season",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80",
    cta: "Shop Summer Styles",
    theme: "light"
  },
  {
    id: 4,
    title: "Classic Elegance",
    subtitle: "Timeless Sophistication",
    description: "Handcrafted leather shoes for the discerning gentleman",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1920&q=80",
    cta: "View Collection",
    theme: "light"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Mouse wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 30) nextSlide();
      else if (e.deltaX < -30) prevSlide();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      ref={carouselRef}
      className="relative w-full h-[450px] md:h-[500px] overflow-hidden bg-gray-900 max-w-full"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className={`absolute inset-0 ${
              slide.theme === 'dark' 
                ? "bg-gradient-to-r from-black/75 via-black/50 to-transparent" 
                : "bg-gradient-to-r from-white/85 via-white/60 to-transparent"
            }`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
              <div className="max-w-xl lg:max-w-2xl">
                <div className={`transition-all duration-700 delay-200 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {/* Subtitle Badge */}
                  <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4 md:mb-6 ${
                    slide.theme === 'dark'
                      ? slide.id === 1 
                        ? "bg-orange-500/20 text-orange-400 border border-orange-400/40"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                      : "bg-amber-500/20 text-amber-600 border border-amber-500/40"
                  } backdrop-blur-sm`}>
                    {slide.subtitle}
                  </div>

                  {/* Title */}
                  <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 ${
                    slide.theme === 'dark' ? "text-white" : "text-gray-900"
                  } ${slide.theme === 'dark' ? 'drop-shadow-lg' : ''}`}>
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-light mb-5 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md lg:max-w-xl ${
                    slide.theme === 'dark' ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`group inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                      slide.id === 1
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50"
                        : slide.id === 2
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50"
                        : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50"
                    }`}
                  >
                    {slide.cta}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-12 sm:w-10 sm:h-16 md:w-12 md:h-20 bg-white/10 hover:bg-orange-500/90 backdrop-blur-md transition-all duration-300 flex items-center justify-start pl-1.5 sm:pl-2 md:pl-3 group z-20 rounded-r-lg sm:rounded-r-xl border border-white/20 shadow-lg hover:shadow-orange-500/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform group-hover:scale-110" />
      </button>

      <button
        onClick={nextSlide}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-12 sm:w-10 sm:h-16 md:w-12 md:h-20 bg-white/10 hover:bg-orange-500/90 backdrop-blur-md transition-all duration-300 flex items-center justify-end pr-1.5 sm:pr-2 md:pr-3 group z-20 rounded-l-lg sm:rounded-l-xl border border-white/20 shadow-lg hover:shadow-orange-500/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform group-hover:scale-110" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseDown={(e) => e.stopPropagation()}
            className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 sm:w-10 md:w-12 bg-orange-500 shadow-lg shadow-orange-500/50"
                : "w-4 sm:w-6 md:w-8 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile Drag Indicator */}
      <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-1">
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}