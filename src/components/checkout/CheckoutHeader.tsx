"use client";

import React from 'react';
import { Shield, ArrowLeft, Lock, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface CheckoutHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showSecurityBadge?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  showSecurityBadge = true,
  showHomeButton = true,
  className
}) => {
  return (
    <header className={cn("bg-white border-b border-gray-200 sticky top-0 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link
                href="/cart"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Cart</span>
              </Link>
            )}
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-4">
            {showHomeButton && (
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </Link>
            )}
            
            {showSecurityBadge && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <Lock className="w-4 h-4 text-green-500" />
                </div>
                <span className="hidden sm:inline">Secure checkout • 256-bit SSL</span>
                <span className="sm:hidden">Secure</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};