"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, Download, Share2, Home, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface OrderConfirmationProps {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  orderTotal: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  onContinueShopping?: () => void;
  onTrackOrder?: () => void;
  className?: string;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  orderDate,
  estimatedDelivery,
  shippingAddress,
  paymentMethod,
  orderTotal,
  items,
  onContinueShopping,
  onTrackOrder,
  className
}) => {
  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${orderNumber}`,
          text: `I just placed an order at Luxury Store! Order #${orderNumber}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Order #${orderNumber} - ${window.location.href}`);
      alert('Order link copied to clipboard!');
    }
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate/download a PDF receipt
    alert('Receipt download started!');
  };

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {/* Success Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Thank you for your order. We've sent a confirmation email with your order details.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Order #{orderNumber}</h3>
                <p className="text-gray-600">Placed on {orderDate}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${orderTotal.toFixed(2)}</div>
                <p className="text-sm text-gray-600">Total amount</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-xl">👟</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Estimated Delivery</p>
                <p className="text-gray-600">{estimatedDelivery}</p>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Shipping Address</h4>
                  <p className="text-sm text-gray-600">Where your order is headed</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
                <p className="text-gray-600">{shippingAddress.address}</p>
                <p className="text-gray-600">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Method</h4>
                  <p className="text-sm text-gray-600">How you paid</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{paymentMethod}</p>
                <p className="text-gray-600">Payment completed successfully</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          {/* Next Steps */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">What's Next?</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-sm text-gray-600">Check your email for order details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-600">We'll prepare your order for shipping</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-600">We'll email you tracking information</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadReceipt}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            
            <button
              onClick={handleShareOrder}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share Order
            </button>
            
            {onTrackOrder && (
              <button
                onClick={onTrackOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Truck className="w-5 h-5" />
                Track Order
              </button>
            )}
            
            <Link
              href="/products"
              className="block w-full text-center py-3 px-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 inline-block mr-2" />
              Continue Shopping
            </Link>
            
            <Link
              href="/"
              className="block w-full text-center py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5 inline-block mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Support Info */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
            <p className="text-sm">
              <a href="mailto:support@luxurystore.com" className="text-primary hover:underline">
                support@luxurystore.com
              </a>
              {' '}or call{' '}
              <a href="tel:+18005551234" className="text-primary hover:underline">
                +1 (800) 555-1234
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};