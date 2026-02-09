"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Heart, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useWishlistStore } from '@/store/wishlistStore';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  brand?: string;
  slug: string;
  stock: number;
  sku?: string;
  category?: string;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
  onQuickView?: (item: CartItemType) => void;
  onShare?: (item: CartItemType) => void;
  showActions?: boolean;
  showWishlist?: boolean;
  showShare?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'mini';
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
  onQuickView,
  onShare,
  showActions = true,
  showWishlist = true,
  showShare = false,
  className,
  variant = 'default'
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addToWishlist, isInWishlist } = useWishlistStore();

  const handleQuantityChange = async (newQuantity: number) => {
    const maxStock = typeof item.stock === 'number' ? item.stock : 10;
    if (newQuantity < 1 || newQuantity > maxStock || isUpdating) return;
    
    setIsUpdating(true);
    try {
      if (onUpdateQuantity && item.id) {
        onUpdateQuantity(item.id, newQuantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      if (onRemove && item.id) {
        onRemove(item.id);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleMoveToWishlist = () => {
    if (onMoveToWishlist) {
      onMoveToWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        slug: item.slug,
        brand: item.brand,
        stock: item.stock,
        category: item.category
      });
      onRemove(item.id);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(item);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(item);
    } else if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out ${item.name} on our store!`,
        url: `${window.location.origin}/products/${item.slug}`,
      });
    }
  };

  // Safe calculations with defaults
  const itemPrice = typeof item.price === 'number' ? item.price : 0;
  const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
  const itemTotal = itemPrice * itemQuantity;
  const hasDiscount = item.originalPrice && typeof item.originalPrice === 'number' && item.originalPrice > itemPrice;
  const discountAmount = hasDiscount ? item.originalPrice! - itemPrice : 0;
  const discountPercent = hasDiscount && item.originalPrice 
    ? Math.round((discountAmount / item.originalPrice) * 100)
    : 0;

  const isInWishlistState = isInWishlist(item.id);

  if (variant === 'mini') {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg",
        className
      )}>
        {/* Product Image */}
        <div className="w-16 h-16 flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-xl">👟</div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link 
            href={`/products/${item.slug || item.id}`}
            className="group block"
          >
            <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary truncate">
              {item.name || 'Product'}
            </h4>
          </Link>
          
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm font-semibold text-gray-900">
              ${itemTotal.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {itemQuantity} × ${itemPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex gap-4 p-4 bg-white border border-gray-200 rounded-lg",
        className
      )}>
        {/* Product Image */}
        <Link href={`/products/${item.slug || item.id}`} className="block flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-2xl">👟</div>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <Link 
                href={`/products/${item.slug || item.id}`}
                className="group block"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-primary line-clamp-1">
                  {item.name || 'Product'}
                </h3>
              </Link>
              
              {/* Variants */}
              {(item.size || item.color) && (
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.color && <span>Color: {item.color}</span>}
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-gray-900">
                  ${itemPrice.toFixed(2)}
                </span>
                {hasDiscount && item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ${itemTotal.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(itemQuantity - 1)}
                  disabled={itemQuantity <= 1 || isUpdating}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <span className="w-8 text-center font-medium">{itemQuantity}</span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(itemQuantity + 1)}
                  disabled={itemQuantity >= (typeof item.stock === 'number' ? item.stock : 10) || isUpdating}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {showWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMoveToWishlist}
                    className="text-gray-600 hover:text-primary"
                  >
                    <Heart className={cn(
                      "w-4 h-4",
                      isInWishlistState && "fill-red-500 text-red-500"
                    )} />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30",
      isRemoving && "opacity-50",
      className
    )}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <Link href={`/products/${item.slug || item.id}`} className="block flex-shrink-0 group">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden group-hover:shadow-lg transition-all duration-300">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent && !parent.querySelector('.fallback-icon')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-4xl';
                    fallback.textContent = '👟';
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-4xl">👟</div>
              </div>
            )}
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                -{discountPercent}%
              </div>
            )}
            {item.quantity > 1 && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                {item.quantity}
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1">
              <Link 
                href={`/products/${item.slug || item.id}`}
                className="group block"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {item.name || 'Product'}
                </h3>
              </Link>
              
              {item.brand && (
                <p className="text-sm text-gray-600 mt-1">Brand: {item.brand}</p>
              )}
              
              {/* Variants */}
              {(item.size || item.color) && (
                <div className="flex items-center gap-3 mt-2">
                  {item.size && (
                    <div className="inline-flex items-center gap-1">
                      <span className="text-sm text-gray-600">Size:</span>
                      <span className="text-sm font-medium text-gray-900">{item.size}</span>
                    </div>
                  )}
                  {item.color && (
                    <div className="inline-flex items-center gap-1">
                      <span className="text-sm text-gray-600">Color:</span>
                      <span className="text-sm font-medium text-gray-900">{item.color}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* SKU */}
              {item.sku && (
                <p className="text-xs text-gray-500 mt-2">SKU: {item.sku}</p>
              )}
              
              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xl font-bold text-gray-900">
                  ${itemPrice.toFixed(2)}
                </span>
                {hasDiscount && item.originalPrice && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      Save ${discountAmount.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${itemTotal.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {itemQuantity} × ${itemPrice.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <div className="w-16 text-center">
                  <span className="font-medium">{item.quantity}</span>
                  <div className="text-xs text-gray-500">
                    of {item.stock} available
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.stock || isUpdating}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {onQuickView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleQuickView}
                    className="text-gray-600 hover:text-primary"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    <span className="text-xs">View</span>
                  </Button>
                )}
                
                {showShare && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                )}
                
                {showWishlist && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMoveToWishlist}
                    className={cn(
                      "text-gray-600 hover:text-primary",
                      isInWishlistState && "text-red-600 hover:text-red-700"
                    )}
                  >
                    <Heart className={cn(
                      "w-4 h-4 mr-1",
                      isInWishlistState && "fill-red-500"
                    )} />
                    <span className="text-xs">Save</span>
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  <span className="text-xs">Remove</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};