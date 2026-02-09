// 📦 components/admin/notifications/NotificationList.tsx
'use client';

import React from 'react';
import { BellOff, Loader2 } from 'lucide-react';
import { AdminNotification } from '@/lib/data/notifications';
import { NotificationCard } from './NotificationCard';

interface NotificationListProps {
  notifications: AdminNotification[];
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (notification: AdminNotification) => void;
  loading?: boolean;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onRead,
  onDelete,
  onClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <BellOff className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No notifications found
        </h3>
        <p className="text-sm text-gray-600 text-center max-w-md">
          There are no notifications matching your current filters. Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRead={onRead}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
