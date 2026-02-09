"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Check, X, AlertCircle, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>;
  onRemove?: (code: string) => void;
  initialCode?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showApplied?: boolean;
  showPopularCodes?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onApply,
  onRemove,
  initialCode = '',
  className,
  size = 'md',
  showApplied = true,
  showPopularCodes = true,
  label = 'Have a promo code?',
  placeholder = 'Enter promo code',
  disabled = false
}) => {
  const [promoCode, setPromoCode] = useState(initialCode);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedCode, setAppliedCode] = useState(initialCode);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const sizes = {
    sm: 'py-2 text-sm',
    md: 'py-3',
    lg: 'py-4 text-lg'
  };

  const popularCodes = [
    { code: 'SAVE10', description: 'Save 10% on your order' },
    { code: 'FREESHIP', description: 'Free shipping on all orders' },
    { code: 'WELCOME20', description: '20% off for new customers' },
  ];

  const handleApply = async () => {
    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    if (disabled) return;

    setIsApplying(true);
    setError('');
    setSuccess(false);

    try {
      const isValid = await onApply(promoCode.trim());
      if (isValid) {
        setAppliedCode(promoCode.trim());
        setPromoCode('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Invalid promo code');
      }
    } catch (err) {
      setError('Failed to apply promo code');
    } finally {
      setIsApplying(false);
    }
  };

  const handleClear = () => {
    const codeToRemove = appliedCode;
    setAppliedCode('');
    setPromoCode('');
    setError('');
    setSuccess(false);
    if (onRemove && codeToRemove) {
      onRemove(codeToRemove);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  const handlePopularCodeClick = (code: string) => {
    setPromoCode(code);
    setError('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Percent className="w-4 h-4 text-primary" />
        <span className="font-medium text-gray-900">{label}</span>
      </div>

      {/* Input and Apply Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            disabled={isApplying || disabled}
            className={cn(
              sizes[size],
              "pr-10",
              error && "border-red-300 focus:border-red-500 focus:ring-red-200",
              success && "border-green-300 focus:border-green-500 focus:ring-green-200",
              disabled && "bg-gray-100 cursor-not-allowed"
            )}
          />
          {promoCode && !disabled && (
            <button
              onClick={() => setPromoCode('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <Button
          onClick={handleApply}
          disabled={!promoCode.trim() || isApplying || disabled}
          variant="outline"
          className={cn(
            "whitespace-nowrap",
            sizes[size],
            "px-6",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {isApplying ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Applying...</span>
            </div>
          ) : (
            'Apply'
          )}
        </Button>
      </div>

      {/* Error Message */}
      {error && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Success Message */}
      {success && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-600 text-sm"
        >
          <Check className="w-4 h-4" />
          <span>Promo code "{appliedCode}" applied successfully!</span>
        </motion.div>
      )}

      {/* Applied Code Display */}
      {showApplied && appliedCode && !disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-700">{appliedCode}</span>
            <span className="text-green-600 text-sm">applied</span>
          </div>
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Popular Promo Codes */}
      {showPopularCodes && !disabled && (
        <div className="pt-2">
          <p className="text-sm text-gray-600 mb-2">Popular codes:</p>
          <div className="flex flex-wrap gap-2">
            {popularCodes.map(({ code, description }) => (
              <button
                key={code}
                onClick={() => handlePopularCodeClick(code)}
                className={cn(
                  "group relative px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors",
                  "hover:shadow-sm"
                )}
                title={description}
              >
                <span>{code}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};