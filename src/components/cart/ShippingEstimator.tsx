"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, Clock, MapPin, Calculator, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: string;
  icon: React.ReactNode;
  recommended?: boolean;
  features?: string[];
}

interface ShippingEstimatorProps {
  className?: string;
  defaultCountry?: string;
  defaultZipCode?: string;
  onShippingChange?: (option: ShippingOption) => void;
  showTitle?: boolean;
  showResults?: boolean;
  compact?: boolean;
}

export const ShippingEstimator: React.FC<ShippingEstimatorProps> = ({
  className,
  defaultCountry = 'US',
  defaultZipCode = '',
  onShippingChange,
  showTitle = true,
  showResults = true,
  compact = false
}) => {
  const [zipCode, setZipCode] = useState(defaultZipCode);
  const [country, setCountry] = useState(defaultCountry);
  const [selectedOption, setSelectedOption] = useState<string>('standard');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [error, setError] = useState<string | null>(null);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Regular delivery with tracking',
      price: 4.99,
      deliveryDays: '5-7 business days',
      icon: <Truck className="h-5 w-5" />,
      features: ['Free returns', 'Package tracking', 'Email notifications']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Priority delivery with full tracking',
      price: 9.99,
      deliveryDays: '2-3 business days',
      icon: <Package className="h-5 w-5" />,
      recommended: true,
      features: ['Priority handling', 'Free insurance', 'Real-time tracking', 'Weekend delivery']
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      price: 19.99,
      deliveryDays: '1 business day',
      icon: <Clock className="h-5 w-5" />,
      features: ['Guaranteed delivery', 'Signature required', 'Premium insurance', '24/7 support']
    },
    {
      id: 'free',
      name: 'Free Shipping',
      description: 'Economy shipping with tracking',
      price: 0,
      deliveryDays: '7-10 business days',
      icon: <Truck className="h-5 w-5" />,
      features: ['Free shipping', 'Package tracking', 'Email notifications']
    },
  ];

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' }
  ];

  const validateZipCode = (code: string, countryCode: string): boolean => {
    if (!code.trim()) return false;
    
    switch (countryCode) {
      case 'US':
        return /^\d{5}(-\d{4})?$/.test(code);
      case 'CA':
        return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(code);
      case 'UK':
        return /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(code);
      default:
        return code.length >= 3;
    }
  };

  const handleCalculate = () => {
    if (!validateZipCode(zipCode, country)) {
      setError('Please enter a valid ZIP/postal code');
      return;
    }

    setError(null);
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      setIsCalculating(false);
      setIsExpanded(true);
    }, 800);
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    const option = shippingOptions.find(o => o.id === optionId);
    if (option && onShippingChange) {
      onShippingChange(option);
    }
  };

  const calculateDeliveryDate = (deliveryDays: string): string => {
    const days = parseInt(deliveryDays.split('-')[0]);
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

  const selectedShipping = shippingOptions.find(o => o.id === selectedOption);
  const deliveryDate = selectedShipping ? calculateDeliveryDate(selectedShipping.deliveryDays) : '';

  return (
    <motion.div
      initial={{ opacity: 0, height: 'auto' }}
      animate={{ opacity: 1, height: 'auto' }}
      className={cn("bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6", className)}
    >
      {/* Header */}
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Shipping Estimator</h3>
              <p className="text-sm text-gray-600">Calculate shipping costs and delivery times</p>
            </div>
          </div>
          {compact && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse estimator' : 'Expand estimator'}
            >
              <ChevronDown className={cn("h-5 w-5 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          )}
        </div>
      )}

      {/* Input Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              Country
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((countryOption) => (
                  <SelectItem key={countryOption.value} value={countryOption.value}>
                    {countryOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="zipCode" className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
              <Package className="h-4 w-4" />
              ZIP/Postal Code
            </label>
            <Input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                setError(null);
              }}
              placeholder={country === 'US' ? '12345' : 'Postal Code'}
              className={cn(error && "border-red-300")}
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!zipCode.trim() || isCalculating}
          className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg"
        >
          {isCalculating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </div>
          ) : (
            'Calculate Shipping'
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {((isExpanded && showResults) || !compact) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="pt-6 border-t border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Available Shipping Options</h4>
              
              <div className="space-y-3">
                {shippingOptions.map((option) => {
                  const optionDeliveryDate = calculateDeliveryDate(option.deliveryDays);
                  const isSelected = selectedOption === option.id;
                  
                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "relative p-4 border rounded-lg cursor-pointer transition-all duration-200",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50 hover:bg-white"
                      )}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              id={`option-${option.id}`}
                              name="shipping-option"
                              value={option.id}
                              checked={isSelected}
                              onChange={() => handleSelectOption(option.id)}
                              className="mt-2"
                            />
                            <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary/10" : "bg-gray-100")}>
                              {option.icon}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`option-${option.id}`}
                                className="font-semibold text-gray-900 cursor-pointer"
                              >
                                {option.name}
                              </label>
                              {option.recommended && (
                                <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                            {option.features && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {option.features.map(feature => (
                                  <span
                                    key={feature}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>📅 {optionDeliveryDate}</span>
                              <span>⏱️ {option.deliveryDays}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={cn(
                            "text-lg font-bold",
                            option.price === 0 ? "text-green-600" : "text-gray-900"
                          )}>
                            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              {selectedShipping && (
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Selected Shipping</p>
                      <p className="text-sm text-gray-600">
                        {selectedShipping.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {selectedShipping.price === 0 
                          ? 'FREE' 
                          : `$${selectedShipping.price.toFixed(2)}`
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        Est. delivery: {deliveryDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-900 mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      Free Gift Wrap
                    </p>
                    <p className="text-xs text-gray-600">Available for all orders</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-900 mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      Easy Returns
                    </p>
                    <p className="text-xs text-gray-600">30-day return policy</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-900 mb-1 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      Package Protection
                    </p>
                    <p className="text-xs text-gray-600">Insured delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};