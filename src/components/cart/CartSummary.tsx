"use client";

import React, { useState } from 'react';
import { Check, Tag, AlertCircle, Truck, Shield, Lock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import { PromoCodeInput } from './PromoCodeInput';

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  isLoading?: boolean;
  onApplyPromo?: (code: string) => Promise<boolean>;
  onRemovePromo?: () => void;
  promoCode?: string;
  discountAmount?: number;
  freeShippingThreshold?: number;
  className?: string;
  showPromoCode?: boolean;
  showProgressBar?: boolean;
  showSecurityNote?: boolean;
  checkoutLabel?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingCost,
  tax,
  total,
  onCheckout,
  isLoading = false,
  onApplyPromo,
  onRemovePromo,
  promoCode: initialPromoCode = '',
  discountAmount = 0,
  freeShippingThreshold = 99,
  className,
  showPromoCode = true,
  showProgressBar = true,
  showSecurityNote = true,
  checkoutLabel = 'Proceed to Checkout'
}) => {
  const [promoCode, setPromoCode] = useState(initialPromoCode);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(initialPromoCode);
  const [promoError, setPromoError] = useState('');

  const isFreeShipping = shippingCost === 0;
  const needsForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplying(true);
    setPromoError('');
    
    try {
      if (onApplyPromo) {
        const success = await onApplyPromo(promoCode.trim());
        if (success) {
          setAppliedPromo(promoCode.trim());
          setPromoCode('');
        } else {
          setPromoError('Invalid promo code');
        }
      } else {
        // Default behavior for demo
        setAppliedPromo(promoCode.trim());
        setPromoCode('');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setPromoCode('');
    setPromoError('');
    if (onRemovePromo) {
      onRemovePromo();
    }
  };

  return (
    <div className={cn("bg-white rounded-2xl border-2 border-gray-200 shadow-xl", className)}>
      {/* Header */}
      <div className="p-6 lg:p-8 border-b-2 border-gray-200 bg-gradient-to-r from-primary/5 to-primary/10">
        <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
        <p className="text-gray-600 text-sm mt-1">Review your items and total</p>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Promo Code */}
        {showPromoCode && onApplyPromo && (
          <div className="mb-6">
            <PromoCodeInput
              onApply={onApplyPromo}
              initialCode={appliedPromo}
              size="md"
              showApplied={true}
            />
          </div>
        )}

        {/* Shipping Progress */}
        {showProgressBar && needsForFreeShipping > 0 && subtotal > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                Free shipping on orders over ${freeShippingThreshold}
              </span>
              <span className="text-sm text-blue-600">
                ${needsForFreeShipping.toFixed(2)} more
              </span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Discount
                {appliedPromo && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    {appliedPromo}
                  </span>
                )}
              </span>
              <span className="font-medium">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Shipping
            </span>
            <span className="font-medium">
              {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t-2 border-gray-200 mb-6">
          <div className="flex justify-between text-2xl font-bold text-gray-900">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {isFreeShipping ? (
              <span className="text-green-600 font-medium">✓ Free shipping applied</span>
            ) : (
              'Shipping calculated at checkout'
            )}
          </p>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isLoading || subtotal === 0}
          className={cn(
            "w-full py-5 lg:py-6 text-base lg:text-lg font-bold rounded-xl",
            "bg-gradient-to-r from-primary via-primary to-primary-dark",
            "hover:from-primary-dark hover:via-primary-dark hover:to-primary-dark/90",
            "hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]",
            "transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 mr-2" />
              {checkoutLabel}
            </>
          )}
        </Button>

        {/* Security Note */}
        {showSecurityNote && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure checkout</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span>SSL encrypted</span>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500">
              Your payment information is secure and encrypted
            </p>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Accepted Payment Methods</p>
          <div className="grid grid-cols-4 gap-2">
            {['visa', 'mastercard', 'amex', 'discover', 'paypal', 'apple', 'google', 'shop'].map(
              (method) => (
                <div
                  key={method}
                  className="h-8 bg-gray-100 rounded flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-gray-700 uppercase">
                    {method}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};