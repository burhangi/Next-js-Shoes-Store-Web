// 📄 /components/account/AccountNav.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: 'user' | 'admin';
  membership: 'standard' | 'premium' | 'gold';
  points: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: number;
}

interface AccountNavProps {
  user: User;
  navItems?: NavItem[];
  stats?: {
    orders: number;
    wishlist: number;
    points: number;
  };
  onLogout?: () => void;
  loading?: boolean;
  className?: string;
}

export const AccountNav: React.FC<AccountNavProps> = ({
  user,
  navItems = [],
  stats = { orders: 24, wishlist: 8, points: 1250 },
  onLogout,
  loading = false,
  className
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (loading) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6 animate-pulse', className)}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
          <div className="h-9 bg-gray-300 rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === '/account') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn('bg-white rounded-xl border border-gray-200 p-6 shadow-sm', className)}
    >
      {/* User Profile Card */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 truncate max-w-[180px]">{user.name}</h2>
            <div className="flex items-center gap-1">
              <div className={cn(
                'w-2 h-2 rounded-full',
                user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              )} />
              <p className="text-sm text-gray-500">
                {user.membership.charAt(0).toUpperCase() + user.membership.slice(1)} Member
              </p>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between border-gray-300 hover:border-primary"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="text-gray-700">Account Menu</span>
          <ChevronRight
            className={cn(
              'h-4 w-4 text-gray-500 transition-transform duration-200',
              isCollapsed && 'rotate-90'
            )}
          />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className={cn('space-y-1', isCollapsed && 'hidden sm:block')}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    active
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium text-sm truncate">{item.label}</span>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform',
                    active ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                  )}
                />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      {onLogout && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Account Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-blue-700">Orders</span>
            </div>
            <p className="text-lg font-bold text-blue-900">{stats.orders}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-green-700">Wishlist</span>
            </div>
            <p className="text-lg font-bold text-green-900">{stats.wishlist}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-amber-700">Loyalty Points</span>
            </div>
            <p className="text-lg font-bold text-amber-900">{stats.points.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};