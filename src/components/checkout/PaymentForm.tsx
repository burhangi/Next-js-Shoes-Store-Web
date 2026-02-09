"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, CheckCircle, Smartphone, Wallet, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Update to include 'debit-card'
export type PaymentMethod = 'credit-card' | 'debit-card' | 'paypal' | 'apple-pay' | 'google-pay';

interface PaymentFormProps {
  onPaymentSelect: (method: PaymentMethod) => void;
  selectedMethod?: PaymentMethod;
  onSubmit: (paymentData: any) => void;
  isLoading?: boolean;
  className?: string;
  showSavedCards?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onPaymentSelect,
  selectedMethod = 'credit-card',
  onSubmit,
  isLoading = false,
  className,
  showSavedCards = true
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [savedCards] = useState([
    { id: '1', lastFour: '4242', brand: 'visa', name: 'Primary Card', expiry: '12/25' },
    { id: '2', lastFour: '8888', brand: 'mastercard', name: 'Secondary Card', expiry: '06/24' }
  ]);

  const paymentMethods = [
    {
      id: 'credit-card' as PaymentMethod,
      name: 'Credit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay with Visa, Mastercard, or American Express',
      badge: 'Most Popular'
    },
    {
      id: 'debit-card' as PaymentMethod,
      name: 'Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay directly from your bank account',
      badge: 'Secure'
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Pay securely with your PayPal account',
      badge: 'Fast & Secure'
    },
    {
      id: 'apple-pay' as PaymentMethod,
      name: 'Apple Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Pay with Face ID or Touch ID',
      badge: 'Secure'
    },
    {
      id: 'google-pay' as PaymentMethod,
      name: 'Google Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Pay with your Google account',
      badge: 'Secure'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle both credit and debit cards
    if (selectedMethod === 'credit-card' || selectedMethod === 'debit-card') {
      // Validate card form
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        return;
      }
    }
    
    onSubmit({
      method: selectedMethod,
      // Pass card details for both credit and debit cards
      ...((selectedMethod === 'credit-card' || selectedMethod === 'debit-card') && { cardDetails: formData })
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };

  // Check if selected method shows card form
  const showCardForm = selectedMethod === 'credit-card' || selectedMethod === 'debit-card';

  return (
    <div className={cn("space-y-8", className)}>
      {/* Security Badge */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-gray-600">All transactions are encrypted and secure</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">256-bit SSL</span>
          </div>
        </div>
      </div>

      {/* Saved Cards */}
      {showSavedCards && savedCards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Saved Payment Methods</h3>
          <div className="space-y-3">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{card.name}</p>
                    <p className="text-sm text-gray-600">
                      {card.brand.toUpperCase()} •••• {card.lastFour} • Expires {card.expiry}
                    </p>
                  </div>
                </div>
                <button className="text-primary hover:text-primary-dark font-medium text-sm">
                  Use This Card
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              type="button"
              onClick={() => onPaymentSelect(method.id)}
              className={cn(
                "p-4 text-left rounded-xl border-2 transition-all duration-300",
                "hover:border-primary hover:shadow-md",
                selectedMethod === method.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    selectedMethod === method.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                      {method.badge && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">
                          {method.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Card Form (for both credit and debit cards) */}
      {showCardForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Number */}
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="md:col-span-2">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="JOHN DOE"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors uppercase"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              {/* CVV */}
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>CVC</span>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs cursor-help"
                        title="Card Verification Code"
                      >
                        ?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Card */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded focus:ring-primary/30"
              />
              <label htmlFor="saveCard" className="text-sm text-gray-700 cursor-pointer">
                Save this card for future purchases
              </label>
            </div>
          </form>
        </motion.div>
      )}

      {/* Alternative Payment Methods Info */}
      {!showCardForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {selectedMethod === 'paypal' && 'PayPal Payment'}
                {selectedMethod === 'apple-pay' && 'Apple Pay Payment'}
                {selectedMethod === 'google-pay' && 'Google Pay Payment'}
              </h4>
              <p className="text-gray-600 mb-3">
                You will be redirected to a secure payment page to complete your transaction.
                Your card details are never shared with our store.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>100% Secure | Encrypted | No fees</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              Your payment information is secure and encrypted. We never store your full card details on our servers.
              All transactions are processed through PCI-compliant payment gateways.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || (showCardForm && 
            (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv))}
          className={cn(
            "w-full py-4 px-6 bg-primary text-white font-semibold rounded-lg transition-all duration-300",
            "hover:bg-primary-dark hover:shadow-lg",
            "focus:outline-none focus:ring-4 focus:ring-primary/30",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary",
            isLoading && "opacity-70 cursor-wait"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay Securely ${selectedMethod !== 'credit-card' && selectedMethod !== 'debit-card' ? 'with ' + paymentMethods.find(m => m.id === selectedMethod)?.name : ''}`
          )}
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};