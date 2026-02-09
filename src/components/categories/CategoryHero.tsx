// components/categories/CategoryHero.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingBag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryHeroProps {
  title: string;
  image?: string;
  count: number;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ title, image, count }) => {
  return (
    <div className="bg-[#F8F9FA] border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#FF6B35]">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/categories" className="hover:text-[#FF6B35]">Categories</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#2C3E50] font-medium">{title}</span>
            </div>

            {/* Title & Desc */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="bg-orange-100 text-[#FF6B35] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                   {count} Products
                 </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Traditional wooden ghani pressed oils for authentic flavor and premium quality.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button className="bg-[#2C3E50] hover:bg-[#1a252f] text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-navy-900/10 transition-transform hover:-translate-y-1">
                Shop Collection
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35]">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Footer Stats (Rating/Featured) */}
            <div className="flex items-center gap-8 pt-6 border-t border-gray-200 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-bold text-2xl text-[#2C3E50]">
                  4.8 <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-sm text-gray-500">Avg Rating</span>
              </div>
              <div className="flex flex-col">
                 <div className="font-bold text-2xl text-[#2C3E50] flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                     <Star className="w-4 h-4 text-[#FF6B35]" />
                   </div>
                 </div>
                 <span className="text-sm text-gray-500 mt-1">Featured Collection</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35] rounded-[2rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500" />
            <div className="relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80"} 
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-xl border border-white/20">
                <p className="text-[#2C3E50] font-bold text-lg">{title}</p>
                 <div className="flex items-center gap-1 text-[#FF6B35] text-sm font-medium">
                   <Star className="w-4 h-4 fill-current" />
                   Featured Collection
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};