"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { AddressForm, Address } from "@/components/checkout/AddressForm";
import { ArrowLeft, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, CartItem } from "@/store/cartStore";
import { useCheckoutStore, PaymentMethod as CheckoutPaymentMethod } from "@/store/checkoutStore";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutFooter } from "@/components/checkout/CheckoutFooter";

// Create a type that matches both the component and store
type PaymentMethodType = 'credit-card' | 'debit-card' | 'paypal' | 'apple-pay' | 'google-pay';

export default function PaymentPage() {
  const router = useRouter();
  
  // Get cart data
  const cartStore = useCartStore();
  const items = cartStore.items || [];
  
  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 99 ? 0 : 4.99;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const discountAmount = 0;
    const total = subtotal + shippingCost + tax - discountAmount;
    
    return { subtotal, shippingCost, tax, discountAmount, total };
  };
  
  const { subtotal, shippingCost, tax, discountAmount, total } = useMemo(() => calculateTotals(), [items]);
  
  const {
    shippingAddress,
    billingAddress,
    useBillingAsShipping,
    paymentMethod,
    setPaymentMethod,
    setBillingAddress,
    setUseBillingAsShipping,
  } = useCheckoutStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(
    (paymentMethod?.type as PaymentMethodType) || "credit-card"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);

  // Redirect if cart is empty or no shipping address
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    if (!shippingAddress) {
      router.push("/checkout/shipping");
      return;
    }
  }, [items.length, shippingAddress, router]);

  const handlePaymentSelect = (method: PaymentMethodType) => {
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsLoading(true);

    const paymentMethodData: CheckoutPaymentMethod = {
      type: selectedMethod,
      ...(paymentData.cardNumber && { cardNumber: paymentData.cardNumber }),
      ...(paymentData.cardHolderName && { cardHolderName: paymentData.cardHolderName }),
      ...(paymentData.expiryDate && { expiryDate: paymentData.expiryDate }),
      ...(paymentData.cvv && { cvv: paymentData.cvv }),
      ...(paymentData.lastFour && { lastFour: paymentData.lastFour }),
      name: paymentData.cardHolderName || shippingAddress?.fullName || "",
    };

    setPaymentMethod(paymentMethodData);

    // Store order items in checkout store
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      image: item.image,
      size: item.size,
      color: item.color
    }));

    useCheckoutStore.getState().setOrderItems(
      orderItems,
      subtotal,
      shippingCost,
      tax,
      discountAmount,
      total
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/checkout/review");
    setIsLoading(false);
  };

  const handleBillingSubmit = (address: Address) => {
    setBillingAddress(address);
    setUseBillingAsShipping(false);
    setShowBillingForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CheckoutHeader title="Payment Information" subtitle="Secure Checkout • Step 3 of 4" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Checkout Progress */}
        <div className="mb-8 lg:mb-12">
          <CheckoutSteps currentStep="payment" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Payment Form & Billing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                    <p className="text-gray-600 mt-1">Choose how you want to pay</p>
                  </div>
                </div>
                <Link
                  href="/checkout/shipping"
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Back to shipping</span>
                </Link>
              </div>

              <PaymentForm
                onPaymentSelect={handlePaymentSelect}
                selectedMethod={selectedMethod}
                onSubmit={handlePaymentSubmit}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Billing Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Billing Address</h3>
                  <p className="text-gray-600 mt-1">
                    {billingAddress && !useBillingAsShipping
                      ? "Different billing address added"
                      : "Same as shipping address"}
                  </p>
                </div>
                {!showBillingForm && (
                  <button
                    onClick={() => setShowBillingForm(true)}
                    className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
                  >
                    {billingAddress && !useBillingAsShipping ? "Change" : "Add different address"}
                  </button>
                )}
              </div>

              {showBillingForm ? (
                <AddressForm
                  initialData={billingAddress || undefined}
                  onSubmit={handleBillingSubmit}
                  showSaveOption={false}
                />
              ) : billingAddress && !useBillingAsShipping ? (
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{billingAddress.fullName}</p>
                  <p className="text-gray-600">{billingAddress.addressLine1}</p>
                  {billingAddress.addressLine2 && <p className="text-gray-600">{billingAddress.addressLine2}</p>}
                  <p className="text-gray-600">
                    {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{billingAddress.country}</p>
                </div>
              ) : shippingAddress ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Using shipping address for billing</p>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
                    <p className="text-gray-600">{shippingAddress.addressLine1}</p>
                    {shippingAddress.addressLine2 && (
                      <p className="text-gray-600">{shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{shippingAddress.country}</p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>

          {/* Right Column - Order Summary & Security */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <OrderSummary
                items={items}
                shippingCost={shippingCost}
                taxRate={0.08}
                discountAmount={discountAmount}
                editable={false}
              />

              {/* Security Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Payment Security</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">256-bit SSL Encryption</p>
                      <p className="text-sm text-gray-600">Your payment information is secure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600">$</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">PCI DSS Compliant</p>
                      <p className="text-sm text-gray-600">We follow industry security standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lg">🔒</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">No Card Storage</p>
                      <p className="text-sm text-gray-600">We never store your card details</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Accepted Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6"
              >
                <h4 className="font-bold text-gray-900 mb-4">Accepted Payment Methods</h4>
                <div className="grid grid-cols-4 gap-3">
                  {["visa", "mastercard", "amex", "discover", "paypal", "apple-pay", "google-pay", "shop-pay"].map(
                    (method) => (
                      <div
                        key={method}
                        className="h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200 hover:border-primary/30 transition-colors"
                      >
                        <span className="text-xs font-semibold text-gray-700 uppercase">
                          {method === "apple-pay" ? "Apple" : method === "google-pay" ? "Google" : method}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
}