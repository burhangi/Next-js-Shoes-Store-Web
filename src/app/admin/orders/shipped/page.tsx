// 📦 src/app/admin/orders/shipped/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, MapPin, Clock, CheckCircle } from 'lucide-react';
import { OrderTable, type OrderTableRow, type OrderStatus } from '@/components/admin/orders';

// Mock shipped orders
const shippedOrdersData: OrderTableRow[] = [
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
    id: '16', 
    orderNumber: 'ORD-016', 
    customerName: 'Michael Scott', 
    date: '2024-01-16', 
    total: 156.99, 
    itemsCount: 2, 
    status: 'shipped', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
  { 
    id: '17', 
    orderNumber: 'ORD-017', 
    customerName: 'Pam Beesly', 
    date: '2024-01-15', 
    total: 89.50, 
    itemsCount: 1, 
    status: 'shipped', 
    paymentMethod: 'paypal',
    paymentStatus: 'paid' 
  },
  { 
    id: '18', 
    orderNumber: 'ORD-018', 
    customerName: 'Jim Halpert', 
    date: '2024-01-15', 
    total: 245.75, 
    itemsCount: 3, 
    status: 'shipped', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
];

export default function ShippedOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderTableRow[]>(shippedOrdersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingFilter, setTrackingFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    // For mock purposes, we assume all have tracking if filter is 'with_tracking' or just return true
    // Real implementation would check order.trackingNumber
    const matchesTracking = trackingFilter === 'all' || 
                           (trackingFilter === 'with_tracking' && order.status === 'shipped');
    return matchesSearch && matchesTracking;
  });

  const handleViewOrder = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  const handleStatusUpdate = (id: string, newStatus: OrderStatus) => {
     if (newStatus === 'delivered') {
         setOrders(prev => prev.filter(o => o.id !== id));
         alert('Order marked as delivered successfully');
     }
  };

  const handleMarkAllDelivered = () => {
      if (window.confirm('Are you sure you want to mark all shown orders as delivered?')) {
          setOrders([]); // Clear list or filter out
          alert('All orders marked as delivered');
      }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipped Orders</h1>
          <p className="text-gray-600">Track orders in transit and delivery status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            Track All
          </button>
          <button 
            onClick={handleMarkAllDelivered}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
            disabled={orders.length === 0}
          >
            <CheckCircle className="w-4 h-4" />
            Mark All Delivered
          </button>
        </div>
      </div>

      {/* Tracking Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out for Delivery</p>
              <h3 className="text-2xl font-bold text-gray-900">2</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivery Today</p>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delayed</p>
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search shipped orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={trackingFilter}
              onChange={(e) => setTrackingFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="all">All Shipments</option>
              <option value="with_tracking">With Tracking</option>
              <option value="without_tracking">Without Tracking</option>
            </select>
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
              <option>All Carriers</option>
              <option>FedEx</option>
              <option>UPS</option>
              <option>USPS</option>
              <option>DHL</option>
            </select>
          </div>
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
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Truck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shipped orders found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No shipped orders match "${searchQuery}"`
              : 'No orders are currently in transit'
            }
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}