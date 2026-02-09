"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Heart, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  showWishlistButton?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  className,
  showWishlistButton = true
}) => {
  const { 
    items, 
    subtotal, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getItemCount 
  } = useCartStore();
  
  const { addToWishlist } = useWishlistStore();
  const itemCount = getItemCount();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleClearCart = () => {
    if (items.length > 0) {
      if (confirm('Clear all items from cart?')) {
        clearCart();
      }
    }
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      slug: item.slug,
      brand: item.brand,
      stock: item.stock
    });
    removeFromCart(item.id);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity >= 1 && newQuantity <= item.stock) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={cn(
              "fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                  <p className="text-sm text-gray-600">
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some items to get started
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-primary to-primary-dark"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-2xl">👟</div>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link 
                              href={`/products/${item.slug}`}
                              onClick={onClose}
                              className="font-medium text-gray-900 hover:text-primary line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            {item.brand && (
                              <p className="text-sm text-gray-600">{item.brand}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variants */}
                        {(item.size || item.color) && (
                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        )}

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {showWishlistButton && (
                              <button
                                onClick={() => handleMoveToWishlist(item)}
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
                              >
                                <Heart className="w-4 h-4" />
                                <span>Save</span>
                              </button>
                            )}
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                disabled={item.quantity >= item.stock}
                                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                
                {/* Note */}
                <p className="text-sm text-gray-500 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                
                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={onClose}
                    asChild
                    className={cn(
                      "w-full py-3",
                      "bg-gradient-to-r from-primary to-primary-dark",
                      "hover:shadow-lg transition-all duration-300"
                    )}
                  >
                    <Link href="/checkout">
                      Checkout Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:border-primary"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/cart">
                      View Full Cart
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};