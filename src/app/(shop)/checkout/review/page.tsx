"use client";

import React, { useState, useEffect } from 'react';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { OrderReview } from '@/components/checkout/OrderReview';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { ArrowLeft, CheckCircle, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';

export default function ReviewPage() {
  const router = useRouter();
  const { items, shippingOption, clearCart } = useCartStore();
  const { 
    shippingAddress, 
    billingAddress, 
    useBillingAsShipping,
    paymentMethod,
    shippingMethod,
    setOrderId,
    setOrderItems
  } = useCheckoutStore();
  
  const [isLoading, setIsLoading] = useState(false);

  // Calculate cart totals from items
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Get shipping cost based on shipping option
  const getShippingCost = () => {
    switch(shippingOption) {
      case 'express': return 9.99;
      case 'overnight': return 19.99;
      default: return 4.99; // standard
    }
  };
  
  const shippingCost = getShippingCost();
  const tax = subtotal * 0.08; // 8% tax rate
  const discountAmount = 0; // No discount applied for now
  const total = subtotal + shippingCost + tax - discountAmount;

  // Redirect if cart is empty or missing required data
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    if (!shippingAddress) {
      router.push('/checkout/shipping');
      return;
    }
    if (!paymentMethod) {
      router.push('/checkout/payment');
      return;
    }
  }, [items.length, shippingAddress, paymentMethod, router]);

  // Get shipping method details
  const getShippingMethodDetails = () => {
    const methods: Record<string, { name: string; price: number; estimatedDelivery: string }> = {
      'standard': { name: 'Standard Shipping', price: 4.99, estimatedDelivery: '5-7 business days' },
      'express': { name: 'Express Shipping', price: 9.99, estimatedDelivery: '2-3 business days' },
      'overnight': { name: 'Overnight Shipping', price: 19.99, estimatedDelivery: 'Next business day' },
    };
    return methods[shippingMethod] || methods['standard'];
  };

  const handleEditSection = (section: 'shipping' | 'payment' | 'address') => {
    if (section === 'shipping' || section === 'address') {
      router.push('/checkout/shipping');
    } else if (section === 'payment') {
      router.push('/checkout/payment');
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    // Generate order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    setOrderId(orderId);
    
    // Store order items and totals before clearing cart
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      image: item.image,
      size: item.size,
      color: item.color,
    }));
    
    setOrderItems(orderItems, subtotal, shippingCost, tax, discountAmount, total);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear cart after successful order
    clearCart();
    
    router.push('/checkout/success');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CheckoutHeader 
        title="Review Your Order"
        subtitle="Secure Checkout • Step 4 of 4"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Checkout Progress */}
        <div className="mb-8 lg:mb-12">
          <CheckoutSteps currentStep="review" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Order Review */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Review Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
                    <p className="text-gray-600 mt-1">Please review your order before placing</p>
                  </div>
                </div>
                <Link
                  href="/checkout/payment"
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Back to payment</span>
                </Link>
              </div>

                {/* Order Review Component */}
                {shippingAddress && paymentMethod && (
                  <OrderReview
                    shippingAddress={shippingAddress}
                    billingAddress={useBillingAsShipping ? shippingAddress : (billingAddress || shippingAddress)}
                    paymentMethod={{
                      type: paymentMethod.type === 'debit-card' ? 'credit-card' : paymentMethod.type,
                      lastFour: paymentMethod.lastFour || '4242',
                      name: paymentMethod.name || shippingAddress.fullName
                    }}
                    shippingMethod={getShippingMethodDetails()}
                    itemsTotal={subtotal}
                    shippingCost={shippingCost}
                    tax={tax}
                    discount={discountAmount}
                    grandTotal={total}
                    onEditSection={handleEditSection}
                  />
                )}

              {/* Place Order Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className={`
                    w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl 
                    transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${isLoading ? 'opacity-70 cursor-wait' : ''}
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 inline-block mr-2" />
                      Place Order • ${total.toFixed(2)}
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  By placing your order, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </motion.div>

              {/* Order Processing Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What happens next?</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Confirmation</p>
                      <p className="text-sm text-gray-600">
                        You'll receive an email confirmation with your order details within minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">📦</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Processing</p>
                      <p className="text-sm text-gray-600">
                        We'll start processing your order immediately. Most orders ship within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🚚</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Shipping Updates</p>
                      <p className="text-sm text-gray-600">
                        You'll receive tracking information via email once your order ships
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <OrderSummary
                items={items}
                shippingCost={shippingCost}
                taxRate={0.08}
                discountAmount={discountAmount}
                editable={false}
              />

              {/* Customer Support */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">📞</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Live Support</p>
                      <p className="text-sm text-gray-600">Call 1-800-555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✉️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">support@luxurystore.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Policy */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Return Policy</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">30-day free returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">Free return shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">Full refund guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">No restocking fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 Luxury Store. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/returns" className="hover:text-primary transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}