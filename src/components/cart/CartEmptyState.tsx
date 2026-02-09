"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Heart, TrendingUp, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface CartEmptyStateProps {
  className?: string;
  title?: string;
  description?: string;
  showCategories?: boolean;
  showFeatures?: boolean;
  primaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

export const CartEmptyState: React.FC<CartEmptyStateProps> = ({
  className,
  title = "Your cart is empty",
  description = "Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!",
  showCategories = true,
  showFeatures = true,
  primaryAction = {
    label: "Start Shopping",
    href: "/products"
  },
  secondaryAction = {
    label: "View New Arrivals",
    href: "/products/new-arrivals"
  }
}) => {
  const handlePrimaryClick = () => {
    if (primaryAction.onClick) {
      primaryAction.onClick();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryAction.onClick) {
      secondaryAction.onClick();
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto text-center py-16 px-4", className)}>
      {/* Animated Bag */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="relative w-40 h-40 mx-auto">
          {/* Pulsing background */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full"
          />
          
          {/* Shopping Bag Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-20 h-20 text-primary" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 text-lg mb-8 max-w-md mx-auto"
      >
        {description}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg"
          onClick={handlePrimaryClick}
        >
          <Link href={primaryAction.href}>
            {primaryAction.label}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleSecondaryClick}
        >
          <Link href={secondaryAction.href}>
            <Heart className="w-4 h-4 mr-2" />
            {secondaryAction.label}
          </Link>
        </Button>
      </motion.div>

      {/* Features */}
      {showFeatures && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Shopping</h3>
            <p className="text-gray-600 text-sm">
              Browse thousands of products and add them to your cart with one click
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Sellers</h3>
            <p className="text-gray-600 text-sm">
              Discover our most popular products loved by thousands of customers
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Free shipping on orders over $99 with 2-3 day delivery options
            </p>
          </div>
        </motion.div>
      )}

      {/* Recommended Categories */}
      {showCategories && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Sneakers', href: '/categories/sneakers', icon: '👟' },
              { name: 'Running', href: '/categories/running', icon: '🏃‍♂️' },
              { name: 'Casual', href: '/categories/casual', icon: '👖' },
              { name: 'Sports', href: '/categories/sports', icon: '⚽' }
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group block p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <div className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                  {category.name}
                </div>
                <div className="text-sm text-gray-600 mt-1 group-hover:text-primary/80">
                  Shop Now →
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};