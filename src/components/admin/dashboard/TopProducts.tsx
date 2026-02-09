// 📦 src/components/admin/dashboard/TopProducts.tsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data - replace with your actual data
const products = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    image: '/products/nike-airmax-270.jpg',
    sales: 124,
    revenue: '$18,600',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 23',
    brand: 'Adidas',
    image: '/products/adidas-ultraboost23.jpg',
    sales: 89,
    revenue: '$16,910',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Puma RS-X',
    brand: 'Puma',
    image: '/products/puma-rsx.jpg',
    sales: 67,
    revenue: '$7,370',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Converse Chuck 70',
    brand: 'Converse',
    image: '/products/converse-chuck70.jpg',
    sales: 56,
    revenue: '$5,320',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'New Balance 990v6',
    brand: 'New Balance',
    image: '/products/nb-990v6.jpg',
    sales: 42,
    revenue: '$7,770',
    rating: 4.6,
  },
];

export const TopProducts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          <p className="text-sm text-gray-600">Best selling products</p>
        </div>
        <Link
          href="/admin/products"
          className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
        >
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                <span className="text-sm font-bold text-gray-900">{product.revenue}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-700">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{product.sales} sales</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};