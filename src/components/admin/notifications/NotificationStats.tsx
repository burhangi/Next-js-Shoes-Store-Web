// 📦 components/admin/notifications/NotificationStats.tsx
'use client';

import React from 'react';
import { 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  CreditCard
} from 'lucide-react';
import { AdminNotification } from '@/lib/data/notifications';
import { cn } from '@/lib/utils/cn';

interface NotificationStatsProps {
  notifications: AdminNotification[];
}

export const NotificationStats: React.FC<NotificationStatsProps> = ({
  notifications,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;
  const orderCount = notifications.filter(n => n.type === 'order' && !n.read).length;
  const inventoryCount = notifications.filter(n => n.type === 'inventory' && !n.read).length;

  const stats = [
    {
      label: 'Total Notifications',
      value: notifications.length,
      icon: Bell,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Unread',
      value: unreadCount,
      icon: AlertCircle,
      color: 'bg-primary',
      bgColor: 'bg-primary-light',
      textColor: 'text-primary-dark',
    },
    {
      label: 'Urgent',
      value: urgentCount,
      icon: TrendingUp,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      label: 'New Orders',
      value: orderCount,
      icon: ShoppingCart,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      label: 'Inventory Alerts',
      value: inventoryCount,
      icon: Package,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={cn(
              "p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
              stat.bgColor,
              "border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className={cn("text-2xl font-bold mb-1", stat.textColor)}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 font-medium">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};
