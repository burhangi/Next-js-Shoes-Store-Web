"use client";

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { useWishlistStore } from '@/store/wishlistStore';

interface WishlistIconProps {
  className?: string;
  showCount?: boolean;
  variant?: 'icon' | 'button';
}

export const WishlistIcon: React.FC<WishlistIconProps> = ({
  className,
  showCount = true,
  variant = 'icon'
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { getItemCount } = useWishlistStore();
  const itemCount = getItemCount();

  if (variant === 'button') {
    return (
      <Link
        href="/wishlist"
        className={cn(
          "relative inline-flex items-center gap-2 px-4 py-2 rounded-lg",
          "bg-gradient-to-r from-red-50 to-pink-50",
          "border border-red-200",
          "text-red-600 hover:text-red-700",
          "hover:from-red-100 hover:to-pink-100",
          "transition-all duration-300",
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Heart className="w-4 h-4 fill-red-600" />
        <span className="font-medium">Wishlist</span>
        {showCount && itemCount > 0 && (
          <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px]">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href="/wishlist"
        className={cn(
          "relative p-2 hover:text-red-600 transition-colors",
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Heart className="w-5 h-5" />
        {showCount && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>

      {/* Tooltip */}
      {isHovering && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 mb-1">
              {itemCount === 0 ? 'Wishlist is empty' : `${itemCount} items saved`}
            </div>
            <p className="text-xs text-gray-600 mb-3">
              {itemCount === 0 
                ? 'Save items you love for later'
                : 'View your saved items'
              }
            </p>
            <Link
              href="/wishlist"
              className="block w-full py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};