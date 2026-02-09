// 📄 /components/brands/BrandCard.tsx - PROFESSIONAL VERSION
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Star, 
  Truck, 
  Shield, 
  Award, 
  ChevronRight,
  Check,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Brand } from '@/lib/data/brands';
import { Button } from '@/components/ui/button';

interface BrandCardProps {
  brand: Brand;
  variant?: 'default' | 'compact' | 'featured' | 'highlighted';
  className?: string;
  showStats?: boolean;
  showCategories?: boolean;
  showFeatures?: boolean;
  showActionButton?: boolean;
  onBrandClick?: () => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  variant = 'default',
  className = '',
  showStats = true,
  showCategories = true,
  showFeatures = true,
  showActionButton = true,
  onBrandClick,
}) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const isHighlighted = variant === 'highlighted';

  const handleClick = (e: React.MouseEvent) => {
    if (onBrandClick) {
      e.preventDefault();
      onBrandClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3 } 
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300",
        isFeatured
          ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg"
          : isHighlighted
          ? "bg-gradient-to-br from-white to-gray-50 border-gray-300 shadow-lg"
          : "bg-white border-gray-200 hover:border-[#FF6B35] hover:shadow-xl",
        "hover:shadow-2xl",
        className
      )}
    >
      <Link 
        href={`/brands/${brand.slug}`} 
        className="block h-full"
        onClick={handleClick}
      >
        {/* Featured Badge */}
        {brand.featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              <Award className="h-3 w-3" />
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Custom Badge */}
        {brand.badge && (
          <div className={`absolute top-4 right-4 z-10 ${brand.badge.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
            {brand.badge.text}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Brand Header */}
          <div className={`flex items-center ${isCompact ? 'gap-3' : 'gap-4 mb-5'}`}>
            {/* Brand Logo/Icon */}
            <div className={cn(
              "flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden",
              isFeatured ? "bg-white/10" : "bg-gray-100",
              isCompact ? "w-14 h-14" : "w-20 h-20"
            )}>
              <div className={cn(
                isCompact ? "text-2xl" : "text-3xl",
                "font-bold"
              )}>
                {brand.icon}
              </div>
            </div>
            
            {/* Brand Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-bold leading-tight truncate",
                    isFeatured ? "text-white" : "text-gray-900",
                    isCompact ? "text-base" : "text-xl"
                  )}>
                    {brand.name}
                  </h3>
                  <p className={cn(
                    "truncate italic",
                    isFeatured ? "text-gray-300" : "text-gray-600",
                    isCompact ? "text-sm mt-0.5" : "text-base mt-1"
                  )}>
                    {brand.slogan}
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className={cn(
                    "text-sm font-bold",
                    isFeatured ? "text-white" : "text-gray-900"
                  )}>
                    {brand.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {!isCompact && (
            <p className={cn(
              "mb-4 line-clamp-2",
              isFeatured ? "text-gray-300" : "text-gray-600",
              "text-sm leading-relaxed"
            )}>
              {brand.description}
            </p>
          )}

          {/* Stats */}
          {showStats && !isCompact && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className={cn(
                "text-center p-2 rounded-lg border",
                isFeatured 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-gray-50 border-gray-200 text-gray-900"
              )}>
                <div className="text-lg font-bold">{brand.productCount}</div>
                <div className="text-xs opacity-75">Products</div>
              </div>
              <div className={cn(
                "text-center p-2 rounded-lg border",
                isFeatured 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-gray-50 border-gray-200 text-gray-900"
              )}>
                <div className="text-lg font-bold">{brand.founded || 'N/A'}</div>
                <div className="text-xs opacity-75">Founded</div>
              </div>
              <div className={cn(
                "text-center p-2 rounded-lg border",
                isFeatured 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-gray-50 border-gray-200 text-gray-900",
                brand.shippingInfo?.freeShipping ? "border-green-200 bg-green-50" : ""
              )}>
                {brand.shippingInfo?.freeShipping ? (
                  <>
                    <div className="text-lg font-bold text-green-600">Free</div>
                    <div className="text-xs opacity-75">Shipping</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-bold">${brand.shippingInfo?.minAmount || 0}</div>
                    <div className="text-xs opacity-75">Min Order</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Categories */}
          {showCategories && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {brand.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full border transition-all",
                      isFeatured
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </span>
                ))}
                {brand.categories.length > 3 && (
                  <span className={cn(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    isFeatured
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-500"
                  )}>
                    +{brand.categories.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Features */}
          {showFeatures && brand.shippingInfo && !isCompact && (
            <div className="space-y-2 mb-4">
              {brand.shippingInfo.freeShipping && (
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className={cn(
                    isFeatured ? "text-gray-300" : "text-gray-600"
                  )}>
                    Free shipping on orders over ${brand.shippingInfo.minAmount}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className={cn(
                  isFeatured ? "text-gray-300" : "text-gray-600"
                )}>
                  {brand.shippingInfo.warranty} warranty
                </span>
              </div>
            </div>
          )}

          {/* Action Button */}
          {showActionButton && !isCompact && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-sm font-medium",
                  isFeatured ? "text-white" : "text-[#FF6B35]"
                )}>
                  Browse {brand.productCount} products
                </span>
              </div>
              <Button
                size="sm"
                className={cn(
                  "rounded-full",
                  isFeatured
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-[#FF6B35] text-white hover:bg-[#E85A28]"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        {!isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </Link>
    </motion.div>
  );
};