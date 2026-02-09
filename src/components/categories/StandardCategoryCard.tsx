// components/categories/StandardCategoryCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description?: string;
}

export const StandardCategoryCard: React.FC<CategoryCardProps> = ({
  name,
  slug,
  image,
  itemCount,
  description
}) => {
  return (
    <Link href={`/categories/${slug}`} className="block h-full">
      <div 
        className={cn(
          "group relative h-full bg-white rounded-xl border border-[#E5E7EB] overflow-hidden transition-all duration-300",
          "hover:border-[#FF6B35] hover:shadow-[0_8px_24px_rgba(255,107,53,0.15)] hover:-translate-y-1"
        )}
      >
        {/* Image Container - Fixed Height 240px as requested */}
        <div className="relative h-[240px] w-full overflow-hidden bg-[#F8F9FA]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          <div className="absolute bottom-4 left-4 text-white">
             <h3 className="text-xl font-bold mb-1 shadow-black/10 drop-shadow-md">{name}</h3>
             <p className="text-sm text-white/90 flex items-center gap-1">
               <Package className="w-3.5 h-3.5" />
               {itemCount} Products
             </p>
          </div>
        </div>

        {/* Content Footer */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex-1">
             <p className="text-sm text-[#6B7280] line-clamp-2">
               {description || `Explore our latest ${name} collection.`}
             </p>
          </div>
          
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center hover:bg-[#E85A28] transition-colors shadow-md group-hover:scale-110 duration-300">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};
