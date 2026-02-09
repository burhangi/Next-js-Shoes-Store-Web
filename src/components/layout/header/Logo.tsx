// 📦src/components/layout/header/Logo.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'default' }) => {
  const sizes = {
    small: { box: 'w-8 h-8', text: 'text-base', subtitle: 'text-[9px]' },
    default: { box: 'w-10 h-10 lg:w-12 lg:h-12', text: 'text-xl lg:text-2xl', subtitle: 'text-[10px]' },
    large: { box: 'w-14 h-14', text: 'text-2xl', subtitle: 'text-xs' },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-3">
      <div
        className={`${s.box} bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300`}
      >
        <span className="text-white font-bold text-lg lg:text-xl">LS</span>
      </div>
      <div className="hidden sm:block">
        <div className={`${s.text} font-bold text-secondary`}>LUXURY STORE</div>
        <div className={`${s.subtitle} text-text-secondary -mt-1`}>Premium Footwear</div>
      </div>
    </Link>
  );
};