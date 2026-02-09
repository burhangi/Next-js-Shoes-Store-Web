"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { AddressForm, Address } from '@/components/checkout/AddressForm';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderReview } from '@/components/checkout/OrderReview';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import { ArrowLeft, Lock, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'review' | 'success'>('cart');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for form data
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  // Cart items data
  const cartItems = [
    {
      id: '1',
      name: 'Premium Leather Sneakers',
      price: 189.99,
      originalPrice: 229.99,
      quantity: 1,
      image: '/api/placeholder/80/80',
      size: '10',
      color: 'Black',
      stock: 10
    },
    {
      id: '2',
      name: 'Designer Running Shoes',
      price: 159.99,
      quantity: 1,
      image: '/api/placeholder/80/80',
      size: '9',
      color: 'White/Red',
      stock: 8
    },
    {
      id: '3',
      name: 'Casual Loafers',
      price: 129.99,
      originalPrice: 149.99,
      quantity: 2,
      image: '/api/placeholder/80/80',
      size: '11',
      color: 'Brown',
      stock: 15
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 9.99 : shippingMethod === 'overnight' ? 19.99 : 4.99;
  const tax = subtotal * 0.08;
  const discount = 15.00;
  const total = subtotal + shippingCost + tax - discount;

  // Handlers for each step
  const handleAddressSubmit = async (address: Address) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setShippingAddress(address);
    setBillingAddress(address); // Default to same as shipping
    setStep('shipping');
    setIsLoading(false);
  };

  const handleShippingSelect = (methodId: string) => {
    setShippingMethod(methodId);
  };

  const handleShippingSubmit = () => {
    setStep('payment');
  };

  const handlePaymentSelect = (method: any) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setPaymentMethod(paymentData);
    setStep('review');
    setIsLoading(false);
  };

  const handleEditSection = (section: 'shipping' | 'payment' | 'address') => {
    if (section === 'address') {
      setStep('cart');
    } else if (section === 'shipping') {
      setStep('shipping');
    } else if (section === 'payment') {
      setStep('payment');
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setStep('success');
    setIsLoading(false);
  };

  // Get shipping method details
  const getShippingMethodDetails = () => {
    switch (shippingMethod) {
      case 'express':
        return { name: 'Express Shipping', price: 9.99, estimatedDelivery: '2-3 business days' };
      case 'overnight':
        return { name: 'Overnight Shipping', price: 19.99, estimatedDelivery: 'Next business day' };
      default:
        return { name: 'Standard Shipping', price: 4.99, estimatedDelivery: '5-7 business days' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Luxury Store
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Secure checkout • 256-bit SSL</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Checkout Steps */}
          <div className="mb-8 lg:mb-12">
            <CheckoutSteps currentStep={step} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Address */}
                {step === 'cart' && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Information</h2>
                        <p className="text-gray-600">Enter your shipping details to continue</p>
                      </div>
                      <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Step 1 of 4
                      </div>
                    </div>

                    <AddressForm
                      onSubmit={handleAddressSubmit}
                      isLoading={isLoading}
                      showSaveOption={true}
                    />
                  </div>
                )}

                {/* Step 2: Shipping Method */}
                {step === 'shipping' && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Method</h2>
                        <p className="text-gray-600">Choose how you want your items delivered</p>
                      </div>
                      <button
                        onClick={() => setStep('cart')}
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to address</span>
                      </button>
                    </div>

                    <ShippingForm
                      onMethodSelect={handleShippingSelect}
                      selectedMethodId={shippingMethod}
                    />

                    <div className="pt-8 border-t border-gray-200">
                      <button
                        onClick={handleShippingSubmit}
                        disabled={!shippingMethod}
                        className="w-full py-4 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 'payment' && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
                        <p className="text-gray-600">Choose how you want to pay</p>
                      </div>
                      <button
                        onClick={() => setStep('shipping')}
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to shipping</span>
                      </button>
                    </div>

                    <PaymentForm
                      onPaymentSelect={handlePaymentSelect}
                      selectedMethod={'credit-card'}
                      onSubmit={handlePaymentSubmit}
                      isLoading={isLoading}
                    />
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 'review' && shippingAddress && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
                        <p className="text-gray-600">Please review your order before placing</p>
                      </div>
                      <button
                        onClick={() => setStep('payment')}
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to payment</span>
                      </button>
                    </div>

                    <OrderReview
                      shippingAddress={shippingAddress}
                      billingAddress={billingAddress || shippingAddress}
                      paymentMethod={{
                        type: 'credit-card',
                        lastFour: '4242',
                        name: shippingAddress.fullName
                      }}
                      shippingMethod={getShippingMethodDetails()}
                      itemsTotal={subtotal}
                      shippingCost={shippingCost}
                      tax={tax}
                      discount={discount}
                      grandTotal={total}
                      onEditSection={handleEditSection}
                    />

                    <div className="pt-8 border-t border-gray-200">
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className={`
                          w-full py-4 px-6 bg-primary text-white font-semibold rounded-lg 
                          hover:bg-primary-dark hover:shadow-lg transition-all duration-300
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${isLoading ? 'opacity-70 cursor-wait' : ''}
                        `}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Order...</span>
                          </div>
                        ) : (
                          'Place Order'
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Success */}
                {step === 'success' && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Thank you for your order. We've sent a confirmation email with your order details and tracking information.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          href="/account/orders"
                          className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          View Order
                        </Link>
                        <Link
                          href="/products"
                          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                items={cartItems}
                shippingCost={shippingCost}
                taxRate={0.08}
                discountCode="SAVE10"
                discountAmount={discount}
                editable={step === 'cart'}
                onQuantityChange={(id, quantity) => console.log('Quantity changed:', id, quantity)}
                onRemoveItem={(id) => console.log('Remove item:', id)}
                onApplyDiscount={(code) => console.log('Apply discount:', code)}
              />

              {/* Security & Support Section */}
              <div className="mt-6 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Secure Checkout</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Your data is protected</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                        <p className="text-sm text-gray-600">24/7 response</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">💬</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Live Chat</p>
                        <p className="text-sm text-gray-600">Instant help</p>
                      </div>
                    </div>
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
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}