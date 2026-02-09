// 📄 /components/account/OrderCard.tsx
"use client";

import { useState } from 'react';
import { Package, Truck, CheckCircle, AlertCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
    total: number;
    items: OrderItem[];
    trackingNumber?: string;
  };
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    delivered: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: 'Delivered',
    },
    processing: {
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      label: 'Processing',
    },
    shipped: {
      icon: Truck,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      label: 'Shipped',
    },
    cancelled: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'Cancelled',
    },
  };

  const StatusIcon = statusConfig[order.status].icon;
  const statusColor = statusConfig[order.status].color;
  const statusBg = statusConfig[order.status].bg;
  const statusBorder = statusConfig[order.status].border;

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
              <span className={cn('px-3 py-1 text-xs font-medium rounded-full border', statusColor, statusBg, statusBorder)}>
                <StatusIcon className="inline h-3 w-3 mr-1" />
                {statusConfig[order.status].label}
              </span>
            </div>
            <p className="text-sm text-gray-600">Placed on {order.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse order' : 'Expand order'}
            >
              <ChevronDown className={cn('h-5 w-5 transition-transform', isExpanded && 'rotate-180')} />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          {/* Order Items */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Order Items ({order.items.length})</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {item.size && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          Color: {item.color}
                        </span>
                      )}
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Actions */}
          <div className="flex flex-wrap gap-3">
            {order.status === 'delivered' && (
              <>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Write a Review
                </Button>
                <Button variant="outline">Buy Again</Button>
              </>
            )}
            {order.status === 'shipped' && order.trackingNumber && (
              <Button variant="outline" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Track Package
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            <Button variant="outline" className="ml-auto">
              View Invoice
            </Button>
            {(order.status === 'processing' || order.status === 'shipped') && (
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </span>
            </div>
            {order.trackingNumber && (
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Tracking: {order.trackingNumber}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Contact Support
            </Button>
            <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Order Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};