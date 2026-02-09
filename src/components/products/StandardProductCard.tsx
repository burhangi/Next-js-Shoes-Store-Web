// components/products/StandardProductCard.tsx
"use client";

import React, { useState } from 'react';
import { Heart, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

export const StandardProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNew,
  isSale
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <div 
        className={cn(
          "group relative h-full bg-white rounded-xl border border-[#E5E7EB] overflow-hidden transition-all duration-300",
          "hover:border-[#FF6B35] hover:shadow-[0_8px_24px_rgba(255,107,53,0.15)] hover:-translate-y-1"
        )}
      >
        {/* Image Container - 300px square-ish ratio or aspect-square */}
        <div className="relative aspect-square bg-[#F8F9FA] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="px-2 py-1 bg-[#EF4444] text-white text-xs font-bold rounded shadow-sm">
                NEW
              </span>
            )}
            {isSale && (
              <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded shadow-sm">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm group/heart"
          >
            <Heart 
              className={cn(
                "w-5 h-5 transition-colors", 
                isLiked ? "fill-[#EF4444] text-[#EF4444]" : "text-[#6B7280] group-hover/heart:text-[#EF4444]"
              )} 
            />
          </button>

          {/* Quick View Button - Shows on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
             <button 
               className="w-full py-2.5 bg-[#2C3E50] text-white font-medium text-sm rounded-lg hover:bg-[#1A252F] transition-colors flex items-center justify-center gap-2 shadow-lg"
               onClick={(e) => {
                 e.preventDefault();
                 // Trigger Quick View
               }}
             >
               <Eye className="w-4 h-4" />
               Quick View
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-[#1A1A1A] font-bold text-base leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-[#FF6B35] transition-colors">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-3">
             <div className="flex items-center gap-0.5">
               {Array.from({ length: 5 }).map((_, i) => (
                 <Star 
                   key={i} 
                   className={cn(
                     "w-3.5 h-3.5", 
                     i < Math.floor(rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#E5E7EB]"
                   )} 
                 />
               ))}
             </div>
             <span className="text-xs text-[#6B7280] font-medium">({reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#FF6B35]">${price}</span>
            {originalPrice && (
              <span className="text-sm text-[#9CA3AF] line-through decoration-1">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
