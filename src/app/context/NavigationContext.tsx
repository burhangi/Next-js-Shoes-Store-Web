// 📦src/app/context/NavigationContext.tsx - UPDATED
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCategoriesOpen: boolean;
  setIsCategoriesOpen: (open: boolean) => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  
  // Navigation states
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  
  // Mock data
  cartCount: number;
  wishlistCount: number;
  notificationsCount: number;
  
  // Actions
  handleSearch: (query: string) => void;
  handleNavigation: (href: string) => void;
  navigateToAccount: (path?: string) => void;
  navigateToCheckout: (step?: number) => void;
  
  // UI states
  scrolled: boolean;
  setScrolled: (scrolled: boolean) => void;
  
  // Route helpers
  isActiveRoute: (href: string) => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  // Mock data
  const cartCount = 3;
  const wishlistCount = 2;
  const notificationsCount = 5;

  // Update active route when pathname changes
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modals are open
  useEffect(() => {
    const shouldPreventScroll = isMobileMenuOpen || isCategoriesOpen || isCartOpen || isSearchOpen;
    
    if (shouldPreventScroll) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isCategoriesOpen, isCartOpen, isSearchOpen]);

  // Check if route is active
  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === href;
    if (href === '#') return false;
    return pathname?.startsWith(href);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleNavigation = (href: string) => {
    // Only navigate if it's a valid route
    if (href && href !== '#' && href.startsWith('/')) {
      router.push(href);
    }
    
    // Close all modals
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setIsCartOpen(false);
  };

  const navigateToAccount = (path: string = '/account') => {
    handleNavigation(path);
  };

  const navigateToCheckout = (step: number = 1) => {
    const routes = ['/checkout/shipping', '/checkout/payment', '/checkout/review'];
    const route = step <= 3 ? routes[step - 1] : '/checkout';
    handleNavigation(route);
  };

  return (
    <NavigationContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCategoriesOpen,
        setIsCategoriesOpen,
        isUserMenuOpen,
        setIsUserMenuOpen,
        activeCategory,
        setActiveCategory,
        activeRoute,
        setActiveRoute,
        cartCount,
        wishlistCount,
        notificationsCount,
        scrolled,
        setScrolled,
        handleSearch,
        handleNavigation,
        navigateToAccount,
        navigateToCheckout,
        isActiveRoute,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};