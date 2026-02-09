"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useNavigation } from '@/app/context/NavigationContext';
import { routes } from '@/lib/routes';
import { DesktopNav } from './DesktopNav';
import { MobileTopBar } from './MobileTopBar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileMenuDrawer } from './MobileMenuDrawer';

interface NavigationProps {
  scrolled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled = false }) => {
  const { 
    cartCount, 
    wishlistCount, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
  } = useNavigation();

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (isMobileMenuOpen || showMobileSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, showMobileSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${routes.search}?q=${encodeURIComponent(searchQuery)}`;
      setShowMobileSearch(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <DesktopNav 
        scrolled={scrolled} 
        cartCount={cartCount} 
        wishlistCount={wishlistCount} 
      />

      {/* Mobile Top Bar */}
      <MobileTopBar 
        scrolled={scrolled} 
        cartCount={cartCount} 
        onSearchClick={() => setShowMobileSearch(true)} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        onSearchClick={() => setShowMobileSearch(true)} 
        onMenuClick={() => setIsMobileMenuOpen(true)} 
      />

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-[110] bg-white lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <form onSubmit={handleSearchSubmit}>
                  <input 
                      type="text" 
                      placeholder="Search for products, brands..."
                      autoFocus
                      className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
             </div>
             <button 
                onClick={() => setShowMobileSearch(false)} 
                className="text-sm font-semibold text-gray-500 hover:text-primary px-2"
             >
                Cancel
             </button>
          </div>
          <div className="p-4">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Popular Searches</div>
             <div className="flex flex-wrap gap-2">
                {['Nike Air Max', 'Summer Sandals', 'Running Shoes', 'Leather Boots'].map(term => (
                    <button 
                        key={term}
                        onClick={() => { setSearchQuery(term); }}
                        className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                        {term}
                    </button>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};