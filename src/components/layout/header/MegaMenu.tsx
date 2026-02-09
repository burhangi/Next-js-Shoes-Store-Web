// 📦src/components/layout/header/MegaMenu.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Shield, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { megaMenuCategories } from '@/lib/navigation-data';

interface MegaMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onMouseEnter, onMouseLeave }) => {
  const categories = megaMenuCategories;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 transform -translate-x-1/2 top-full pt-4 w-full max-w-6xl z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12">
          {/* Categories Sidebar */}
          <div className="col-span-3 bg-gray-50 p-6 border-r border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Shop Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-primary">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">{category.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>

          {/* Subcategories & Brands */}
          <div className="col-span-6 p-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Subcategories */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h4>
                <div className="space-y-3">
                  {categories[0].subcategories.map((subcat) => (
                    <Link
                      key={subcat.name}
                      href={subcat.href}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-primary">
                          {subcat.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {subcat.count} products
                          {subcat.isTrending && (
                            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                              Trending
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Brands</h4>
                <div className="grid grid-cols-2 gap-3">
                  {categories[0].brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white group transition-all"
                    >
                      <div className="font-medium group-hover:text-white">{brand}</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 group-hover:fill-white group-hover:text-white" />
                        <span>4.5+ rating</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-primary/5 rounded-lg border border-primary/10">
                  <h5 className="font-semibold text-gray-900 mb-2">Why Shop With Us?</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Free Shipping Over $50</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>2-Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Product */}
          <div className="col-span-3 bg-gradient-to-b from-secondary to-secondary-dark p-8 text-white">
            <h4 className="text-xl font-bold mb-6">Featured Product</h4>
            <div className="mb-6">
              <div className="w-full h-48 bg-gradient-to-br from-primary to-primary-dark rounded-xl mb-4 flex items-center justify-center">
                <div className="text-6xl">👟</div>
              </div>
              <h5 className="font-bold text-lg mb-2">Premium Running Shoes</h5>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">(428 reviews)</span>
              </div>
              <div className="text-2xl font-bold text-primary-light">$129.99</div>
            </div>

            <Link
              href="/featured"
              className="block w-full py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary rounded-xl text-center font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Shop Now →
            </Link>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-sm">
                <p className="font-semibold mb-2">Limited Time Offer</p>
                <p>Get 15% off on all running shoes</p>
                <div className="mt-2 text-xs bg-primary/20 text-primary-light px-3 py-1.5 rounded-full inline-block">
                  Use code: RUN15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};