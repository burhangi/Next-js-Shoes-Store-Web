// 📦 src/components/admin/orders/OrderCard.tsx
'use client';

import React from 'react';
import { Calendar, Package, User, DollarSign, Eye, Truck } from 'lucide-react';
import Link from 'next/link';
import { OrderStatusBadge, type OrderStatus } from './OrderStatusBadge';

// Define OrderCardProps locally
export interface OrderCardProps {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  itemsCount: number;
  status: OrderStatus;
  showActions?: boolean;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  orderNumber,
  customerName,
  customerEmail,
  date,
  total,
  itemsCount,
  status,
  showActions = true,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{orderNumber}</h3>
          <p className="text-sm text-gray-600 mt-1">{customerName}</p>
        </div>
        <OrderStatusBadge status={status} />
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{customerEmail}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4 flex-shrink-0" />
            <span>{itemsCount} item{itemsCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Link
            href={`/admin/orders/${id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
          {status === 'processing' && (
            <button
              className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
              title="Track Order"
            >
              <Truck className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};