// This change requires a new file first. I'll create the file then update this.
// Skip this step, will use write_to_file first.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from './AdminContext';
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Tag,
  Palette,
  Layers,
  Settings,
  FileText,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Truck,
  Megaphone,
  Image,
  Shield,
  Globe,
} from 'lucide-react';
import { adminNotifications, getUnreadCount } from '@/lib/data/notifications';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Tag, label: 'Categories', href: '/admin/categories' },
  { icon: Palette, label: 'Brands', href: '/admin/brands' },
  { icon: Layers, label: 'Collections', href: '/admin/collections' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: MessageSquare, label: 'Reviews', href: '/admin/reviews' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Megaphone, label: 'Marketing', href: '/admin/marketing' },
  { icon: Image, label: 'Media', href: '/admin/media' },
  { icon: FileText, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAdmin(); // Mobile state
  const [desktopCollapsed, setDesktopCollapsed] = useState(false); // Desktop state
  const unreadNotifications = getUnreadCount(adminNotifications);

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen bg-white border-r border-gray-200 
          z-[90] transition-all duration-300 ease-in-out
          ${/* Mobile: translate based on sidebarOpen */ ''}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${/* Desktop: width based on desktopCollapsed */ ''}
          ${desktopCollapsed ? 'lg:w-20' : 'w-64 lg:w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!desktopCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#E85A28] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AD</span>
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
                    <p className="text-xs text-gray-500">E-Commerce Dashboard</p>
                  </div>
                </div>
              )}
              {desktopCollapsed && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#E85A28] flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
              )}
              <button
                onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100"
              >
                {desktopCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                const isNotification = item.href === '/admin/notifications';
                const showBadge = isNotification && unreadNotifications > 0;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`
                        relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-[#FF6B35]/10 to-transparent text-[#FF6B35] font-medium border-l-4 border-[#FF6B35]'
                          : 'text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="relative">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-[#FF6B35]' : ''}`} />
                        {showBadge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                            {unreadNotifications > 9 ? '9+' : unreadNotifications}
                          </span>
                        )}
                      </div>
                      {!desktopCollapsed && (
                        <span className="text-sm flex-1">{item.label}</span>
                      )}
                      {showBadge && !desktopCollapsed && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                          {unreadNotifications > 99 ? '99+' : unreadNotifications}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85A28] flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              {!desktopCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    admin@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};