"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/lib/data/mockData';

export function BestSellers() {
  // DEBUG: Log what products we're getting
  useEffect(() => {
    console.log('=== DEBUG BestSellers ===');
    console.log('Total products:', products.length);
    
    const bestSellers = products
      .filter(p => p.isBestSeller || p.rating >= 4.5)
      .slice(0, 8);
    
    console.log('Best sellers found:', bestSellers.length);
    
    bestSellers.forEach((product, i) => {
      console.log(`Product ${i}: ${product.name}`);
      console.log('  Brand:', product.brand);
      console.log('  Brand type:', typeof product.brand);
      console.log('  Is object?', typeof product.brand === 'object');
      
      if (typeof product.brand === 'object' && product.brand !== null) {
        console.log('  Object keys:', Object.keys(product.brand));
        console.log('  Object content:', product.brand);
      }
    });
  }, []);

  // Get best sellers
  const bestSellers = products
    .filter(p => p.isBestSeller || p.rating >= 4.5)
    .slice(0, 8);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              Top Rated
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most popular products loved by customers worldwide
          </p>
        </div>

        {/* Products Grid - SAFE VERSION */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {bestSellers.map((product, index) => {
            // EXTREME SAFETY: Create a completely clean product object
            const safeProduct = {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images?.[0] || '',
              rating: product.rating,
              reviews: product.reviews,
              isNew: product.isNew,
              isBestSeller: product.isBestSeller,
              // CRITICAL: Handle brand properly
              brand: (() => {
                const brand = product.brand;
                if (!brand) return '';
                if (typeof brand === 'string') return brand;
                if (typeof brand === 'object' && brand !== null) {
                  return (brand as any).name || (brand as any).title || '';
                }
                return '';
              })(),
              description: product.description,
              shortDescription: product.shortDescription,
              colors: product.colors || [],
              images: product.images || [],
              discountPercent: product.discountPercent,
              stock: product.stock
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard {...safeProduct} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}