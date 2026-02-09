// 📦 components/user/UserDropdown.tsx
'use client';

import React, { useState } from 'react';
import { 
  User, Settings, Shield, LogOut, 
  Bell, CreditCard, HelpCircle 
} from 'lucide-react';
import { mockUserProfile } from '@/lib/data/user';
import Link from 'next/link';

interface UserDropdownProps {
  onSignOut?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  onSignOut,
  onProfileClick,
  onSettingsClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: User,
      onClick: () => {
        setIsOpen(false);
        if (onProfileClick) onProfileClick();
        else window.location.href = '/admin/profile';
      },
    },
    {
      label: 'Security',
      icon: Shield,
      onClick: () => {
        setIsOpen(false);
        window.location.href = '/admin/profile/security';
      },
    },
    {
      label: 'Billing',
      icon: CreditCard,
      onClick: () => {
        setIsOpen(false);
        window.location.href = '/admin/billing';
      },
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: () => {
        setIsOpen(false);
        window.location.href = '/admin/notifications';
      },
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      onClick: () => {
        setIsOpen(false);
        window.location.href = '/admin/help';
      },
    },
    {
      label: 'Sign Out',
      icon: LogOut,
      onClick: () => {
        setIsOpen(false);
        if (onSignOut) onSignOut();
        else {
          // Handle sign out logic
          alert('Signing out...');
        }
      },
      className: 'text-red-600 hover:text-red-800',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {mockUserProfile.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* User Info */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {mockUserProfile.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {mockUserProfile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {mockUserProfile.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                    {mockUserProfile.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 ${item.className || ''}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};