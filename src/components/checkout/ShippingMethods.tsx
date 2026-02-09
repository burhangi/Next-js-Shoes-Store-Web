"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  freeThreshold?: number;
  icon: React.ReactNode;
  features: string[];
}

interface ShippingMethodsProps {
  onSelect: (methodId: string) => void;
  selectedMethod: string;
  subtotal?: number;
  className?: string;
}

export const ShippingMethods: React.FC<ShippingMethodsProps> = ({
  onSelect,
  selectedMethod,
  subtotal = 0,
  className
}) => {
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Regular delivery with tracking and insurance',
      price: 4.99,
      estimatedDays: '5-7 business days',
      freeThreshold: 99,
      icon: <Truck className="w-6 h-6" />,
      features: ['Tracking included', 'Insurance up to $100', 'Free returns']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Priority delivery with full tracking and premium insurance',
      price: 9.99,
      estimatedDays: '2-3 business days',
      freeThreshold: 150,
      icon: <Package className="w-6 h-6" />,
      features: ['Priority handling', 'Real-time tracking', 'Insurance up to $500', 'Weekend delivery']
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Guaranteed next business day delivery',
      price: 19.99,
      estimatedDays: '1 business day',
      freeThreshold: 200,
      icon: <Clock className="w-6 h-6" />,
      features: ['Guaranteed delivery', 'Signature required', 'Premium insurance', '24/7 support']
    }
  ];

  const getDeliveryDate = (estimatedDays: string) => {
    const days = parseInt(estimatedDays.split('-')[0]);
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    // Skip weekends
    let daysAdded = 0;
    while (daysAdded < days) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Truck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Shipping Method</h2>
          <p className="text-gray-600">Choose how you want your items delivered</p>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {subtotal > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">
                {subtotal >= 99 ? '🎉 You qualify for free standard shipping!' : `Add $${(99 - subtotal).toFixed(2)} more for free shipping`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Free shipping applies to Standard Shipping on orders over $99
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Methods */}
      <div className="space-y-4">
        {shippingMethods.map((method, index) => {
          const isSelected = selectedMethod === method.id;
          const isFree = method.freeThreshold && subtotal >= method.freeThreshold;
          const deliveryDate = getDeliveryDate(method.estimatedDays);
          const finalPrice = isFree ? 0 : method.price;

          return (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(method.id)}
              className={`
                w-full p-6 text-left rounded-xl border-2 transition-all duration-300
                hover:border-primary hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-primary/30
                ${isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-white'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                    ${isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {method.icon}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      {isSelected && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">
                          Selected
                        </span>
                      )}
                      {isFree && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                          FREE
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      Estimated delivery: {method.estimatedDays}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {method.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Delivers by {deliveryDate}</span>
                      </div>
                      {method.freeThreshold && (
                        <div className="text-green-600">
                          Free on orders over ${method.freeThreshold}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {isFree ? 'FREE' : `$${finalPrice.toFixed(2)}`}
                  </div>
                  <div className="text-sm text-gray-500">Shipping fee</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>All orders include tracking information</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Free returns within 30 days</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Signature required for orders over $500</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>Contact us for international shipping rates</span>
          </div>
        </div>
      </div>
    </div>
  );
};