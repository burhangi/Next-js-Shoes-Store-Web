"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/store/checkoutStore';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';

export default function SuccessPage() {
  const router = useRouter();
  const { 
    orderId, 
    orderDate, 
    shippingAddress, 
    paymentMethod,
    orderItems,
    orderSubtotal,
    orderShippingCost,
    orderTax,
    orderDiscount,
    orderTotal,
    clearCheckout 
  } = useCheckoutStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Redirect if no order ID (order wasn't placed)
    if (!orderId) {
      router.push('/cart');
      return;
    }

    setOrderNumber(orderId);
    
    if (orderDate) {
      const date = new Date(orderDate);
      const formatted = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setFormattedDate(formatted);
    } else {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setFormattedDate(formatted);
    }

    // Clear checkout data after showing success (keep orderId for display)
    // In a real app, you might want to keep this data longer
    setTimeout(() => {
      clearCheckout();
    }, 30000); // Clear after 30 seconds
  }, [orderId, orderDate, router, clearCheckout]);

  const handleTrackOrder = () => {
    // In a real app, this would navigate to order tracking
    alert('Tracking order...');
  };

  if (!orderId) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CheckoutHeader 
        title="Order Confirmed!"
        subtitle="Thank you for your purchase"
        showBackButton={false}
        showSecurityBadge={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-12"
        >
          {/* Animated Rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            className="absolute inset-0 w-32 h-32 border-4 border-green-300 rounded-full mx-auto"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.5, delay: 0.2, times: [0, 0.5, 1] }}
            className="absolute inset-0 w-40 h-40 border-4 border-green-200 rounded-full mx-auto"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />

          {/* Check Icon */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Thank you for your order. We've sent a confirmation email with your order details and tracking information.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-6 py-3 rounded-full border border-green-200 shadow-md">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">Order #{orderNumber}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 lg:p-8 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-600 mt-1">{formattedDate}</p>
                  </div>
                  <button
                    onClick={handleTrackOrder}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    Track Order
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Items Ordered</h3>
                <div className="space-y-4">
                  {orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-2xl">👟</div>';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          {(item.size || item.color) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && ' • '}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-xs text-gray-400 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                          <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-600 py-8 text-center">No items found</p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">${orderSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium">${orderShippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span className="font-medium">${orderTax.toFixed(2)}</span>
                    </div>
                    {orderDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-${orderDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Shipping Address</h4>
                    <p className="text-sm text-gray-600">Where your order is headed</p>
                  </div>
                </div>
                {shippingAddress ? (
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
                    <p className="text-gray-600">{shippingAddress.addressLine1}</p>
                    {shippingAddress.addressLine2 && (
                      <p className="text-gray-600">{shippingAddress.addressLine2}</p>
                    )}
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{shippingAddress.country}</p>
                    {shippingAddress.phone && (
                      <p className="text-gray-600 mt-2">{shippingAddress.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No shipping address available</p>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Payment Method</h4>
                    <p className="text-sm text-gray-600">How you paid</p>
                  </div>
                </div>
                {paymentMethod ? (
                  <div>
                    <p className="font-medium text-gray-900">
                      {paymentMethod.type === 'credit-card' || paymentMethod.type === 'debit-card' 
                        ? `${paymentMethod.type === 'credit-card' ? 'Credit' : 'Debit'} Card •••• ${paymentMethod.lastFour || '4242'}`
                        : paymentMethod.type.charAt(0).toUpperCase() + paymentMethod.type.slice(1).replace('-', ' ')
                      }
                    </p>
                    {paymentMethod.name && (
                      <p className="text-gray-600">Cardholder: {paymentMethod.name}</p>
                    )}
                    <p className="text-gray-600 mt-2">Payment completed successfully</p>
                  </div>
                ) : (
                  <p className="text-gray-600">No payment method available</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Confirmation</p>
                    <p className="text-sm text-gray-600">Check your email for order details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">📦</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Processing</p>
                    <p className="text-sm text-gray-600">We'll prepare your order for shipping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🚚</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipping Updates</p>
                    <p className="text-sm text-gray-600">We'll email you tracking information</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => alert('Downloading receipt...')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
                <button
                  onClick={() => alert('Sharing order...')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                  Share Order
                </button>
                <Link
                  href="/account/orders"
                  className="block w-full text-center py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  View All Orders
                </Link>
              </div>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-3">Continue Shopping</h4>
              <p className="text-gray-600 mb-4">
                Explore more premium products and exclusive deals
              </p>
              <div className="space-y-3">
                <Link
                  href="/products"
                  className="block w-full text-center py-3 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5 inline-block mr-2" />
                  Shop Now
                </Link>
                <Link
                  href="/"
                  className="block w-full text-center py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <Home className="w-5 h-5 inline-block mr-2" />
                  Back to Home
                </Link>
              </div>
            </motion.div>

            {/* Support */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
              <p className="text-gray-600 mb-3">
                Our customer support team is here to help with any questions about your order.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  📧{' '}
                  <a href="mailto:support@luxurystore.com" className="text-primary hover:underline">
                    support@luxurystore.com
                  </a>
                </p>
                <p className="text-sm">
                  📞{' '}
                  <a href="tel:+18005551234" className="text-primary hover:underline">
                    +1 (800) 555-1234
                  </a>
                </p>
                <p className="text-sm">
                  💬{' '}
                  <button className="text-primary hover:underline">
                    Live Chat Available 24/7
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
}