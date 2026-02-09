// 📄 /components/products/listing/ProductListingHero.tsx
"use client";

import { ReactNode } from 'react';
import { PageHero } from '@/components/layout/PageHero';

interface ProductListingHeroProps {
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  textColor?: string;
  stats?: Array<{
    label: string;
    value: string | number;
    icon: ReactNode;
  }>;
}

export const ProductListingHero = ({
  title,
  description,
  icon,
  bgColor,
  textColor = 'text-white',
  stats = []
}: ProductListingHeroProps) => {
  return (
    <>
      <PageHero
        title={title}
        subtitle={title} // Use title as subtitle too for consistency
        description={description}
        icon={icon}
        bgColor={bgColor} // Inherit the dynamic bg color (like red for deals, primary for new arrivals)
        // Note: PageHero handles the container and padding internally
      />

      {/* Stats Bar - Kept separate as it's specific to listing pages */}
      {stats.length > 0 && (
        <div className="bg-[#F8FAFC] border-b border-gray-100">
          <div className="container mx-auto px-[10px] md:px-4 lg:px-4 max-w-[1400px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center p-3 group">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                        {stat.icon}
                    </div>
                    <div className="text-[24px] md:text-[32px] font-black text-[#1A1A1A] tracking-tighter leading-none">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};