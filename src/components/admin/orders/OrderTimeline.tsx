// 📦 src/components/admin/orders/OrderTimeline.tsx
'use client';

import React from 'react';
import { CheckCircle, Clock, Truck, Package, XCircle, AlertCircle, Mail } from 'lucide-react';
import { OrderNote } from '@/lib/types/order';

interface OrderTimelineProps {
  notes: OrderNote[];
  className?: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ notes, className = '' }) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'system':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'admin':
        return <Package className="w-4 h-4 text-green-500" />;
      case 'customer':
        return <Mail className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBgColor = (type?: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100';
      case 'admin':
        return 'bg-green-100';
      case 'customer':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No timeline events yet</p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div key={note.id} className="relative pl-8 pb-6 last:pb-0">
              {/* Timeline line */}
              {index !== notes.length - 1 && (
                <div className="absolute left-3 top-5 bottom-0 w-0.5 bg-gray-200" />
              )}
              
              {/* Icon */}
              <div className="absolute left-0 top-1">
                <div className={`p-1.5 rounded-full ${getBgColor(note.type)}`}>
                  {getIcon(note.type)}
                </div>
              </div>
              
              {/* Content */}
              <div>
                <p className="text-sm text-gray-900">{note.note}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{note.author}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{note.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};