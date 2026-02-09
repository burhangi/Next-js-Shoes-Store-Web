// 📦src/app/(shop)/brands/[slug]/not-found.tsx
"use client";

import Link from 'next/link';
import { Home, Search, Tag } from 'lucide-react';

export default function BrandNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <Tag className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Brand Not Found</h1>
        
        <p className="text-gray-600 mb-8">
          The brand you're looking for doesn't exist or has been moved.
          Check the spelling or browse our available brands below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/brands"
            className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-[#E85A28] transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Browse Brands
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Popular Brands</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['nike', 'adidas', 'puma', 'new-balance', 'reebok', 'converse'].map((brand) => (
              <Link
                key={brand}
                href={`/brands/${brand}`}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}