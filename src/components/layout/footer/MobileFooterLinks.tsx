// 📦src/components/layout/footer/MobileFooterLinks.tsx - FIXED
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LinkSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const MobileFooterLinks: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const linkSections: LinkSection[] = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '/products/new-arrivals' },
        { label: 'Best Sellers', href: '/products/best-sellers' },
        { label: 'Men\'s Shoes', href: '/categories/men' },
        { label: 'Women\'s Shoes', href: '/categories/women' },
        { label: 'Kids\' Shoes', href: '/categories/kids' },
        { label: 'Sale', href: '/products/on-sale' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { label: 'Running Shoes', href: '/categories/sports/running' },
        { label: 'Casual Sneakers', href: '/categories/casual' },
        { label: 'Formal Shoes', href: '/categories/formal' },
        { label: 'Boots', href: '/categories/boots' },
        { label: 'Sandals', href: '/categories/sandals' },
        { label: 'Athletic', href: '/categories/sports' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQs', href: '/faq' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns & Exchanges', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' },
        { label: 'Track Order', href: '/track-order' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Store Locator', href: '/store-locator' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Press', href: '/press' },
        { label: 'Affiliate Program', href: '/affiliate' },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-4">
      {linkSections.map((section) => (
        <div key={section.title} className="border-b border-white/10 pb-4">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-300 py-2"
          >
            <span>{section.title}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                openSections.includes(section.title) && "rotate-180"
              )}
            />
          </button>
          {openSections.includes(section.title) && (
            <div className="mt-3 space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-[#FF6B35] text-sm flex items-center gap-2 py-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};