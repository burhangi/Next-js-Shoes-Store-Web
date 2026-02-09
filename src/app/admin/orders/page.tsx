// 📦 src/app/admin/orders/page.tsx - FIXED VERSION
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Plus } from 'lucide-react';
import Link from 'next/link';
import { OrderTable, OrderTableRow, type OrderStatus } from '@/components/admin/orders';
import { OrderFilters } from '@/components/admin/orders/OrderFilters';
import { OrderStats } from '@/components/admin/orders/OrderStats';

// Mock data - replace with your actual data
const mockOrdersData: OrderTableRow[] = [
  { 
    id: '1', 
    orderNumber: 'ORD-001', 
    customerName: 'John Doe', 
    date: '2024-01-15', 
    total: 129.99, 
    itemsCount: 2, 
    status: 'completed', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
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
    id: '3', 
    orderNumber: 'ORD-003', 
    customerName: 'Robert Johnson', 
    date: '2024-01-14', 
    total: 245.75, 
    itemsCount: 3, 
    status: 'processing', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
  { 
    id: '4', 
    orderNumber: 'ORD-004', 
    customerName: 'Sarah Williams', 
    date: '2024-01-14', 
    total: 67.30, 
    itemsCount: 1, 
    status: 'shipped', 
    paymentMethod: 'stripe',
    paymentStatus: 'paid' 
  },
  { 
    id: '5', 
    orderNumber: 'ORD-005', 
    customerName: 'Michael Brown', 
    date: '2024-01-13', 
    total: 189.99, 
    itemsCount: 2, 
    status: 'completed', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
  { 
    id: '6', 
    orderNumber: 'ORD-006', 
    customerName: 'Emily Davis', 
    date: '2024-01-13', 
    total: 320.45, 
    itemsCount: 4, 
    status: 'delivered', 
    paymentMethod: 'paypal',
    paymentStatus: 'paid' 
  },
  { 
    id: '7', 
    orderNumber: 'ORD-007', 
    customerName: 'David Wilson', 
    date: '2024-01-12', 
    total: 75.20, 
    itemsCount: 1, 
    status: 'cancelled', 
    paymentMethod: 'credit_card',
    paymentStatus: 'refunded' 
  },
  { 
    id: '8', 
    orderNumber: 'ORD-008', 
    customerName: 'Lisa Anderson', 
    date: '2024-01-12', 
    total: 154.99, 
    itemsCount: 2, 
    status: 'returned', 
    paymentMethod: 'stripe',
    paymentStatus: 'refunded' 
  },
];

const mockStats = {
  totalOrders: 1847,
  totalRevenue: 45231.89,
  pendingOrders: 24,
  processingOrders: 18,
  shippedOrders: 32,
  completedOrders: 1753,
  avgOrderValue: 129.45,
  conversionRate: 3.2
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderTableRow[]>(mockOrdersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all'); 
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  
  const router = useRouter();

  const handleViewOrder = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  const handleStatusUpdate = (id: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href="/admin/orders/create"
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Order
          </Link>
        </div>
      </div>

      {/* Stats */}
      <OrderStats stats={mockStats} />

      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <OrderTable
          orders={filteredOrders}
          onView={handleViewOrder}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDeleteOrder}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing 1 to {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#FF6B35] text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/orders?status=pending"
          onClick={() => setStatusFilter('pending')}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <div className="w-6 h-6 text-yellow-600 font-bold">!</div>
            </div>
            <span className="text-sm font-medium text-yellow-600 group-hover:text-yellow-700">
              View All →
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Pending Orders</h3>
          <p className="text-sm text-gray-600">Orders awaiting confirmation</p>
        </Link>

        <Link
          href="/admin/orders?status=processing"
          onClick={() => setStatusFilter('processing')}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <div className="w-6 h-6 text-blue-600 font-bold">↻</div>
            </div>
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
              View All →
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Processing</h3>
          <p className="text-sm text-gray-600">Orders being prepared</p>
        </Link>

        <Link
          href="/admin/orders?status=shipped"
          onClick={() => setStatusFilter('shipped')}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <div className="w-6 h-6 text-purple-600 font-bold">🚚</div>
            </div>
            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
              View All →
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Shipped</h3>
          <p className="text-sm text-gray-600">Orders in transit</p>
        </Link>

        <Link
          href="/admin/orders?status=returned"
          onClick={() => setStatusFilter('returned')}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <div className="w-6 h-6 text-orange-600 font-bold">↩</div>
            </div>
            <span className="text-sm font-medium text-orange-600 group-hover:text-orange-700">
              View All →
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Returns</h3>
          <p className="text-sm text-gray-600">Manage returns & refunds</p>
        </Link>
      </div>
    </div>
  );
}