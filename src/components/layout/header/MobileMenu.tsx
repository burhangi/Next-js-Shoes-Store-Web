// 📦 components/layout/header/MobileMenu.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  ChevronRight, 
  User, 
  Package, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Home,
  Flame,
  Star,
  Grid,
  Award,
  Zap
} from 'lucide-react';
import { useNavigation } from '@/app/context/NavigationContext';
import { routes } from '@/lib/routes';

export const MobileMenu: React.FC = () => {
  const { setIsMobileMenuOpen, wishlistCount } = useNavigation();
  const [showCategories, setShowCategories] = useState(false);

  const mainNavItems = [
    { label: 'Home', href: routes.home, icon: Home },
    { label: 'New Arrivals', href: routes.products.newArrivals, icon: Flame, badge: 'NEW' },
    { label: 'Best Sellers', href: routes.products.bestSellers, icon: Star, badge: 'HOT' },
    { label: 'Categories', action: () => setShowCategories(!showCategories), icon: Grid, expandable: true },
    { label: 'Brands', href: routes.brands.all, icon: Award },
    { label: 'Sale', href: routes.products.onSale, icon: Zap, badge: '50% OFF' },
  ];

  const categories = [
    { label: "Men's Shoes", href: routes.categories.men },
    { label: "Women's Shoes", href: routes.categories.women },
    { label: "Kids' Shoes", href: routes.categories.kids },
    { label: 'Sports & Athletic', href: routes.categories.sports },
    { label: 'Formal Shoes', href: routes.categories.formal },
    { label: 'Casual Sneakers', href: routes.categories.casual },
  ];

  const accountItems = [
    { label: 'My Account', href: routes.account.dashboard, icon: User },
    { label: 'Orders', href: routes.account.orders, icon: Package, badge: 3 },
    { label: 'Wishlist', href: routes.account.wishlist, icon: Heart, badge: wishlistCount },
    { type: 'divider' },
    { label: 'Settings', href: routes.account.settings, icon: Settings },
    { label: 'Help Center', href: routes.pages.help, icon: HelpCircle },
    { type: 'divider' },
    { label: 'Sign Out', href: routes.auth.login, icon: LogOut },
  ];

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="font-bold text-lg">LS</span>
              </div>
              <div>
                <p className="text-lg font-bold">Luxury Store</p>
                <p className="text-sm text-white/80">Premium Footwear</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <Link
            href={routes.auth.login}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full py-2.5 bg-white text-primary font-semibold rounded-xl text-center hover:shadow-lg transition-all"
          >
            Sign In / Register
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Shop
            </p>
            {mainNavItems.map((item, index) => {
              if (item.expandable) {
                return (
                  <div key={index}>
                    <button
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary" />
                        {item.label}
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showCategories ? 'rotate-90' : ''}`} />
                    </button>
                    {showCategories && (
                      <div className="ml-8 mt-1 space-y-1 animate-in fade-in slide-in-from-left-2 duration-200">
                        {categories.map((cat, catIndex) => (
                          <Link
                            key={catIndex}
                            href={cat.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-3 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              if (item.href) {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-primary rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }
              return null;
            })}
          </div>

          <div className="my-4 border-t border-gray-200" />

          {/* Account Section */}
          <div className="p-4 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Account
            </p>
            {accountItems.map((item: any, index) => {
              if (item.type === 'divider') {
                return <div key={index} className="my-2 border-t border-gray-200" />;
              }
              
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    {item.label}
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            © 2024 Luxury Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};