"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products/types';
import { WishlistButton } from './WishlistButton';
import { ShareButton } from './ShareButton';
import { Button } from '@/components/ui/button';

interface ProductCardHorizontalProps {
  product: Product;
  showWishlist?: boolean;
  showCompare?: boolean;
  showQuickView?: boolean;
  showRating?: boolean;
  showDescription?: boolean;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

// Stock status constants (add to your constants file or define here)
const STOCK_STATUS = {
  in_stock: {
    label: 'In Stock',
    bgColor: 'bg-green-100',
    color: 'text-green-800',
    borderColor: 'border-green-200'
  },
  out_of_stock: {
    label: 'Out of Stock',
    bgColor: 'bg-red-100',
    color: 'text-red-800',
    borderColor: 'border-red-200'
  },
  low_stock: {
    label: 'Low Stock',
    bgColor: 'bg-yellow-100',
    color: 'text-yellow-800',
    borderColor: 'border-yellow-200'
  }
};

export const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  product,
  showWishlist = true,
  showCompare = true,
  showQuickView = true,
  showRating = true,
  showDescription = true,
  className,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Use discountPercent instead of salePrice
  const discountPercentage = product.discountPercent || 0;
  
  // Use first image as thumbnail if thumbnail doesn't exist
  const thumbnail = product.thumbnail || product.images?.[0] || product.image || '/api/placeholder/400/400';
  
  // Use originalPrice for price comparison
  const salePrice = product.originalPrice ? product.price : undefined;
  const regularPrice = product.originalPrice || product.price;
  
  const stockStatusInfo = STOCK_STATUS[product.stockStatus] || STOCK_STATUS.in_stock;

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    onAddToCart?.(product);
    
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group", className)}
    >
      <div className="flex gap-4 p-4 bg-white rounded-xl border border-primary-100 hover:border-accent-300 transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative flex-shrink-0">
          <Link href={`/products/${product.slug}`} className="block">
            <div className="relative w-32 h-32 bg-primary-50 rounded-lg overflow-hidden">
              <Image
                src={thumbnail}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  isHovered ? "scale-110" : "scale-100"
                )}
                sizes="128px"
              />
            </div>
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
              -{discountPercentage}%
            </div>
          )}

          {/* Stock Status */}
          <div className={cn(
            "absolute bottom-2 left-2 px-1.5 py-0.5 text-xs font-medium rounded border",
            stockStatusInfo.bgColor,
            stockStatusInfo.color,
            stockStatusInfo.borderColor
          )}>
            {stockStatusInfo.label}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              {/* Category */}
              {product.category && (
                <Link
                  href={`/categories/${product.categorySlug}`}
                  className="text-xs text-primary-500 hover:text-accent-600 transition-colors"
                >
                  {product.category}
                </Link>
              )}

              {/* Product Name */}
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-primary-900 hover:text-accent-600 transition-colors line-clamp-1 mb-1">
                  {product.name}
                </h3>
              </Link>

              {/* Brand */}
              {product.brand && (
                <p className="text-sm text-primary-600 mb-1">
                  by {product.brand}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-1 ml-2">
              {showWishlist && (
                <WishlistButton
                  productId={product.id}
                  initialLiked={false}
                  variant="ghost"
                  size="icon-sm"
                  className="bg-white shadow-sm hover:bg-primary-50"
                />
              )}
              {showQuickView && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="bg-white shadow-sm hover:bg-primary-50"
                  onClick={handleQuickView}
                  aria-label="Quick view"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              )}
              {showCompare && (
                <ShareButton
                  product={product}
                  variant="ghost"
                  size="icon-sm"
                  className="bg-white shadow-sm hover:bg-primary-50"
                />
              )}
            </div>
          </div>

          {/* Description */}
          {showDescription && product.shortDescription && (
            <p className="text-sm text-primary-600 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          {showRating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-primary-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-primary-500">
                ({product.reviews || product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center gap-2">
              {salePrice ? (
                <>
                  <span className="text-lg font-bold text-accent-600">
                    ${regularPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-primary-500 line-through">
                    ${product.originalPrice!.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary-900">
                  ${regularPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              size="sm"
              variant={isAddedToCart ? "success" : "accent"}
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              className="min-w-[120px]"
            >
              {isAddedToCart ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added
                </>
              ) : product.stockStatus === 'out_of_stock' ? (
                'Out of Stock'
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};