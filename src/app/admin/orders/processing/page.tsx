// 📦 src/app/admin/orders/processing/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Truck, AlertCircle } from 'lucide-react';
import { OrderTable, type OrderTableRow, type OrderStatus } from '@/components/admin/orders';
import { OrderCard, type OrderCardProps } from '@/components/admin/orders/OrderCard';

const processingOrdersData: OrderTableRow[] = [
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
    id: '13', 
    orderNumber: 'ORD-013', 
    customerName: 'David Lee', 
    date: '2024-01-16', 
    total: 189.99, 
    itemsCount: 2, 
    status: 'processing', 
    paymentMethod: 'paypal',
    paymentStatus: 'paid' 
  },
  { 
    id: '14', 
    orderNumber: 'ORD-014', 
    customerName: 'Jennifer Brown', 
    date: '2024-01-15', 
    total: 67.50, 
    itemsCount: 1, 
    status: 'processing', 
    paymentMethod: 'stripe',
    paymentStatus: 'paid' 
  },
  { 
    id: '15', 
    orderNumber: 'ORD-015', 
    customerName: 'Thomas Anderson', 
    date: '2024-01-15', 
    total: 345.25, 
    itemsCount: 4, 
    status: 'processing', 
    paymentMethod: 'credit_card',
    paymentStatus: 'paid' 
  },
];

const processingCardsData: OrderCardProps[] = [
  { 
    id: '3', 
    orderNumber: 'ORD-003', 
    customerName: 'Robert Johnson', 
    customerEmail: 'robert@example.com', 
    date: '2024-01-14', 
    total: 245.75, 
    itemsCount: 3, 
    status: 'processing' 
  },
  { 
    id: '13', 
    orderNumber: 'ORD-013', 
    customerName: 'David Lee', 
    customerEmail: 'david@example.com', 
    date: '2024-01-16', 
    total: 189.99, 
    itemsCount: 2, 
    status: 'processing' 
  },
  { 
    id: '14', 
    orderNumber: 'ORD-014', 
    customerName: 'Jennifer Brown', 
    customerEmail: 'jennifer@example.com', 
    date: '2024-01-15', 
    total: 67.50, 
    itemsCount: 1, 
    status: 'processing' 
  },
  { 
    id: '15', 
    orderNumber: 'ORD-015', 
    customerName: 'Thomas Anderson', 
    customerEmail: 'thomas@example.com', 
    date: '2024-01-15', 
    total: 345.25, 
    itemsCount: 4, 
    status: 'processing' 
  },
];

export default function ProcessingOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderTableRow[]>(processingOrdersData);
  const [cards, setCards] = useState<OrderCardProps[]>(processingCardsData);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCards = cards.filter(card =>
    card.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewOrder = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  const handleStatusUpdate = (id: string, newStatus: OrderStatus) => {
    if (newStatus === 'shipped') {
        const order = orders.find(o => o.id === id);
        if (order) {
            alert(`Order ${order.orderNumber} marked as shipped!`);
            // Remove from processing
            setOrders(prev => prev.filter(o => o.id !== id));
            setCards(prev => prev.filter(c => c.id !== id));
        }
    }
  };
  
  const handlePrintLabels = () => {
    alert('Printing labels for all filtering orders...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processing Orders</h1>
          <p className="text-gray-600">Orders being prepared for shipping</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
              title="Table View"
            >
              <div className="w-4 h-4 text-gray-600">📋</div>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              title="Grid View"
            >
              <div className="w-4 h-4 text-gray-600">▦</div>
            </button>
          </div>
          <button
            onClick={handlePrintLabels}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            <Package className="w-4 h-4" />
            Print Labels
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Ready to Pack</h3>
              <p className="text-sm text-blue-700">4 orders need packaging</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Ready to Ship</h3>
              <p className="text-sm text-purple-700">2 orders ready for pickup</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-900">Awaiting Stock</h3>
              <p className="text-sm text-orange-700">1 order on backorder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search processing orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
          />
        </div>
      </div>

      {/* Orders Content */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <OrderTable
            orders={filteredOrders}
            onView={handleViewOrder}
            onStatusUpdate={handleStatusUpdate}
            showActions={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Truck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No processing orders!</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No processing orders match "${searchQuery}"`
              : 'All orders have been shipped. Great work!'
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