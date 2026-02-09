"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, Shield, Edit2, CheckCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'credit-card' | 'paypal' | 'apple-pay' | 'google-pay';
  lastFour?: string;
  name?: string;
}

interface ShippingMethod {
  name: string;
  price: number;
  estimatedDelivery: string;
}

interface OrderReviewProps {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  itemsTotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  grandTotal: number;
  onEditSection?: (section: 'shipping' | 'payment' | 'address') => void;
  className?: string;
}

export const OrderReview: React.FC<OrderReviewProps> = ({
  shippingAddress,
  billingAddress,
  paymentMethod,
  shippingMethod,
  itemsTotal,
  shippingCost,
  tax,
  discount,
  grandTotal,
  onEditSection,
  className
}) => {
  const formatPaymentMethod = () => {
    switch (paymentMethod.type) {
      case 'credit-card':
        return `Credit Card •••• ${paymentMethod.lastFour}`;
      case 'paypal':
        return 'PayPal';
      case 'apple-pay':
        return 'Apple Pay';
      case 'google-pay':
        return 'Google Pay';
      default:
        return paymentMethod.type;
    }
  };

  const sections = [
    {
      id: 'shipping',
      title: 'Shipping Address',
      icon: <MapPin className="w-5 h-5" />,
      content: (
        <div>
          <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
          <p className="text-gray-600">{shippingAddress.addressLine1}</p>
          {shippingAddress.addressLine2 && (
            <p className="text-gray-600">{shippingAddress.addressLine2}</p>
          )}
          <p className="text-gray-600">
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
          </p>
          <p className="text-gray-600">{shippingAddress.country}</p>
          <p className="text-gray-600 mt-2">{shippingAddress.phone}</p>
        </div>
      ),
      editLabel: 'Change address'
    },
    {
      id: 'billing',
      title: 'Billing Address',
      icon: <FileText className="w-5 h-5" />,
      content: billingAddress ? (
        <div>
          <p className="font-medium text-gray-900">{billingAddress.fullName}</p>
          <p className="text-gray-600">{billingAddress.addressLine1}</p>
          {billingAddress.addressLine2 && (
            <p className="text-gray-600">{billingAddress.addressLine2}</p>
          )}
          <p className="text-gray-600">
            {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
          </p>
          <p className="text-gray-600">{billingAddress.country}</p>
        </div>
      ) : (
        <p className="text-gray-600">Same as shipping address</p>
      ),
      editLabel: billingAddress ? 'Change address' : 'Add address'
    },
    {
      id: 'shipping-method',
      title: 'Shipping Method',
      icon: <Truck className="w-5 h-5" />,
      content: (
        <div>
          <p className="font-medium text-gray-900">{shippingMethod.name}</p>
          <p className="text-gray-600">Estimated delivery: {shippingMethod.estimatedDelivery}</p>
          <p className="text-gray-600">${shippingMethod.price.toFixed(2)}</p>
        </div>
      ),
      editLabel: 'Change method'
    },
    {
      id: 'payment',
      title: 'Payment Method',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div>
          <p className="font-medium text-gray-900">{formatPaymentMethod()}</p>
          {paymentMethod.name && (
            <p className="text-gray-600">Cardholder: {paymentMethod.name}</p>
          )}
        </div>
      ),
      editLabel: 'Change payment'
    }
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Order Confirmation */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Ready for Confirmation</h3>
            <p className="text-gray-600">
              Please review your order details below. Once confirmed, your order will be processed immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Review Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  <p className="text-sm text-gray-600">Review and confirm</p>
                </div>
              </div>
              
              {onEditSection && (
                <button
                  onClick={() => onEditSection(section.id as any)}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.editLabel}</span>
                </button>
              )}
            </div>
            
            <div className="pl-13">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Items Total</span>
            <span className="font-medium">${itemsTotal.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">${shippingCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-primary rounded focus:ring-primary/30 mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>,{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, and{' '}
              <Link href="/returns" className="text-primary hover:underline">Return Policy</Link>. I understand that 
              my order will be processed immediately upon confirmation and may be subject to additional verification.
            </label>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Your payment information is secure and encrypted. We never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};