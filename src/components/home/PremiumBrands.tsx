import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brands } from '@/lib/data/brands';
import { BrandCard } from './BrandCard';

export const PremiumBrands: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands, ...brands];

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        // Scroll by small amount
        container.scrollBy({ left: 1, behavior: 'auto' });
        
        // Reset if reached end of first set (approximate)
        if (container.scrollLeft >= container.scrollWidth / 3) {
           container.scrollLeft = 0;
        }
      }
    }, 20); // Smooth continuous scroll

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-12 bg-[#FAFAFA] overflow-hidden border-t border-b border-neutral-100 w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-1 tracking-tight">
              Premium Brands
            </h2>
            <p className="text-sm text-neutral-500">
              Curated selection of top tier brands
            </p>
          </div>

          <Link href="/brands" className="flex items-center gap-2 text-[#FF6B35] text-xs md:text-sm font-bold hover:text-[#E85A28] group transition-all duration-300">
            View All
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Track */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-hidden gap-4 py-4"
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 w-[140px] md:w-[180px]"
              >
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
          
          {/* Gradient Edges to mask scroll */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};
