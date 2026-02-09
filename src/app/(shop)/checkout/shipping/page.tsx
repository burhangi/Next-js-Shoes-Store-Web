"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { AddressForm, Address } from '@/components/checkout/AddressForm';
import { ShippingMethods } from '@/components/checkout/ShippingMethods';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

export default function ShippingPage() {
  const router = useRouter();
  const { items, subtotal, shippingCost, tax, total, discountAmount, setShippingOption } = useCartStore();
  const { shippingAddress, shippingMethod, setShippingAddress, setShippingMethod } = useCheckoutStore();
  
  const [address, setAddress] = useState<Address | null>(shippingAddress);
  const [selectedMethod, setSelectedMethod] = useState<string>(shippingMethod);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handleAddressSubmit = (data: Address) => {
    setAddress(data);
    setShippingAddress(data);
  };

  const handleShippingSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setShippingMethod(methodId);
    setShippingOption(methodId);
  };

  const handleContinue = () => {
    if (!address) {
      alert('Please fill in your shipping address');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/checkout/payment');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CheckoutHeader 
        title="Shipping Information"
        subtitle="Secure Checkout • Step 2 of 4"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Checkout Progress */}
        <div className="mb-8 lg:mb-12">
          <CheckoutSteps currentStep="shipping" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                  <p className="text-gray-600 mt-1">Where should we deliver your order?</p>
                </div>
              </div>

              <AddressForm
                onSubmit={handleAddressSubmit}
                isLoading={false}
                showSaveOption={true}
              />
            </motion.div>

            {/* Shipping Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
            >
              <ShippingMethods
                onSelect={handleShippingSelect}
                selectedMethod={selectedMethod}
                subtotal={subtotal}
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => router.push('/cart')}
                className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Cart
              </button>
              <button
                onClick={handleContinue}
                disabled={!address || isSubmitting}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                items={items}
                shippingCost={shippingCost}
                taxRate={0.08}
                discountAmount={discountAmount}
                editable={false}
              />
            </div>
          </div>
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
}