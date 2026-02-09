"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Truck, Package, RefreshCw, CreditCard, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CheckoutFooterProps {
  showTrustBadges?: boolean;
  showLinks?: boolean;
  className?: string;
}

export const CheckoutFooter: React.FC<CheckoutFooterProps> = ({
  showTrustBadges = true,
  showLinks = true,
  className
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-white border-t border-gray-200", className)}>
      {/* Trust Badges */}
      {showTrustBadges && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            Shop With Confidence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
              <p className="text-xs text-gray-600">256-bit SSL</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
              <p className="text-xs text-gray-600">Over $99</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">30-Day Returns</h4>
              <p className="text-xs text-gray-600">Easy Returns</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
              <p className="text-xs text-gray-600">Free Returns</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Multiple Payment</h4>
              <p className="text-xs text-gray-600">Options</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">24/7 Support</h4>
              <p className="text-xs text-gray-600">Always Here</p>
            </div>
          </div>
        </div>
      )}

      {/* Links */}
      {showLinks && (
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                © {currentYear} Luxury Store. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
                <Link href="/returns" className="hover:text-primary transition-colors">
                  Return Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};