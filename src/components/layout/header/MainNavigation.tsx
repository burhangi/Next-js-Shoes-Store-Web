// 📦src/components/layout/header/MainNavigation.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, User, Heart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useNavigation } from '@/app/context/NavigationContext';
import { mainNavigationItems } from '@/lib/navigation-data';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { MegaMenu } from './MegaMenu';
import { UserMenu } from './UserMenu';

interface MainNavigationProps {
  scrolled: boolean;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ scrolled }) => {
  const pathname = usePathname();
  const {
    setIsMobileMenuOpen,
    setIsCartOpen,
    setIsUserMenuOpen,
    cartCount,
    wishlistCount,
  } = useNavigation();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'transition-all duration-300 border-b',
        scrolled
          ? 'border-gray-200 shadow-lg'
          : 'border-gray-100'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-primary transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <Logo />
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {mainNavigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => {
                      if (item.isMegaMenu) {
                        setIsMegaMenuOpen(true);
                        setHoveredCategory(item.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.isMegaMenu) {
                        setIsMegaMenuOpen(false);
                        setHoveredCategory(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-medium transition-colors duration-200',
                        isActive(item.href) && 'text-primary font-semibold'
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full text-white font-bold',
                            item.badgeColor || 'bg-primary'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && <ChevronDown className="h-4 w-4" />}
                    </Link>

                    {/* Mega Menu */}
                    {item.isMegaMenu && isMegaMenuOpen && hoveredCategory === item.id && (
                      <MegaMenu
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* Wishlist */}
            <button className="hidden lg:block p-2 text-gray-700 hover:text-primary transition-colors relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-primary transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-4">
          <SearchBar variant="mobile" />
        </div>
      </div>
    </nav>
  );
};