// 📦 src/components/admin/orders/OrderTable.tsx
'use client';

import React from 'react';
import { Eye, Truck, CheckCircle, XCircle, Trash2, Package } from 'lucide-react';
import Link from 'next/link';
import { OrderStatusBadge, type OrderStatus } from './OrderStatusBadge';

// Define OrderTableRow locally
export interface OrderTableRow {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  total: number;
  itemsCount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
}

interface OrderTableProps {
  orders: OrderTableRow[];
  onView?: (id: string) => void;
  onStatusUpdate?: (id: string, newStatus: OrderStatus) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onView,
  onStatusUpdate,
  onDelete,
  showActions = true
}) => {
  const handleView = (id: string) => {
    onView?.(id);
  };

  const handleStatusUpdate = (id: string, status: OrderStatus) => {
    onStatusUpdate?.(id, status);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      onDelete?.(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Order #</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Amount</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Items</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Payment</th>
            {showActions && <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 group">
              <td className="py-4 px-6">
                <Link 
                  href={`/admin/orders/${order.id}`}
                  className="font-medium text-[#FF6B35] hover:text-[#E85A28]"
                  onClick={() => handleView(order.id)}
                >
                  {order.orderNumber}
                </Link>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{order.date}</span>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{order.itemsCount}</span>
              </td>
              <td className="py-4 px-6">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 capitalize">{order.paymentMethod}</span>
                  <span className={`text-xs ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </td>
              {showActions && (
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                      title="View Details"
                      onClick={() => handleView(order.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    {/* Status Actions */}
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'processing')}
                          className="p-1.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded"
                          title="Approve (Process)"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Reject (Cancel)"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                        className="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Mark as Shipped"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                    )}

                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        className="p-1.5 text-purple-500 hover:text-purple-600 hover:bg-purple-50 rounded"
                        title="Mark as Delivered"
                      >
                        <Package className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete Action (Always available or conditionally) */}
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};