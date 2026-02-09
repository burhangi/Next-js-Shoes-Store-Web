// 📦 src/components/admin/AdminHeader.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, Menu, User, Settings, LogOut } from 'lucide-react';
import { useAdmin } from './AdminContext';
import { adminNotifications, getUnreadCount } from '@/lib/data/notifications';

export const AdminHeader: React.FC = () => {
  const { toggleSidebar } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const unreadNotifications = getUnreadCount(adminNotifications);

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between px-4 h-full lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link 
            href="/admin/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="View notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </span>
            )}
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </Link>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85A28] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                Admin User
              </span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <Link
                  href="/admin/profile"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 block"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </Link>
                <Link
                  href="/admin/profile/security"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 block"
                >
                  <Settings className="w-4 h-4" />
                  Security
                </Link>
                <Link
                  href="/admin/users"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 block"
                >
                  <User className="w-4 h-4" />
                  Manage Users
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};