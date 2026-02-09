// 📄 /app/(shop)/products/compare/page.tsx - FIXED
"use client";

import { Scale, Check, X, BarChart, Star } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data/products/mock-data';
import { Product } from '@/lib/data/types';

export default function ComparePage() {
  const comparedProducts: Product[] = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-[14px] font-semibold tracking-wider">
                PRODUCT COMPARISON
              </span>
            </div>
            
            <h1 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold mb-4 leading-tight">
              Compare Products
            </h1>
            
            <p className="text-[14px] md:text-[16px] opacity-90">
              Side-by-side comparison to help you make the best choice
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8 md:py-12">
        {comparedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              No products to compare
            </h3>
            <p className="text-muted-foreground mb-6">
              Add products to compare from product pages
            </p>
            <a 
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Browse Products
              <BarChart className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Features</th>
                  {comparedProducts.map(product => (
                    <th key={product.id} className="text-center p-4">
                      <div className="inline-block text-center">
                        <img 
                          src={product.images[0] || product.image} 
                          alt={product.name} 
                          className="w-32 h-32 object-cover mb-2 rounded-lg" 
                        />
                        <h3 className="font-bold text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{product.brand || 'Unknown Brand'}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Price', getValue: (p: Product) => `$${p.price}` },
                  { label: 'Original Price', getValue: (p: Product) => p.originalPrice ? `$${p.originalPrice}` : '-' },
                  { label: 'Discount', getValue: (p: Product) => p.discountPercent ? `${p.discountPercent}% OFF` : '-' },
                  { label: 'Rating', getValue: (p: Product) => (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{p.rating}/5</span>
                    </div>
                  )},
                  { label: 'Reviews', getValue: (p: Product) => p.reviews.toLocaleString() },
                  { label: 'In Stock', getValue: (p: Product) => p.stockStatus === 'in_stock' ? 
                    <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-500 mx-auto" /> 
                  },
                  { label: 'Stock Qty', getValue: (p: Product) => p.stockQuantity || p.stock || 0 },
                  { label: 'Category', getValue: (p: Product) => p.category },
                ].map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 font-semibold text-muted-foreground">{row.label}</td>
                    {comparedProducts.map(product => (
                      <td key={`${product.id}-${rowIndex}`} className="p-4 text-center">
                        {row.getValue(product)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}