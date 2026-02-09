// 📦src/components/layout/footer/FooterLinks.tsx - SIMPLIFIED
"use client";

import React from 'react';

export const FooterLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-[#FF6B35]">Shop</h3>
        <ul className="space-y-2">
          <li><a href="/products/new-arrivals" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">New Arrivals</a></li>
          <li><a href="/products/best-sellers" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Best Sellers</a></li>
          <li><a href="/categories/men" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Men's Shoes</a></li>
          <li><a href="/categories/women" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Women's Shoes</a></li>
          <li><a href="/categories/kids" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Kids' Shoes</a></li>
          <li><a href="/products/on-sale" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Sale</a></li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-[#FF6B35]">Help</h3>
        <ul className="space-y-2">
          <li><a href="/contact" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Contact Us</a></li>
          <li><a href="/faqs" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">FAQs</a></li>
          <li><a href="/shipping" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Shipping Info</a></li>
          <li><a href="/returns" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Returns & Exchanges</a></li>
          <li><a href="/size-guide" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Size Guide</a></li>
          <li><a href="/privacy" className="text-gray-300 hover:text-[#FF6B35] text-sm transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
  );
};