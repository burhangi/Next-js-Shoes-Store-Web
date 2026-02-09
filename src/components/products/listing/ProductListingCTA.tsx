// 📄 /components/products/listing/ProductListingCTA.tsx
"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ProductListingCTAProps {
  icon: ReactNode;
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  bgColor?: string;
  textColor?: string;
}

export const ProductListingCTA = ({
  icon,
  title,
  description,
  primaryButton,
  secondaryButton,
  bgColor = 'bg-gradient-to-r from-background-secondary to-background',
  textColor = 'text-foreground'
}: ProductListingCTAProps) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 md:p-8 text-center ${textColor}`}>
      <div className="max-w-2xl mx-auto">
        <div className="h-10 w-10 mx-auto mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          {primaryButton && (
            <Link href={primaryButton.href}>
              <button className={`
                ${primaryButton.variant === 'primary' ? 'btn-primary' : 
                  primaryButton.variant === 'secondary' ? 'btn-secondary' : 
                  'btn-outline'}
                px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
              `}>
                {primaryButton.text}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          )}
          
          {secondaryButton && (
            <Link href={secondaryButton.href}>
              <button className="border border-current px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                {secondaryButton.text}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};