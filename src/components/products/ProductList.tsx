"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { ProductCardHorizontal } from './ProductCardHorizontal';
import { EmptyState } from '@/components/common/EmptyState';
import { Product } from '@/lib/data/products/types';

interface ProductListProps {
  products: Product[];
  className?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  className,
}) => {
  if (products.length === 0) {
    return (
      <div className={cn("py-12", className)}>
        <EmptyState
          icon="📄"
          title="No products to display"
          description="Try changing your filters or search term"
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProductCardHorizontal product={product} />
        </motion.div>
      ))}
    </div>
  );
};