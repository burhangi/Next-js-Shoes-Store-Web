// 📦 src/app/admin/orders/pending/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { OrderTable, type OrderTableRow, type OrderStatus } from '@/components/admin/orders';

// Mock pending orders
const pendingOrdersData: OrderTableRow[] = [
  { 
    id: '2', 
    orderNumber: 'ORD-002', 
    customerName: 'Jane Smith', 
    date: '2024-01-15', 
    total: 89.50, 
    itemsCount: 1, 
    status: 'pending', 
    paymentMethod: 'paypal',
    paymentStatus: 'pending' 
  },
  { 
    id: '9', 
    orderNumber: 'ORD-009', 
    customerName: 'Kevin Hart', 
    date: '2024-01-16', 
    total: 450.00, 
    itemsCount: 3, 
    status: 'pending', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
  { 
    id: '10', 
    orderNumber: 'ORD-010', 
    customerName: 'Angela Martin', 
    date: '2024-01-16', 
    total: 35.00, 
    itemsCount: 1, 
    status: 'pending', 
    paymentMethod: 'stripe',
    paymentStatus: 'paid' 
  },
];

export default function PendingOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderTableRow[]>(pendingOrdersData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    return order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
           order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewOrder = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  const handleStatusUpdate = (id: string, newStatus: OrderStatus) => {
    // Determine the action for the toast/alert message
    const action = newStatus === 'processing' ? 'approved' : 'rejected';
    
    // Update local state to remove the order from the "pending" list (since it's no longer pending)
    // OR keep it but change status (which effectively removes it from a strict "pending" view if we were filtering, 
    // but here we just update it and maybe it stays until refresh or we filter it out).
    // Better UX: Update status, show success, and filter it out after a short delay or immediately.
    // For this demo, let's remove it from the list as it's no longer "pending".
    
    setOrders(prev => prev.filter(o => o.id !== id));
    alert(`Order ${action} successfully!`);
  };

  const handleApproveAll = () => {
    if (window.confirm('Are you sure you want to approve all pending orders?')) {
        setOrders([]);
        alert('All orders approved and moved to processing.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Orders</h1>
          <p className="text-gray-600">Review and approve customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleApproveAll}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
            disabled={orders.length === 0}
          >
            <CheckCircle className="w-4 h-4" />
            Approve All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">To Review</p>
              <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Value</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.total > 200).length}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <h3 className="text-2xl font-bold text-gray-900">
                    ${orders.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
                </h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
            </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pending orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <OrderTable
            orders={filteredOrders}
            onView={handleViewOrder}
            onStatusUpdate={handleStatusUpdate}
            showActions={true}
        />
        
        {/* Empty State */}
        {filteredOrders.length === 0 && (
            <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
            <p className="text-gray-600">
                {searchQuery ? 'No orders match your search' : 'All caught up! No orders to review.'}
            </p>
            </div>
        )}
      </div>
    </div>
  );
}