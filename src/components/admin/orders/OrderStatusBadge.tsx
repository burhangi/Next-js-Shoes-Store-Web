// 📦 src/components/admin/orders/OrderStatusBadge.tsx
'use client';

import React from 'react';
import { CheckCircle, Clock, Truck, Package, RefreshCw, XCircle, AlertCircle } from 'lucide-react';

// Define OrderStatus type locally
export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md'
}) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: Clock,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500'
    },
    processing: {
      label: 'Processing',
      icon: RefreshCw,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500'
    },
    shipped: {
      label: 'Shipped',
      icon: Truck,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      iconColor: 'text-purple-500'
    },
    delivered: {
      label: 'Delivered',
      icon: Package,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      iconColor: 'text-green-500'
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      iconColor: 'text-green-500'
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      iconColor: 'text-red-500'
    },
    returned: {
      label: 'Returned',
      icon: RefreshCw,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      iconColor: 'text-orange-500'
    },
    refunded: {
      label: 'Refunded',
      icon: CheckCircle,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-500'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2'
  };

  return (
    <span className={`inline-flex items-center ${config.bgColor} ${config.textColor} rounded-full font-medium ${sizeClasses[size]}`}>
      {showIcon && <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />}
      {config.label}
    </span>
  );
};