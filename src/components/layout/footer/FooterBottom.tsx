// 📦src/components/layout/footer/FooterBottom.tsx - UPDATED
"use client";

import React from 'react';

export const FooterBottom: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="border-t border-white/10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          {/* Copyright */}
          <div className="text-gray-400 text-center sm:text-left">
            © {currentYear} Luxury Store. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};