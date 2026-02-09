"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useWishlistStore } from '@/store/wishlistStore';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  brand?: string;
  stock?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productName,
  price,
  originalPrice,
  image,
  slug,
  brand,
  stock = 10,
  className,
  size = 'md',
  showLabel = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  // Check wishlist state only on client side after mount
  useEffect(() => {
    setIsMounted(true);
    setIsInWishlistState(isInWishlist(productId));
  }, [productId, isInWishlist]);
  
  // Update wishlist state when store changes
  useEffect(() => {
    if (!isMounted) return;
    setIsInWishlistState(isInWishlist(productId));
  }, [productId, isInWishlist, isMounted]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isMounted) return;
    
    setIsAnimating(true);
    
    if (isInWishlistState) {
      removeFromWishlist(productId);
      setIsInWishlistState(false);
    } else {
      addToWishlist({
        id: productId,
        name: productName,
        price,
        originalPrice,
        image,
        slug,
        brand,
        stock,
        category: 'Shoes'
      });
      setIsInWishlistState(true);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative",
        sizes[size],
        "flex items-center justify-center rounded-full",
        "transition-all duration-300",
        isInWishlistState
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white text-gray-600 hover:text-red-500 hover:bg-gray-50",
        "shadow-sm border border-gray-200 hover:border-red-200",
        isAnimating && "scale-110",
        className
      )}
      aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-all duration-300",
          isInWishlistState
            ? "fill-red-500"
            : "fill-transparent group-hover:fill-red-500/20"
        )}
      />
      
      {/* Animation effect */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30" />
      )}
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isInWishlistState ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
};