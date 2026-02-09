// 📦 components/admin/notifications/NotificationCard.tsx
'use client';

import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  AlertCircle, 
  CreditCard, 
  Box, 
  Star, 
  Megaphone,
  Clock,
  X
} from 'lucide-react';
import { AdminNotification } from '@/lib/data/notifications';
import { cn } from '@/lib/utils/cn';

interface NotificationCardProps {
  notification: AdminNotification;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (notification: AdminNotification) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onRead,
  onDelete,
  onClick,
}) => {
  const getIcon = () => {
    const iconClass = "w-6 h-6";
    switch (notification.type) {
      case 'order':
        return <ShoppingCart className={iconClass} />;
      case 'product':
        return <Package className={iconClass} />;
      case 'customer':
        return <Users className={iconClass} />;
      case 'payment':
        return <CreditCard className={iconClass} />;
      case 'inventory':
        return <Box className={iconClass} />;
      case 'review':
        return <Star className={iconClass} />;
      case 'marketing':
        return <Megaphone className={iconClass} />;
      case 'system':
        return <AlertCircle className={iconClass} />;
      default:
        return <AlertCircle className={iconClass} />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'order':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'product':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'customer':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'payment':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'inventory':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'marketing':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'system':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityBadge = () => {
    switch (notification.priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification.id);
    }
  };

  const handleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative group p-4 sm:p-5 lg:p-6 rounded-xl border transition-all duration-300 cursor-pointer",
        "hover:shadow-xl hover:scale-[1.01] hover:border-primary/50 active:scale-[0.99]",
        !notification.read 
          ? "bg-gradient-to-br from-primary-light/40 via-white to-white border-primary/40 shadow-lg" 
          : "bg-white border-gray-200 hover:bg-gray-50/50"
      )}
    >
      {/* Read Indicator - Left Border */}
      {!notification.read && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-xl shadow-sm" />
      )}

      {/* Priority Indicator - Top Right */}
      <div className={cn(
        "absolute top-3 right-3 sm:top-4 sm:right-4 w-3 h-3 rounded-full shadow-md z-10",
        getPriorityBadge()
      )} />

      {/* Delete Button - Top Right (on hover) */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className={cn(
            "absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-lg transition-all duration-200 z-20",
            "bg-white/90 backdrop-blur-sm hover:bg-red-50 text-gray-500 hover:text-red-600",
            "border border-gray-200 hover:border-red-300 shadow-lg",
            "opacity-0 group-hover:opacity-100",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          )}
          title="Delete notification"
          aria-label="Delete notification"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Content Container */}
      <div className="pr-12 sm:pr-16">
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Icon */}
          <div className={cn(
            "flex-shrink-0 p-2.5 sm:p-3 rounded-xl border-2 shadow-sm transition-transform duration-200 group-hover:scale-110",
            getTypeColor()
          )}>
            {getIcon()}
          </div>

          {/* Title and Time */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className={cn(
                "font-bold text-sm sm:text-base lg:text-lg leading-tight line-clamp-2",
                !notification.read ? "text-gray-900" : "text-gray-700"
              )}>
                {notification.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {getTimeAgo(notification.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {notification.message}
        </p>

        {/* Metadata */}
        {notification.metadata && Object.keys(notification.metadata).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {Object.entries(notification.metadata).slice(0, 3).map(([key, value]) => (
              <span
                key={key}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <span className="font-semibold">{key}:</span> {String(value)}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
          <span className={cn(
            "px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all duration-200",
            getTypeColor(),
            "group-hover:shadow-sm"
          )}>
            {notification.type}
          </span>
          {!notification.read && (
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm animate-pulse">
              New
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
