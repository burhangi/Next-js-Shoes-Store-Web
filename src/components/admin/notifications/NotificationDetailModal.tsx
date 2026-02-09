// 📦 components/admin/notifications/NotificationDetailModal.tsx
'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  ShoppingCart, 
  Package, 
  Users, 
  AlertCircle, 
  CreditCard, 
  Box, 
  Star, 
  Megaphone,
  Clock,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { AdminNotification } from '@/lib/data/notifications';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface NotificationDetailModalProps {
  notification: AdminNotification | null;
  isOpen: boolean;
  onClose: () => void;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  isOpen,
  onClose,
  onRead,
  onDelete,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !notification) return null;

  const getIcon = () => {
    const iconClass = "w-8 h-8";
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

  const getPriorityColor = () => {
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const handleMarkAsRead = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(notification.id);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none",
          isOpen ? "pointer-events-auto" : ""
        )}
      >
        <div
          className={cn(
            "bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden",
            "transform transition-all duration-300",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={cn(
            "relative p-6 border-b border-gray-200",
            !notification.read && "bg-primary-light/20"
          )}>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Icon and Title */}
            <div className="flex items-start gap-4 pr-12">
              <div className={cn(
                "flex-shrink-0 p-3 rounded-xl border-2",
                getTypeColor()
              )}>
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {notification.title}
                  </h2>
                  {!notification.read && (
                    <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className={cn(
                    "px-2 py-1 rounded-md font-medium capitalize",
                    getTypeColor()
                  )}>
                    {notification.type}
                  </span>
                  <span className={cn(
                    "px-2 py-1 rounded-md font-medium capitalize",
                    getPriorityColor()
                  )}>
                    {notification.priority}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Message */}
            <div className="mb-6">
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {notification.message}
              </p>
            </div>

            {/* Metadata */}
            {notification.metadata && Object.keys(notification.metadata).length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(notification.metadata).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Received: {formatDate(notification.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {!notification.read && onRead && (
                  <button
                    onClick={handleMarkAsRead}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Read
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
              {notification.actionUrl && (
                <Link
                  href={notification.actionUrl}
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
