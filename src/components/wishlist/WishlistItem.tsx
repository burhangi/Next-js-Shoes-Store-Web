"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Eye, Share2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

interface WishlistItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
    brand?: string;
    rating?: number;
    stock: number;
    addedAt: Date;
  };
  showActions?: boolean;
  className?: string;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  item,
  showActions = true,
  className
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMovingToCart, setIsMovingToCart] = useState(false);
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromWishlist(item.id);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleMoveToCart = async () => {
    setIsMovingToCart(true);
    try {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        slug: item.slug,
        brand: item.brand,
        stock: item.stock
      });
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromWishlist(item.id);
    } finally {
      setIsMovingToCart(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out ${item.name} on Luxury Store!`,
        url: `${window.location.origin}/products/${item.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.slug}`);
      alert('Product link copied to clipboard!');
    }
  };

  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const discountAmount = hasDiscount ? item.originalPrice! - item.price : 0;
  const discountPercent = hasDiscount 
    ? Math.round((discountAmount / item.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative bg-white rounded-xl border border-gray-200 overflow-hidden",
        "transition-all duration-300 hover:shadow-lg hover:border-primary/30",
        isRemoving && "opacity-50",
        className
      )}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercent}% OFF
          </div>
        </div>
      )}

      {/* Stock Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={cn(
          "text-xs font-bold px-2 py-1 rounded",
          item.stock > 5 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        )}>
          {item.stock > 5 ? 'In Stock' : 'Low Stock'}
        </div>
      </div>

      {/* Product Image */}
      <Link href={`/products/${item.slug}`} className="block">
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl">👟</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="w-4 h-4 inline mr-1" />
            Quick View
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.slug}`} className="group block">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {item.name}
              </h3>
            </Link>
            {item.brand && (
              <p className="text-sm text-gray-600 mt-1">{item.brand}</p>
            )}
          </div>
          
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove from wishlist"
          >
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${item.originalPrice!.toFixed(2)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs font-bold text-red-600">
              Save ${discountAmount.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(item.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({item.rating})</span>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={handleMoveToCart}
              disabled={isMovingToCart}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-4",
                "bg-primary text-white font-medium rounded-lg",
                "hover:bg-primary-dark transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isMovingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Moving...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Added Date */}
        <div className="mt-3 text-xs text-gray-500">
          Added {new Date(item.addedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>
    </motion.div>
  );
};