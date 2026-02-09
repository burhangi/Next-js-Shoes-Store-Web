// 📦 components/admin/settings/SettingsSidebar.tsx - UPDATED
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  CreditCard,
  Truck,
  Percent,
  Search,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const settingsMenu = [
  {
    name: 'General',
    href: '/admin/settings',
    icon: SettingsIcon,
    description: 'Store information and basic settings',
  },
  {
    name: 'Notifications',
    href: '/admin/settings/notifications',
    icon: Bell,
    description: 'Email and alert preferences',
  },
  {
    name: 'Payment',
    href: '/admin/settings/payment',
    icon: CreditCard,
    description: 'Payment gateways and processing',
  },
  {
    name: 'Shipping',
    href: '/admin/settings/shipping',
    icon: Truck,
    description: 'Shipping methods and rates',
  },
  {
    name: 'Tax',
    href: '/admin/settings/tax',
    icon: Percent,
    description: 'Tax rates and rules',
  },
  {
    name: 'SEO',
    href: '/admin/settings/seo',
    icon: Search,
    description: 'Search engine optimization',
  },
  {
    name: 'Integrations',
    href: '/admin/settings/integrations',
    icon: Zap,
    description: 'Third-party integrations',
  },
];

export const SettingsSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-4rem)] hidden lg:block">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-primary" />
          Settings
        </h2>
        
        <nav className="space-y-1">
          {settingsMenu.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-lg transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-primary" : "text-gray-500"
                  )} />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};