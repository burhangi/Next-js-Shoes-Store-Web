// 📦 components/notifications/NotificationItem.tsx
'use client';

import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Notification } from '@/lib/data/user';

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onClick?: (notification: Notification) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
  onClick,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
    if (onClick) {
      onClick(notification);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors",
        !notification.read && "bg-blue-50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-gray-900">{notification.title}</h4>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {getTimeAgo(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          {notification.metadata && Object.keys(notification.metadata).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(notification.metadata).map(([key, value]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};