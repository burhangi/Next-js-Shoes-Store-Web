// 📦src/components/layout/footer/Footer.tsx - FIXED WITH REUSABLE COMPONENTS
"use client";

import React from 'react';
import { FooterLinks } from './FooterLinks';
import { FooterContact } from './FooterContact';
import { FooterBottom } from './FooterBottom';
import { Newsletter } from './Newsletter';
import { PaymentIcons } from './PaymentIcons';
import { SocialLinks } from './SocialLinks';
import { MobileFooterLinks } from './MobileFooterLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C3E50] text-white w-full">
      <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px] py-8 md:py-12">
        
        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#E85A28] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">LUXURY STORE</h2>
                <p className="text-xs text-gray-300">Premium Footwear</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Premium shoes from top brands. Quality and style in every step.
            </p>
          </div>

          {/* Contact & Social - Mobile */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#FF6B35]">📞</span>
                <span className="text-gray-300">1-800-SHOES-NOW</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#FF6B35]">✉️</span>
                <span className="text-gray-300">support@luxurystore.com</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Follow Us</h4>
              <SocialLinks />
            </div>
          </div>

          {/* Mobile Links - Reusable Component */}
          <MobileFooterLinks />

          {/* Newsletter - Mobile */}
          <div>
            <h3 className="font-semibold text-[#FF6B35] mb-3">Newsletter</h3>
            <Newsletter compact />
          </div>

          {/* Payment & Trust - Mobile */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Payment</h4>
              <PaymentIcons />
            </div>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          {/* Column 1: Brand & Social */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#E85A28] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LS</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">LUXURY STORE</h2>
                  <p className="text-sm text-gray-300">Premium Footwear</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm">
                Premium shoes from top brands. Running, casual, formal, and designer footwear for men and women.
              </p>
            </div>
            
            <SocialLinks />
            
            <FooterContact />
          </div>

          {/* Column 2 & 3: Links */}
          <div className="md:col-span-4 lg:col-span-5">
            <FooterLinks />
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 lg:col-span-4 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-[#FF6B35] mb-4">Stay Updated</h3>
              <Newsletter />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Payment Methods</h4>
                <PaymentIcons />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span>Secure Shopping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span>Free Shipping Over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <FooterBottom />
    </footer>
  );
};