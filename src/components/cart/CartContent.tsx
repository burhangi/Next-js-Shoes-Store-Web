"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Truck, Package, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem, CartItemType } from './CartItem';
import { CartSummary } from './CartSummary';
import { RecommendedProducts } from './RecommendedProducts';
import { CartEmptyState } from './CartEmptyState';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils/cn';

interface CartContentProps {
  className?: string;
  showTrustFeatures?: boolean;
  showRecommended?: boolean;
  onContinueShopping?: () => void;
  onCheckout?: () => void;
}

export const CartContent: React.FC<CartContentProps> = ({
  className,
  showTrustFeatures = true,
  showRecommended = true,
  onContinueShopping,
  onCheckout
}) => {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingCost,
    tax,
    total,
    discountAmount,
    promoCode,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    startCheckout,
  } = useCartStore();

  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all items from your cart?')) {
      setIsClearing(true);
      setTimeout(() => {
        clearCart();
        setIsClearing(false);
      }, 300);
    }
  };

  const handleCheckout = async () => {
    if (onCheckout) {
      onCheckout();
      return;
    }

    setIsCheckingOut(true);
    try {
      const result = await startCheckout();
      if (result.success) {
        router.push('/checkout/shipping');
      } else {
        alert(result.error || 'Checkout failed');
      }
    } catch (error) {
      alert('An error occurred during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleApplyPromo = async (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = applyPromoCode(code);
        resolve(success);
      }, 500);
    });
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      router.push('/products');
    }
  };

  if (isClearing) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Clearing cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return <CartEmptyState className={className} />;
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {items.length} item{items.length !== 1 ? 's' : ''} • Review and manage before checkout
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="border-primary text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <Button
            variant="ghost"
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CartItem
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  onMoveToWishlist={() => {}}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Features */}
          {showTrustFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Over $99</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">SSL Protected</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-900">24/7 Support</p>
                <p className="text-xs text-gray-600">Always Here</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
            discountAmount={discountAmount}
            promoCode={promoCode}
            onCheckout={handleCheckout}
            isLoading={isCheckingOut}
            onApplyPromo={handleApplyPromo}
            freeShippingThreshold={99}
          />

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-white rounded-xl border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm">📞</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Call Us</p>
                  <p className="text-sm text-gray-600">1-800-SHOES-NOW</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm">💬</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2" asChild>
                <a href="/help/cart">View Cart FAQ</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recommended Products */}
      {showRecommended && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 border-t border-gray-200"
        >
          <RecommendedProducts />
        </motion.div>
      )}
    </div>
  );
};