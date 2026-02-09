"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, TrendingUp, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export const WishlistEmptyState: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16 px-4">
      {/* Animated Heart */}
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
            className="absolute inset-0 bg-gradient-to-br from-red-200 to-pink-200 rounded-full"
          />
          
          {/* Heart Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Heart className="w-24 h-24 text-red-500" />
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
        Your wishlist is empty
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 text-lg mb-8 max-w-md mx-auto"
      >
        Save items you love to your wishlist. Review them anytime and easily move them to your cart.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <Link
          href="/products/best-sellers"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          View Best Sellers
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Save Items</h3>
          <p className="text-gray-600 text-sm">
            Keep track of items you love and want to purchase later
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Price Alerts</h3>
          <p className="text-gray-600 text-sm">
            Get notified when items on your wishlist go on sale
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Quick Add</h3>
          <p className="text-gray-600 text-sm">
            Move items from wishlist to cart with one click
          </p>
        </div>
      </motion.div>

      {/* Recommended Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-8">Popular Right Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Running Shoes', href: '/categories/running', color: 'from-blue-500 to-blue-600' },
            { name: 'Casual Sneakers', href: '/categories/casual', color: 'from-green-500 to-green-600' },
            { name: 'Sports Gear', href: '/categories/sports', color: 'from-purple-500 to-purple-600' },
            { name: 'Limited Edition', href: '/products/limited-edition', color: 'from-red-500 to-pink-500' }
          ].map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group block bg-gradient-to-br ${category.color} rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300`}
            >
              <div className="text-lg font-semibold mb-2">{category.name}</div>
              <div className="text-sm opacity-90">Shop Now →</div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};