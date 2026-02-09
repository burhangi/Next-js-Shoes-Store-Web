// 📦src/components/layout/footer/FooterContact.tsx - UPDATED
"use client";

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterContactProps {
  compact?: boolean;
}

export const FooterContact: React.FC<FooterContactProps> = ({ compact = false }) => {
  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '1-800-SHOES-NOW', href: 'tel:18007466376' },
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'support@luxurystore.com', href: 'mailto:support@luxurystore.com' },
  ];

  if (!compact) {
    contactInfo.push(
      { icon: <MapPin className="w-4 h-4" />, label: 'Address', value: '123 Fashion Ave, NY', href: '/store-locator' },
      { icon: <Clock className="w-4 h-4" />, label: 'Hours', value: 'Mon-Fri: 9AM-9PM EST', href: '' }
    );
  }

  return (
    <div>
      {!compact && <h4 className="text-sm font-medium text-gray-300 mb-3">Contact Info</h4>}
      <div className="space-y-2">
        {contactInfo.map((item) => (
          <div key={item.label} className="flex items-start gap-2">
            <div className="text-[#FF6B35] mt-0.5">{item.icon}</div>
            <div className="text-sm">
              {!compact && <div className="text-gray-400">{item.label}</div>}
              {item.href ? (
                <a href={item.href} className="text-gray-300 hover:text-[#FF6B35] transition-colors">
                  {item.value}
                </a>
              ) : (
                <div className="text-gray-300">{item.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};