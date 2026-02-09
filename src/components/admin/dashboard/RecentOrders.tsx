// 📦 src/components/admin/dashboard/RecentOrders.tsx
'use client';

import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with your actual data
const orders = [
  { id: 'ORD-001', customer: 'John Doe', amount: '$129.99', status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: '$89.50', status: 'pending', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Robert Johnson', amount: '$245.75', status: 'processing', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Sarah Williams', amount: '$67.30', status: 'failed', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'Michael Brown', amount: '$189.99', status: 'completed', date: '2024-01-13' },
];

export const RecentOrders: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <p className="text-sm text-gray-600">Latest customer orders</p>
        </div>
        <Link
          href="/admin/orders"
          className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-900">{order.id}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-700">{order.customer}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};