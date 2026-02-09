"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Shield, Tag, Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  stock: number;
  slug?: string;
  brand?: string;
}

interface OrderSummaryProps {
  items?: CartItem[];
  shippingCost?: number;
  taxRate?: number;
  discountCode?: string;
  discountAmount?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onApplyDiscount?: (code: string) => void;
  className?: string;
  editable?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items = [],
  shippingCost = 4.99,
  taxRate = 0.08,
  discountCode = '',
  discountAmount = 0,
  onQuantityChange,
  onRemoveItem,
  onApplyDiscount,
  className,
  editable = true
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax - discountAmount;

  const handleApplyDiscount = () => {
    if (promoCode.trim() && onApplyDiscount) {
      onApplyDiscount(promoCode.trim());
      setPromoCode('');
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10 && onQuantityChange) {
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200", className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Order Summary</h3>
              <p className="text-sm text-gray-600">{items.length} items in cart</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {(isExpanded || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent && !parent.querySelector('.fallback-icon')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-2xl';
                                fallback.textContent = '👟';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-2xl">👟</div>
                          </div>
                        )}
                      </div>
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/products/${item.slug || item.id}`}>
                            <h4 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-1">
                              {item.name}
                            </h4>
                          </Link>
                          {(item.size || item.color) && (
                            <div className="flex items-center gap-2 mt-1">
                              {item.size && (
                                <span className="text-xs text-gray-600">Size: {item.size}</span>
                              )}
                              {item.color && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="text-xs text-gray-600">Color: {item.color}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-sm text-gray-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      {editable && (
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={cn(
                                "w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center",
                                "hover:bg-gray-50 transition-colors",
                                item.quantity <= 1 && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className={cn(
                                "w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center",
                                "hover:bg-gray-50 transition-colors",
                                item.quantity >= item.stock && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          
                          {onRemoveItem && (
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              {editable && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleApplyDiscount}
                      disabled={!promoCode.trim()}
                      className={cn(
                        "px-6 py-3 bg-gray-900 text-white font-medium rounded-lg transition-colors",
                        "hover:bg-gray-800",
                        !promoCode.trim() && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Discount
                    </span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {discountAmount > 0 ? (
                      <>You saved ${discountAmount.toFixed(2)} with this order</>
                    ) : (
                      <>Free shipping on orders over $99</>
                    )}
                  </p>
                </div>
              </div>

              {/* Security Badge */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure checkout</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span>SSL encrypted</span>
                  <span className="text-gray-300">•</span>
                  <span>100% safe</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};