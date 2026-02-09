"use client";

import React from 'react';
import { CheckCircle, Circle, Package, CreditCard, Truck, ShieldCheck, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'review' | 'success';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
  className?: string;
  showLabels?: boolean;
  showIcons?: boolean;
  clickable?: boolean;
}

const steps: Array<{
  id: CheckoutStep;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}> = [
  {
    id: 'cart',
    label: 'Cart',
    description: 'Review items',
    icon: <Package className="w-5 h-5" />,
    href: '/cart'
  },
  {
    id: 'shipping',
    label: 'Shipping',
    description: 'Address & delivery',
    icon: <Truck className="w-5 h-5" />,
    href: '/checkout/shipping'
  },
  {
    id: 'payment',
    label: 'Payment',
    description: 'Payment method',
    icon: <CreditCard className="w-5 h-5" />,
    href: '/checkout/payment'
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Order summary',
    icon: <ShieldCheck className="w-5 h-5" />,
    href: '/checkout/review'
  },
  {
    id: 'success',
    label: 'Complete',
    description: 'Confirmation',
    icon: <CheckCircle className="w-5 h-5" />,
    href: '/checkout/success'
  }
];

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ 
  currentStep, 
  className,
  showLabels = true,
  showIcons = true,
  clickable = true
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = step.id === currentStep;
            const isDisabled = index > currentIndex;
            const isClickable = clickable && (isCompleted || isCurrent);

            const StepContent = () => (
              <div className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  isCompleted && "bg-primary border-primary",
                  isCurrent && "border-primary bg-white",
                  !isCompleted && !isCurrent && "border-gray-300 bg-white",
                  isDisabled && "opacity-50"
                )}>
                  <div className={cn(
                    "transition-colors duration-300",
                    isCompleted ? "text-white" : isCurrent ? "text-primary" : "text-gray-400"
                  )}>
                    {showIcons ? (
                      isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        React.cloneElement(step.icon as React.ReactElement, {
                          className: "w-5 h-5"
                        })
                      )
                    ) : (
                      <span className="text-sm font-bold">
                        {isCompleted ? '✓' : index + 1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Step Info */}
                {showLabels && (
                  <div className="mt-4 text-center">
                    <div className={cn(
                      "text-sm font-semibold",
                      isCompleted || isCurrent ? "text-primary" : "text-gray-500"
                    )}>
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                )}
              </div>
            );

            return isClickable ? (
              <Link
                key={step.id}
                href={step.href}
                className="flex flex-col items-center relative"
              >
                <StepContent />
              </Link>
            ) : (
              <div key={step.id} className="flex flex-col items-center relative">
                <StepContent />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-8 lg:hidden">
        <div className="text-sm text-gray-600 mb-2">
          Step {currentIndex + 1} of {steps.length}: {steps[currentIndex].label}
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};