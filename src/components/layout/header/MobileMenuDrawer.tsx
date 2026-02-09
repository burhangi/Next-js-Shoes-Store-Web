import React from 'react';
import Link from 'next/link';
import { X, Phone, Home, Flame, Star, Grid, Zap, Info, MessageSquare, HelpCircle, MapPin, Heart, ShoppingBag } from 'lucide-react';
import { routes } from '@/lib/routes';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mainNavItems = [
    { label: 'Home', href: routes.home, icon: Home },
    { label: 'New Arrivals', href: routes.products.newArrivals, icon: Flame, badge: 'NEW', badgeColor: 'bg-emerald-500' },
    { label: 'Best Sellers', href: routes.products.bestSellers, icon: Star, badge: 'HOT', badgeColor: 'bg-red-500' },
    { label: 'Shop All', href: routes.products.all, icon: Grid },
    { label: 'Sale', href: routes.products.onSale, icon: Zap, badge: 'SALE', badgeColor: 'bg-amber-500' },
  ];

  const infoItems = [
    { label: 'About Us', href: routes.pages.about, icon: Info },
    { label: 'Reviews', href: routes.pages.reviews, icon: MessageSquare },
    { label: 'FAQs', href: routes.pages.faq, icon: HelpCircle },
    { label: 'Store Locator', href: routes.pages.storeLocator, icon: MapPin },
  ];

  const accountItems = [
    { label: 'Wishlist', href: routes.account.wishlist, icon: Heart },
    { label: 'Cart', href: routes.cart, icon: ShoppingBag },
  ];

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div className="absolute top-0 bottom-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col border-r border-border">
        {/* Drawer Header */}
        <div className="p-6 bg-secondary text-white relative overflow-hidden shrink-0">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="font-bold text-lg text-white">LS</span>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-1 text-white">Welcome</h2>
            <p className="text-white/60 text-sm mb-4">Discover premium footwear</p>
            <Link 
              href={routes.auth.login} 
              onClick={onClose}
              className="flex items-center justify-center w-full py-2.5 bg-white text-secondary font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
        
        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {/* Main Navigation */}
          <div className="mb-3">
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Shop
            </div>
            {mainNavItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 text-gray-700 font-medium hover:text-primary transition-colors group relative"
              >
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold text-white uppercase rounded-full ${item.badgeColor || 'bg-primary'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="my-2 border-t border-gray-200" />
          
          {/* Info Pages */}
          <div className="mb-3">
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Information
            </div>
            {infoItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 text-gray-700 font-medium hover:text-primary transition-colors group"
              >
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="my-2 border-t border-gray-200" />

          {/* Account Items */}
          <div className="mb-3">
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              My Account
            </div>
            {accountItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 text-gray-700 font-medium hover:text-primary transition-colors group"
              >
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="my-2 border-t border-gray-200" />
          
          {/* Contact */}
          <Link 
            href={routes.pages.contact} 
            onClick={onClose}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 text-gray-700 font-medium hover:text-primary transition-colors group"
          >
            <Phone className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            <span className="text-sm">Contact Support</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Luxury Store
        </div>
      </div>
    </div>
  );
};
