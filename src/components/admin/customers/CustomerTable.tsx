'use client';

import React from 'react';
import { Eye, Edit2, Trash2, MoreVertical, Mail, Phone, Ban, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface CustomerTableRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'blocked';
  totalSpent: number;
  ordersCount: number;
  lastOrderDate: string;
  joinDate: string;
  avatar?: string;
}

interface CustomerTableProps {
  customers: CustomerTableRow[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, filteredStatus: 'active' | 'inactive' | 'blocked') => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    blocked: 'bg-red-100 text-red-700'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.inactive}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onView,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    onView?.(id);
    // Alternatively router.push can be used here if onView not provided
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Contact</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Spent</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Orders</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Joined</th>
            <th className="text-right py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr 
              key={customer.id} 
              className="border-b border-gray-100 hover:bg-gray-50 group cursor-pointer"
              onClick={() => handleRowClick(customer.id)}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium overflow-hidden">
                    {customer.avatar ? (
                        <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                    ) : (
                        <span>{customer.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{customer.name}</h3>
                    <p className="text-xs text-gray-500">Seen {customer.lastOrderDate}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    {customer.email}
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</span>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{customer.ordersCount}</span>
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={customer.status} />
              </td>
              <td className="py-4 px-6">
                <span className="text-sm text-gray-600">{customer.joinDate}</span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onView?.(customer.id)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit?.(customer.id)}
                    className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit Customer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {customer.status !== 'blocked' ? (
                     <button
                        onClick={() => onStatusChange?.(customer.id, 'blocked')}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Block Customer"
                     >
                        <Ban className="w-4 h-4" />
                     </button>
                  ) : (
                     <button
                        onClick={() => onStatusChange?.(customer.id, 'active')}
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Unblock Customer"
                     >
                        <CheckCircle className="w-4 h-4" />
                     </button>
                  )}
                  <button
                    onClick={() => onDelete?.(customer.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Customer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
