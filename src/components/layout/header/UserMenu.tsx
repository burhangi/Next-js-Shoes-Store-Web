// 📦src/components/layout/header/UserMenu.tsx - FIXED
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  ChevronDown,
  CreditCard,
  Bell,
  Shield,
  ShoppingBag,
  HelpCircle,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/lib/hooks/useAuth';
import { useNavigation } from '@/app/context/NavigationContext';
import { routes } from '@/lib/routes';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setIsUserMenuOpen, cartCount, wishlistCount } = useNavigation();
  const { user, logout } = useAuth();

  // Handle hover to show menu
  const handleMouseEnter = () => {
    setIsOpen(true);
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsUserMenuOpen]);

  const handleMenuItemClick = (href: string) => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
    router.push(href);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    setIsUserMenuOpen(false);
    router.push(routes.home);
  };

  const menuItems = user ? [
    {
      title: 'My Account',
      items: [
        { label: 'Dashboard', href: routes.account.dashboard, icon: User },
        { label: 'Orders', href: routes.account.orders, icon: Package, badge: '3' },
        { label: 'Wishlist', href: routes.account.wishlist, icon: Heart, badge: wishlistCount?.toString() },
        { label: 'Addresses', href: routes.account.addresses, icon: MapPin },
        { label: 'Payment Methods', href: routes.account.paymentMethods, icon: CreditCard },
      ]
    },
    {
      title: 'Settings',
      items: [
        { label: 'Profile Settings', href: routes.account.settings, icon: Settings },
        { label: 'Notifications', href: routes.account.notifications, icon: Bell },
        { label: 'Security', href: '#', icon: Shield },
        { label: 'Loyalty Points', href: routes.account.loyalty, icon: Award },
      ]
    }
  ] : [
    {
      title: 'Account',
      items: [
        { label: 'Sign In', href: routes.auth.login, icon: User },
        { label: 'Register', href: routes.auth.register, icon: User },
        { label: 'Help Center', href: routes.pages.help, icon: HelpCircle },
      ]
    }
  ];

  return (
    <div 
      className="relative" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 border-2",
          isOpen 
            ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 shadow-lg" 
            : "text-gray-700 border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/20"
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur opacity-40"></div>
          <div className="relative w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary-dark rounded-full flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-bold truncate max-w-[120px]">
            {user?.name || 'Account'}
          </div>
          <div className="text-xs font-medium text-gray-500">
            {user ? 'Gold Member' : 'Sign in'}
          </div>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {user ? (
            <>
              {/* User Info - Compact */}
              <div className="px-3 py-2.5 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 truncate text-sm">{user.name || 'Welcome'}</div>
                    <div className="text-[10px] text-gray-600 truncate">{user.email || 'Premium Member'}</div>
                  </div>
                </div>
              </div>

              {/* Menu Items - Compact */}
              <div className="max-h-[350px] overflow-y-auto py-1.5">
                {menuItems.map((section, idx) => (
                  <div key={idx} className="px-2 py-1">
                    <div className="px-2 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </div>
                    {section.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleMenuItemClick(item.href)}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon className="w-3.5 h-3.5 stroke-[2]" />
                          <span className="font-semibold text-xs">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Cart & Logout - Compact */}
                <div className="px-2 py-1.5 border-t border-gray-200">
                  <button
                    onClick={() => handleMenuItemClick(routes.cart)}
                    className="w-full flex items-center justify-between px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                      <span className="text-xs">Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5 stroke-[2]" />
                    <span className="text-xs">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Guest View - Compact
            <>
              <div className="px-3 py-2.5 bg-gray-50 border-b border-gray-200">
                <div className="font-bold text-gray-900 text-sm">Welcome!</div>
                <div className="text-xs text-gray-600">Sign in for better experience</div>
              </div>

              <div className="py-1.5 px-2">
                {menuItems[0].items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleMenuItemClick(item.href)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary rounded-md transition-all duration-200"
                  >
                    <item.icon className="w-3.5 h-3.5 stroke-[2]" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}

                <div className="px-1 py-2 border-t border-gray-200 mt-1.5">
                  <p className="text-[10px] font-bold text-gray-600 mb-2">New customer?</p>
                  <button
                    onClick={() => handleMenuItemClick(routes.auth.register)}
                    className="w-full py-2 px-3 bg-gradient-to-r from-primary to-accent text-white rounded-md text-center font-bold text-xs hover:shadow-lg transition-all duration-300"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};