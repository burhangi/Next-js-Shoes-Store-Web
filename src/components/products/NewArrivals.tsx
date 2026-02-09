"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data/mockData';

export const FlashDeals = () => {
  const flashDeals = products
    .filter(p => p.originalPrice)
    .slice(0, 4)
    .map(p => ({
      ...p,
      discountPercent: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
    }));

  return (
    <section className="py-[40px] md:py-[80px] bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px]">
        {/* Header - Updated to match Flash Deals */}
        <div className="flex flex-row items-center justify-between mb-[20px] md:mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-[20px] md:text-[36px] font-bold text-gray-900 mb-[4px] md:mb-[8px] leading-tight">
              Flash Deals
            </h2>
            <p className="text-[13px] md:text-[16px] text-gray-600">
              Limited time offers with exclusive discounts
            </p>
          </div>

          {/* View All Link - Matching Flash Deals */}
          <Link 
            href="/products/flash-deals" 
            className="flex items-center gap-1 md:gap-2 text-red-600 text-[13px] md:text-[15px] font-bold hover:text-red-700 group transition-all duration-300 shrink-0"
          >
            <span className="md:hidden">View All</span>
            <span className="hidden md:inline">View All Flash Deals</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid - Updated to match New Arrivals gap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {flashDeals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group"
            >
              {/* Add discount badge manually since ProductCard doesn't support isOnSale */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md">
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
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
};