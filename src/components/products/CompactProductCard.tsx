// components/products/CompactProductCard.tsx - UPDATED
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

interface CompactProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  brand?: string;
}

export const CompactProductCard: React.FC<CompactProductCardProps> = ({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNew,
  isBestSeller,
  inStock = true,
  brand
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <Link href={`/products/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isNew && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                BEST
              </span>
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={cn(
              "absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              isLiked 
                ? "bg-rose-500 text-white" 
                : "bg-white/80 backdrop-blur text-neutral-600 hover:bg-white hover:text-rose-500"
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </button>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="px-3 py-1 bg-neutral-900 text-white rounded-full text-xs font-bold">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            {brand && (
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                {brand}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-neutral-700">{rating.toFixed(1)}</span>
              <span className="text-[10px] text-neutral-400">({reviews})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-primary-700">
                ${price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};