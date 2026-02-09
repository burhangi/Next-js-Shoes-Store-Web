// 📦src/components/common/BackToTop.tsx - UPDATED
"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BackToTopProps {
  showAt?: number;
  position?: 'right' | 'left';
  offset?: number;
  className?: string;
}

export function BackToTop({
  showAt = 300,
  position = 'right',
  offset = 24,
  className
}: BackToTopProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAt);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAt, isMounted]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isMounted || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300",
        "bg-gradient-to-br from-[#FF6B35] to-[#E85A28] text-white",
        "hover:from-[#E85A28] hover:to-[#D1491F] hover:shadow-xl hover:scale-110",
        "active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2",
        position === 'right' ? `right-6` : `left-6`,
        `bottom-${offset}`,
        className
      )}
      aria-label="Back to top"
    >
      <ChevronUp className={cn(
        "w-5 h-5 transition-transform duration-300",
        isHovered && "-translate-y-0.5"
      )} />
      
      {/* Tooltip */}
      {isHovered && (
        <div className={cn(
          "absolute bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap",
          "before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4",
          "before:border-transparent before:border-t-gray-900",
          position === 'right' ? 'right-0' : 'left-0'
        )}>
          Back to top
        </div>
      )}
    </button>
  );
}