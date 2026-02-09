// 📦 src/app/admin/orders/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Mail, Phone, MapPin, Calendar, Package, Truck, CreditCard, User } from 'lucide-react';
import { OrderStatusBadge, OrderStatus } from '@/components/admin/orders';

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

interface OrderNote {
  id: string;
  author: string;
  note: string;
  time: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: OrderItem[];
  shippingMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  notes: OrderNote[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'notes'>('details');
  const [newNote, setNewNote] = useState('');

  // Initial Mock Order Data
  const [order, setOrder] = useState<OrderDetail>({
    id: params.id,
    orderNumber: 'ORD-003',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.johnson@example.com',
    customerPhone: '+1 (555) 123-4567',
    date: '2024-01-14 14:30',
    status: 'processing',
    total: 245.75,
    subtotal: 220.00,
    shipping: 15.75,
    tax: 10.00,
    discount: 0,
    paymentMethod: 'Visa •••• 4242',
    paymentStatus: 'Paid',
    shippingAddress: {
      name: 'Robert Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'USA'
    },
    billingAddress: {
      name: 'Robert Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'USA'
    },
    items: [
      { id: '1', name: 'Nike Air Max 270', sku: 'NK-AM270-BLK', price: 129.99, quantity: 1, total: 129.99, image: '/products/nike-airmax-270.jpg' },
      { id: '2', name: 'Nike Metcon 8', sku: 'NK-MET8-BLU', price: 130.00, quantity: 1, total: 130.00, image: '/products/nike-metcon8.jpg' },
      { id: '3', name: 'Nike Socks (3-pack)', sku: 'NK-SOCKS-3', price: 15.00, quantity: 2, total: 30.00, image: '/products/nike-socks.jpg' }
    ],
    shippingMethod: 'FedEx Ground',
    trackingNumber: 'FX123456789US',
    estimatedDelivery: '2024-01-18',
    notes: [
      { id: '1', author: 'System', note: 'Order placed', time: '2024-01-14 14:30' },
      { id: '2', author: 'Admin', note: 'Order confirmed and processing', time: '2024-01-14 15:15' },
      { id: '3', author: 'Customer', note: 'Requested faster shipping if possible', time: '2024-01-14 16:00' }
    ]
  });

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleSendEmail = () => {
    alert(`Email sent to: ${order.customerEmail}`);
  };

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    const timestamp = new Date().toLocaleString();
    const noteText = `Status updated to ${newStatus}`;
    
    const newNoteObj = {
      id: Date.now().toString(),
      author: 'Admin',
      note: noteText,
      time: timestamp
    };

    setOrder(prev => ({
      ...prev,
      status: newStatus,
      notes: [newNoteObj, ...prev.notes]
    }));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const timestamp = new Date().toLocaleString();
    const newNoteObj = {
      id: Date.now().toString(),
      author: 'Admin',
      note: newNote,
      time: timestamp
    };

    setOrder(prev => ({
      ...prev,
      notes: [newNoteObj, ...prev.notes]
    }));
    setNewNote('');
    alert('Note added successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="text-gray-600">Order placed on {order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Email Customer
          </button>
        </div>
      </div>

      {/* Order Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Order Status</h3>
              <div className="flex items-center gap-3 mt-2">
                <OrderStatusBadge status={order.status} size="lg" />
                <span className="text-sm text-gray-600">
                  Estimated delivery: {order.estimatedDelivery}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('processing')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Process Order
                </button>
                <button 
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                  Reject Order
                </button>
              </>
            )}
            {order.status === 'processing' && (
              <button
                onClick={() => handleUpdateStatus('shipped')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Mark as Shipped
              </button>
            )}
            {order.status === 'shipped' && (
              <button
                onClick={() => handleUpdateStatus('delivered')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                Mark as Delivered
              </button>
            )}
             {order.status === 'delivered' && (
              <button
                disabled
                className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm font-medium"
              >
                Order Completed
              </button>
            )}
            {order.status !== 'cancelled' && order.status !== 'returned' && order.status !== 'delivered' && (
              <button 
                onClick={() => handleUpdateStatus('cancelled')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Order Details
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'timeline' ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'notes' ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Notes
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            <p className="font-bold text-gray-900">${item.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount</span>
                          <span className="text-red-600">-${order.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
                  {order.notes.map((note) => (
                    <div key={note.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 mt-2 bg-[#FF6B35] rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{note.note}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{note.author}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{note.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Note</h3>
                  <textarea
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] outline-none text-sm"
                    placeholder="Add a note about this order..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-sm text-gray-600">{order.customerPhone}</p>
              </div>
              <button className="w-full py-2 text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium border border-[#FF6B35] rounded-lg hover:bg-[#FF6B35]/5">
                View Customer Profile
              </button>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p className="text-sm text-gray-600">{order.shippingAddress.street}</p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.shippingMethod}</p>
                  <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                  <p className="text-sm text-gray-600">Status: <span className="text-green-600">{order.paymentStatus}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <p className="text-sm text-gray-600">Paid on {order.date}</p>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => alert("Shipping Label Created")}
                className="w-full py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Print Shipping Label
              </button>
              <button 
                onClick={() => alert("Tracking Info Sent")}
                className="w-full py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Send Tracking Info
              </button>
              <button 
                onClick={() => handleUpdateStatus('returned')}
                className="w-full py-2.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Create Return
              </button>
              <button 
                onClick={() => handleUpdateStatus('cancelled')}
                className="w-full py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}