// components/categories/CategoryCarousel.tsx - PROFESSIONAL AUTO-CAROUSEL
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Star, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  badge?: 'new' | 'trending' | 'popular' | 'featured';
  color?: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showBadges?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  showBadges = true,
  className,
  title = "Browse Categories",
  description = "Explore our premium collections"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const badgeConfig = {
    new: { icon: <Zap className="h-3 w-3" />, color: "from-green-500 to-emerald-500" },
    trending: { icon: <TrendingUp className="h-3 w-3" />, color: "from-orange-500 to-amber-500" },
    popular: { icon: <Star className="h-3 w-3" />, color: "from-purple-500 to-pink-500" },
    featured: { icon: <Star className="h-3 w-3" />, color: "from-blue-500 to-cyan-500" }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && autoPlay && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, isHovering, categories.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get visible categories (3 at a time for desktop)
  const getVisibleCategories = () => {
    const visibleCount = 3; // Show 3 categories at a time
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % categories.length;
      result.push(categories[index]);
    }
    
    return result;
  };

  const visibleCategories = getVisibleCategories();

  return (
    <section 
      className={cn("py-16 bg-gradient-to-b from-white to-primary-50", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-600 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <AnimatePresence mode="wait">
              {visibleCategories.map((category, index) => (
                <motion.div
                  key={`${category.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Category Image with Rounded Top */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      <div className="relative w-full h-full">
                        {/* Fallback image if category.image doesn't exist */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-accent-500 to-accent-600'}`}>
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl opacity-30">👟</div>
                          </div>
                        </div>
                        {/* You can uncomment this when you have actual images */}
                        {/* {category.image && (
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )} */}
                      </div>

                      {/* Badge */}
                      {showBadges && category.badge && (
                        <div className="absolute top-4 right-4 z-20">
                          <div className={cn(
                            "px-4 py-2 rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-lg",
                            `bg-gradient-to-r ${badgeConfig[category.badge]?.color}`
                          )}>
                            {badgeConfig[category.badge]?.icon}
                            {category.badge.charAt(0).toUpperCase() + category.badge.slice(1)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category Info (Bottom) */}
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-primary-900 mb-3">
                        {category.name}
                      </h3>
                      <p className="text-primary-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-500">
                          {category.productCount} products
                        </span>
                        <div className="flex items-center gap-2 text-accent-600 group-hover:text-accent-700">
                          <span className="text-sm font-medium">Explore</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          {showControls && (
            <div className="flex items-center justify-center gap-4">
              {/* Play/Pause Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              {/* Previous Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Indicators */}
              {showIndicators && (
                <div className="flex items-center gap-2">
                  {categories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentIndex
                          ? "w-8 bg-accent-600"
                          : "bg-primary-300 hover:bg-primary-400"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent-600 to-accent-700 text-white rounded-full px-8 py-6 hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View All Categories
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};