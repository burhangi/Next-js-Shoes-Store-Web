// 📄 /components/products/ProductGrid.tsx - UPDATED VERSION
"use client";

import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardProps } from './ProductCard';

// Define Product type if not already imported
interface Product {
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
  isOnSale?: boolean;
  brand?: string;
  discountPercent?: number;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock';
  stockQuantity?: number;
  description?: string;
  shortDescription?: string;
}

interface ProductGridProps {
  // Original props
  products?: Product[];
  viewMode?: 'grid' | 'list';
  
  // New props for flexibility
  children?: React.ReactNode;
  
  // Additional configuration
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
  
  // For list view rendering
  renderProductItem?: (product: Product) => React.ReactNode;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode = 'grid',
  children,
  columns = { base: 1, sm: 2, lg: 3, xl: 4 },
  gap = 6,
  className = '',
  renderProductItem
}) => {
  // Helper function to get grid columns class
  const getGridColumnsClass = () => {
    return [
      'grid',
      `grid-cols-${columns.base || 1}`,
      columns.sm && `sm:grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      columns.xl && `xl:grid-cols-${columns.xl}`,
      `gap-${gap}`
    ].filter(Boolean).join(' ');
  };

  // If children are provided, render them in grid
  if (children) {
    return (
      <div className={`${getGridColumnsClass()} ${className}`}>
        {children}
      </div>
    );
  }

  // If no products, render empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  // List View
  if (viewMode === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {products.map(product => {
          // Use custom render if provided
          if (renderProductItem) {
            return renderProductItem(product);
          }
          
          // Default list view rendering
          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex gap-4">
              {/* Product Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-1">{product.name}</h3>
                    <p className="text-sm text-[#6B7280] mb-2">{product.shortDescription || product.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#1A1A1A]">${product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-[#9CA3AF] line-through">${product.originalPrice}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-[#6B7280]">({product.reviews} reviews)</span>
                  </div>
                  
                  {product.brand && (
                    <span className="text-sm text-[#6B7280]">• {product.brand}</span>
                  )}
                  
                  {product.stockStatus === 'in_stock' ? (
                    <span className="text-sm text-green-600">In Stock</span>
                  ) : (
                    <span className="text-sm text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Grid View (default)
  return (
    <div className={`${getGridColumnsClass()} ${className}`}>
      {products.map(product => (
        <ProductCard 
          key={product.id}
          id={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image}
          rating={product.rating}
          reviews={product.reviews}
          isNew={product.isNew}
          isBestSeller={product.isBestSeller}
          isOnSale={!!product.originalPrice}
          brand={product.brand}
          discountPercent={product.discountPercent}
          stockStatus={product.stockStatus}
          stockQuantity={product.stockQuantity}
          className="h-full"
        />
      ))}
    </div>
  );
};