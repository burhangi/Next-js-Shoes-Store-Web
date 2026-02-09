// 📄 /components/brands/CategoryProducts.tsx - COMPATIBLE VERSION
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductsByBrandAndCategory, ProductCardData } from '@/lib/data/brands';

interface CategoryProductsProps {
  brandName: string;
  categories: string[];
  productsPerCategory?: number;
  showHeader?: boolean;
  className?: string;
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({
  brandName,
  categories,
  productsPerCategory = 4,
  showHeader = true,
  className = '',
}) => {
  // Get products for each category
  const categoryProducts = categories.map(category => {
    const products = getProductsByBrandAndCategory(brandName, category, productsPerCategory);
    return { category, products };
  }).filter(item => item.products.length > 0);

  if (categoryProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found for this brand.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-600">Browse {brandName} products by category</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {categoryProducts.map(({ category, products }, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                <p className="text-gray-600 text-sm">Top {products.length} {category.toLowerCase()} products</p>
              </div>
              <Link
                href={`/products?brand=${brandName.toLowerCase()}&category=${category.toLowerCase()}`}
                className="text-[#FF6B35] hover:text-[#E85A28] text-sm font-medium flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product: ProductCardData) => (
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
                  isOnSale={product.isOnSale}
                  brand={product.brand}
                  discountPercent={product.discountPercent}
                  stockStatus={product.stockStatus}
                  showRating={true}
                  showDiscountBadge={true}
                  showBestSellerBadge={true}
                  className="h-full"
                  onAddToCart={() => console.log('Added to cart:', product.name)}
                  onQuickView={() => console.log('Quick view:', product.name)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};