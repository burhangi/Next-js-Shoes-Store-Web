// 📦 src/components/admin/dashboard/ActivityFeed.tsx
'use client';

import React from 'react';
import { CheckCircle, Package, UserPlus, CreditCard, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'order',
    title: 'New order received',
    description: 'Order #ORD-009 from Alex Johnson',
    time: '5 minutes ago',
    icon: Package,
    color: 'text-blue-500',
  },
  {
    id: 2,
    type: 'customer',
    title: 'New customer registered',
    description: 'Sarah Miller joined the platform',
    time: '1 hour ago',
    icon: UserPlus,
    color: 'text-green-500',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment processed',
    description: 'Payment of $249.99 for order #ORD-008',
    time: '2 hours ago',
    icon: CreditCard,
    color: 'text-purple-500',
  },
  {
    id: 4,
    type: 'product',
    title: 'Product out of stock',
    description: 'Nike Air Max 270 is running low',
    time: '4 hours ago',
    icon: AlertCircle,
    color: 'text-red-500',
  },
  {
    id: 5,
    type: 'shipping',
    title: 'Order shipped',
    description: 'Order #ORD-007 shipped to customer',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'text-emerald-500',
  },
];

export const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600">Latest system activities</p>
        </div>
        <button className="text-sm text-[#FF6B35] hover:text-[#E85A28] font-medium">
          See all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
            <div className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-')}/10`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};