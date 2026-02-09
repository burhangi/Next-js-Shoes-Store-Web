"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data/mockData';
import { AutoCarousel } from './AutoCarousel';

export const FlashDeals = () => {
  const flashDeals = products
    .filter(p => p.originalPrice)
    .slice(0, 8)
    .map(p => ({
      ...p,
      discountPercent: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
    }));

  return (
    <section className="py-[40px] md:py-[80px] bg-gradient-to-b from-orange-50 to-white w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-gray-900 mb-[4px] md:mb-[8px] leading-tight">
              Flash Deals
            </h2>
            <p className="text-[13px] md:text-[16px] text-gray-600">
              Limited time offers with exclusive discounts
            </p>
          </div>

          <Link 
            href="/products/flash-deals" 
            className="flex items-center gap-1 md:gap-2 text-red-600 text-[13px] md:text-[15px] font-bold hover:text-red-700 group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Flash Deals</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Auto Carousel */}
        <AutoCarousel
          autoPlayInterval={3500}
          cardWidthClass="w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]"
        >
          {flashDeals.map((product) => (
            <div key={product.id} className="relative group">
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-md">
                  -{product.discountPercent}%
                </div>
              </div>

              <ProductCard 
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                rating={product.rating}
                reviews={product.reviews}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                brand={product.brand}
              />
            </div>
          ))}
        </AutoCarousel>
      </div>
    </section>
  );
};