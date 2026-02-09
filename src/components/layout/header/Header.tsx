"use client";

import React, { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { Navigation } from './Navigation';

export const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted]);

  return (
    <header className="relative w-full z-50">
      {/* Desktop Header: Fixed Two-Tier */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 w-full z-50">
        <TopBar />
        <Navigation scrolled={scrolled} />
      </div>

      {/* Mobile Header: Components handle their own fixed positioning */}
      <div className="lg:hidden">
        <Navigation scrolled={scrolled} />
      </div>
      
      {/* Spacers to prevent content from hiding behind fixed header */}
      {/* Desktop Spacer: TopBar (36px) + Nav (~72px) = 108px */}
      <div className="hidden lg:block h-[108px]"></div>
      
      {/* Mobile Spacer: Top Nav (52px) */}
      <div className="lg:hidden h-[52px]"></div>
    </header>
  );
};