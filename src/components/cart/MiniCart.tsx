"use client";

import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils/cn';
import { CartItem, CartItemType } from './CartItem';

interface MiniCartProps {
  className?: string;
  showIcon?: boolean;
  showCount?: boolean;
  showTotal?: boolean;
  showPreview?: boolean;
  variant?: 'default' | 'button' | 'simple' | 'icon';
  maxItems?: number;
  onItemClick?: (item: CartItemType) => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({
  className,
  showIcon = true,
  showCount = true,
  showTotal = true,
  showPreview = true,
  variant = 'default',
  maxItems = 3,
  onItemClick
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { items, subtotal, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const previewItems = items.slice(0, maxItems);

  if (variant === 'simple') {
    return (
      <Link
        href="/cart"
        className="relative p-2 hover:text-primary transition-colors"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {showIcon && (
          <ShoppingBag className="w-5 h-5" />
        )}
        {showCount && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>
    );
  }

  if (variant === 'icon') {
    return (
      <Link
        href="/cart"
        className="relative p-2 hover:text-primary transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {showCount && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>
    );
  }

  if (variant === 'button') {
    return (
      <Link
        href="/cart"
        className={cn(
          "relative inline-flex items-center gap-2 px-4 py-2 rounded-lg",
          "bg-gradient-to-r from-primary/10 to-primary/5",
          "border border-primary/20",
          "text-primary hover:text-primary-dark",
          "hover:from-primary/15 hover:to-primary/10",
          "transition-all duration-300",
          className
        )}
      >
        {showIcon && (
          <ShoppingBag className="w-4 h-4" />
        )}
        {showCount && (
          <span className="font-medium">
            Cart ({itemCount})
          </span>
        )}
        {showTotal && itemCount > 0 && (
          <span className="font-bold">
            ${subtotal.toFixed(2)}
          </span>
        )}
        <ChevronRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href="/cart"
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg",
          "hover:bg-gray-50 transition-colors",
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {showIcon && (
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {showCount && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
        )}
        
        <div className="hidden md:block">
          <div className="text-xs text-gray-500">Your Cart</div>
          {showTotal && itemCount > 0 ? (
            <div className="text-sm font-bold text-gray-900">
              ${subtotal.toFixed(2)}
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-700">Empty</div>
          )}
        </div>
      </Link>

      {/* Dropdown Preview */}
      {isHovering && showPreview && itemCount > 0 && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                Cart ({itemCount} items)
              </h4>
              <Link
                href="/cart"
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {previewItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-lg">👟</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/products/${item.slug}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary truncate block"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary-dark transition-colors"
                >
                  Checkout Now
                </Link>
                
                <Link
                  href="/cart"
                  className="block w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-lg text-center hover:bg-gray-50 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};