"use client";

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, HelpCircle, MapPin, Info, MessageSquare, Phone } from 'lucide-react';
import { routes } from '@/lib/routes';

export const TopBar: React.FC = () => {
  return (
    <div className="hidden lg:block bg-gradient-to-r from-secondary via-[#1a2332] to-secondary text-white/95 relative z-[51] border-b border-primary/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="flex items-center justify-between h-10 text-xs font-semibold tracking-wide">
          {/* Left: Trust Indicators - Enhanced */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default group">
              <div className="p-1 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors">
                <Truck className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-bold">Free Shipping on Orders Over $150</span>
            </span>
            <span className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default group">
              <div className="p-1 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-bold">100% Secure Checkout</span>
            </span>
          </div>

          {/* Right: Utilities - Enhanced */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
               <Link 
                 href={routes.pages.about} 
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group"
               >
                <Info className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <Link 
                href={routes.pages.reviews} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group"
              >
                <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Reviews</span>
              </Link>
               <Link 
                 href={routes.pages.storeLocator} 
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group"
               >
                <MapPin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Store Locator</span>
              </Link>
              <Link 
                href={routes.pages.faq} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group"
              >
                <HelpCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>FAQs</span>
              </Link>
               <Link 
                 href={routes.pages.contact} 
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group"
               >
                <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};