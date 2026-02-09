"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: React.ReactNode;
  features: string[];
}

interface ShippingFormProps {
  onMethodSelect: (methodId: string) => void;
  selectedMethodId?: string;
  className?: string;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  onMethodSelect,
  selectedMethodId,
  className
}) => {
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Regular delivery with tracking',
      price: 4.99,
      estimatedDelivery: '5-7 business days',
      icon: <Truck className="w-6 h-6" />,
      features: ['Free returns', 'Package tracking', 'Email notifications']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery option',
      price: 9.99,
      estimatedDelivery: '2-3 business days',
      icon: <Package className="w-6 h-6" />,
      features: ['Priority handling', 'Free insurance', 'Real-time tracking', 'Weekend delivery']
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next day delivery',
      price: 19.99,
      estimatedDelivery: 'Next business day',
      icon: <Clock className="w-6 h-6" />,
      features: ['Guaranteed delivery', 'Signature required', 'Premium insurance', '24/7 support']
    }
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleMethodSelect = async (methodId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onMethodSelect(methodId);
    setIsLoading(false);
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Shipping Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
            <p className="text-gray-600 mb-3">
              All orders include package tracking, free returns within 30 days, and insurance coverage.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free returns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Package tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Insurance included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Shipping Method</h3>
        
        {shippingMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => handleMethodSelect(method.id)}
              disabled={isLoading}
              className={cn(
                "w-full p-6 text-left rounded-xl border-2 transition-all duration-300",
                "hover:border-primary hover:shadow-lg",
                "focus:outline-none focus:ring-4 focus:ring-primary/30",
                selectedMethodId === method.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-white",
                isLoading && "opacity-50 cursor-wait"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                    selectedMethodId === method.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    {method.icon}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                      {selectedMethodId === method.id && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{method.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {method.features.map(feature => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{method.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${method.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Shipping fee</div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Special Instructions */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Special Instructions (Optional)</h4>
        <textarea
          placeholder="Add any special instructions for delivery..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors min-h-[100px] resize-none"
          rows={4}
        />
        <p className="text-sm text-gray-500 mt-2">
          Note: We cannot guarantee that special instructions will be followed, but we'll do our best.
        </p>
      </div>
    </div>
  );
};