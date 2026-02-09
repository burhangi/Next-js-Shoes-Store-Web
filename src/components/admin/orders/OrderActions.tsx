// 📦 src/components/admin/orders/OrderActions.tsx
'use client';

import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Copy, Archive, Eye, Mail, Printer } from 'lucide-react';

// Define OrderStatus locally
type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

interface OrderActionsProps {
  orderId: string;
  status: OrderStatus;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
  onPrint?: () => void;
  onEmail?: () => void;
}

type StatusAction = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: (() => void) | undefined;
  color: string;
};

export const OrderActions: React.FC<OrderActionsProps> = ({
  orderId,
  status,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  onPrint,
  onEmail
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: (() => void) | undefined) => {
    if (action) {
      action();
    }
    setIsOpen(false);
  };

  // Define status actions with all possible statuses
  const statusActions: Record<string, StatusAction[]> = {
    pending: [
      { icon: Edit, label: 'Process Order', onClick: onEdit, color: 'text-blue-600' },
      { icon: Mail, label: 'Send Confirmation', onClick: onEmail, color: 'text-green-600' },
    ],
    processing: [
      { icon: Edit, label: 'Update Status', onClick: onEdit, color: 'text-blue-600' },
      { icon: Printer, label: 'Print Label', onClick: onPrint, color: 'text-purple-600' },
    ],
    shipped: [
      { icon: Mail, label: 'Send Tracking', onClick: onEmail, color: 'text-green-600' },
      { icon: Edit, label: 'Mark Delivered', onClick: onEdit, color: 'text-blue-600' },
    ],
    delivered: [
      { icon: Edit, label: 'Complete Order', onClick: onEdit, color: 'text-green-600' },
    ],
    completed: [
      { icon: Copy, label: 'Duplicate Order', onClick: onDuplicate, color: 'text-gray-600' },
    ],
    cancelled: [
      { icon: Edit, label: 'Restore Order', onClick: onEdit, color: 'text-blue-600' },
    ],
    returned: [
      { icon: Edit, label: 'Process Return', onClick: onEdit, color: 'text-orange-600' },
    ],
    refunded: [
      { icon: Archive, label: 'Archive Order', onClick: onArchive, color: 'text-gray-600' },
    ],
    default: [
      { icon: Edit, label: 'Edit Order', onClick: onEdit, color: 'text-blue-600' },
      { icon: Copy, label: 'Duplicate', onClick: onDuplicate, color: 'text-gray-600' },
      { icon: Archive, label: 'Archive', onClick: onArchive, color: 'text-gray-600' },
    ]
  };

  const actions = statusActions[status] || statusActions.default;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              <button
                onClick={() => handleAction(onView)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action.onClick)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700"
                >
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  {action.label}
                </button>
              ))}
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <button
                onClick={() => handleAction(onDelete)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-left text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};