// 📦src/components/layout/footer/SocialLinks.tsx - UPDATED
"use client";

import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Mail,
  Globe
} from 'lucide-react';

export const SocialLinks: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, label: 'Facebook', href: '#' },
    { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', href: '#' },
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: '#' },
    { icon: <Youtube className="w-4 h-4" />, label: 'YouTube', href: '#' },
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-300 mb-3">Follow Us</h4>
      <div className="flex gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="w-8 h-8 bg-white/10 hover:bg-[#FF6B35] rounded flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};