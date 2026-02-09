// components/common/NotificationToast.tsx
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  ShoppingBag,
  Heart,
  Star,
  Package,
  Truck,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoClose?: boolean;
  duration?: number;
  showProgress?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Pre-defined notification templates
const notificationTemplates = {
  cart: {
    success: (productName: string) => ({
      title: 'Added to Cart',
      message: `${productName} has been added to your shopping cart.`,
      type: 'success' as NotificationType,
      icon: <ShoppingBag className="h-5 w-5" />,
    }),
    removed: (productName: string) => ({
      title: 'Removed from Cart',
      message: `${productName} has been removed from your cart.`,
      type: 'info' as NotificationType,
      icon: <ShoppingBag className="h-5 w-5" />,
    }),
    outOfStock: (productName: string) => ({
      title: 'Out of Stock',
      message: `${productName} is currently out of stock.`,
      type: 'warning' as NotificationType,
      icon: <AlertCircle className="h-5 w-5" />,
    }),
  },
  wishlist: {
    added: (productName: string) => ({
      title: 'Added to Wishlist',
      message: `${productName} has been added to your wishlist.`,
      type: 'success' as NotificationType,
      icon: <Heart className="h-5 w-5" />,
    }),
    removed: (productName: string) => ({
      title: 'Removed from Wishlist',
      message: `${productName} has been removed from your wishlist.`,
      type: 'info' as NotificationType,
      icon: <Heart className="h-5 w-5" />,
    }),
    alreadyInWishlist: (productName: string) => ({
      title: 'Already in Wishlist',
      message: `${productName} is already in your wishlist.`,
      type: 'info' as NotificationType,
      icon: <Info className="h-5 w-5" />,
    }),
  },
  order: {
    placed: (orderId: string) => ({
      title: 'Order Confirmed',
      message: `Order #${orderId} has been successfully placed.`,
      type: 'success' as NotificationType,
      icon: <Package className="h-5 w-5" />,
      action: {
        label: 'View Order',
        onClick: () => window.location.href = `/orders/${orderId}`,
      },
    }),
    shipped: (orderId: string, trackingNumber?: string) => ({
      title: 'Order Shipped',
      message: `Order #${orderId} has been shipped${trackingNumber ? ` (Tracking: ${trackingNumber})` : ''}.`,
      type: 'info' as NotificationType,
      icon: <Truck className="h-5 w-5" />,
    }),
    delivered: (orderId: string) => ({
      title: 'Order Delivered',
      message: `Order #${orderId} has been delivered.`,
      type: 'success' as NotificationType,
      icon: <CheckCircle className="h-5 w-5" />,
      action: {
        label: 'Leave Review',
        onClick: () => window.location.href = `/orders/${orderId}/review`,
      },
    }),
  },
  review: {
    submitted: () => ({
      title: 'Review Submitted',
      message: 'Thank you for your review! It will help other customers.',
      type: 'success' as NotificationType,
      icon: <Star className="h-5 w-5" />,
    }),
  },
  auth: {
    signedIn: (username: string) => ({
      title: 'Welcome Back!',
      message: `You've successfully signed in as ${username}.`,
      type: 'success' as NotificationType,
      icon: <CheckCircle className="h-5 w-5" />,
    }),
    signedOut: () => ({
      title: 'Signed Out',
      message: 'You have been successfully signed out.',
      type: 'info' as NotificationType,
      icon: <Info className="h-5 w-5" />,
    }),
  },
  system: {
    error: (message: string) => ({
      title: 'Error',
      message,
      type: 'error' as NotificationType,
      icon: <AlertTriangle className="h-5 w-5" />,
      autoClose: false,
    }),
    info: (title: string, message: string) => ({
      title,
      message,
      type: 'info' as NotificationType,
      icon: <Info className="h-5 w-5" />,
    }),
    warning: (title: string, message: string) => ({
      title,
      message,
      type: 'warning' as NotificationType,
      icon: <AlertCircle className="h-5 w-5" />,
    }),
  },
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const notification = {
  show: (notification: Omit<Notification, 'id'>) => {
    // This will be implemented by the NotificationProvider
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('show-notification', { detail: notification });
      window.dispatchEvent(event);
    }
  },
  success: (title: string, message: string, options?: Partial<Notification>) => {
    notification.show({
      title,
      message,
      type: 'success',
      icon: <CheckCircle className="h-5 w-5" />,
      ...options,
    });
  },
  error: (title: string, message: string, options?: Partial<Notification>) => {
    notification.show({
      title,
      message,
      type: 'error',
      icon: <AlertTriangle className="h-5 w-5" />,
      autoClose: false,
      ...options,
    });
  },
  warning: (title: string, message: string, options?: Partial<Notification>) => {
    notification.show({
      title,
      message,
      type: 'warning',
      icon: <AlertCircle className="h-5 w-5" />,
      ...options,
    });
  },
  info: (title: string, message: string, options?: Partial<Notification>) => {
    notification.show({
      title,
      message,
      type: 'info',
      icon: <Info className="h-5 w-5" />,
      ...options,
    });
  },
  templates: notificationTemplates,
};

interface NotificationToastProps {
  position?: NotificationPosition;
  maxNotifications?: number;
  defaultDuration?: number;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  position = 'top-right',
  maxNotifications = 5,
  defaultDuration = 5000,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    if (!isMounted) return;
    
    const id = `notif-${idCounter}`;
    setIdCounter(prev => prev + 1);
    
    const newNotification = {
      ...notification,
      id,
      autoClose: notification.autoClose ?? true,
      duration: notification.duration ?? defaultDuration,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      if (updated.length > maxNotifications) {
        return updated.slice(0, maxNotifications);
      }
      return updated;
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    if (!isMounted) return;
    
    const handleShowNotification = (event: CustomEvent<Omit<Notification, 'id'>>) => {
      addNotification(event.detail);
    };

    window.addEventListener('show-notification', handleShowNotification as EventListener);
    return () => {
      window.removeEventListener('show-notification', handleShowNotification as EventListener);
    };
  }, [isMounted]);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      message: 'text-green-700',
      progress: 'bg-green-500',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      message: 'text-red-700',
      progress: 'bg-red-500',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      progress: 'bg-yellow-500',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      message: 'text-blue-700',
      progress: 'bg-blue-500',
    },
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications }}>
      {isMounted && (
        <div className={cn('fixed z-[9999] flex flex-col gap-3', positionClasses[position])} suppressHydrationWarning>
          <AnimatePresence mode="popLayout">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
              notification={notification}
              onClose={() => removeNotification(notification.id)}
              typeStyles={typeStyles}
            />
          ))}
          </AnimatePresence>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
  typeStyles: Record<NotificationType, any>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose, typeStyles }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const styles = typeStyles[notification.type];

  useEffect(() => {
    if (!notification.autoClose || isPaused) return;

    const totalDuration = notification.duration || 5000;
    const interval = 50;
    const steps = totalDuration / interval;
    const decrement = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        if (next <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [notification.autoClose, notification.duration, isPaused, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-full max-w-sm rounded-xl border shadow-lg overflow-hidden',
        styles.bg
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress Bar */}
      {notification.autoClose && notification.showProgress !== false && (
        <div className="h-1 w-full bg-gray-200">
          <motion.div
            className={cn('h-full', styles.progress)}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn('flex-shrink-0', styles.icon)}>
            {notification.icon || (
              {
                success: <CheckCircle className="h-5 w-5" />,
                error: <AlertTriangle className="h-5 w-5" />,
                warning: <AlertCircle className="h-5 w-5" />,
                info: <Info className="h-5 w-5" />,
              }[notification.type]
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={cn('font-semibold text-sm', styles.title)}>
              {notification.title}
            </h3>
            <p className={cn('text-sm mt-1', styles.message)}>
              {notification.message}
            </p>
            
            {/* Action Button */}
            {notification.action && (
              <button
                onClick={() => {
                  notification.action?.onClick();
                  onClose();
                }}
                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                {notification.action.label} →
              </button>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Hook for easy usage
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  const show = (notification: Omit<Notification, 'id'>) => {
    context.addNotification(notification);
  };

  return {
    show,
    success: (title: string, message: string, options?: Partial<Notification>) =>
      show({ title, message, type: 'success', icon: <CheckCircle className="h-5 w-5" />, ...options }),
    error: (title: string, message: string, options?: Partial<Notification>) =>
      show({ title, message, type: 'error', icon: <AlertTriangle className="h-5 w-5" />, ...options }),
    warning: (title: string, message: string, options?: Partial<Notification>) =>
      show({ title, message, type: 'warning', icon: <AlertCircle className="h-5 w-5" />, ...options }),
    info: (title: string, message: string, options?: Partial<Notification>) =>
      show({ title, message, type: 'info', icon: <Info className="h-5 w-5" />, ...options }),
    templates: notificationTemplates,
    remove: context.removeNotification,
    clear: context.clearNotifications,
  };
};