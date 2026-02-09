// 📦 src/components/admin/orders/OrderDetail.tsx
'use client';

import React from 'react';
import { Mail, Phone, MapPin, Calendar, Package, Truck, CreditCard, User, FileText, Printer } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Order } from '@/lib/types/order';

interface OrderDetailProps {
  order: Order;
  onPrint?: () => void;
  onEmail?: () => void;
  onUpdateStatus?: (status: Order['status']) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  onPrint,
  onEmail,
  onUpdateStatus
}) => {
  const formatAddress = (address: any) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <OrderStatusBadge status={order.status} size="lg" />
          </div>
          <p className="text-gray-600 mt-1">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={onEmail}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85A28] text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Email Customer
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
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

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
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
        </div>

        {/* Right Column - Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.customerEmail}</p>
                </div>
              </div>
              {order.customerPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{order.customerPhone}</p>
                </div>
              )}
              <button className="w-full py-2.5 text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium border border-[#FF6B35] rounded-lg hover:bg-[#FF6B35]/5 transition-colors">
                View Customer Profile
              </button>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p className="text-sm text-gray-600">{formatAddress(order.shippingAddress)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.shippingMethod}</p>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                  )}
                  {order.estimatedDelivery && (
                    <p className="text-xs text-gray-500">Est. delivery: {order.estimatedDelivery}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                  <p className="text-sm text-gray-600">
                    Status: <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-sm text-gray-600">Placed on {order.date}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {order.status === 'pending' && (
                <button
                  onClick={() => onUpdateStatus?.('processing')}
                  className="w-full py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Process Order
                </button>
              )}
              {order.status === 'processing' && (
                <button
                  onClick={() => onUpdateStatus?.('shipped')}
                  className="w-full py-2.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Mark as Shipped
                </button>
              )}
              {order.status === 'shipped' && (
                <button
                  onClick={() => onUpdateStatus?.('delivered')}
                  className="w-full py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Mark as Delivered
                </button>
              )}
              <button className="w-full py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};