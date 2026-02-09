// 📦 components/admin/notifications/NotificationFilters.tsx
'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { AdminNotification } from '@/lib/data/notifications';
import { cn } from '@/lib/utils/cn';

interface NotificationFiltersProps {
  filters: {
    type?: AdminNotification['type'];
    priority?: AdminNotification['priority'];
    read?: boolean;
  };
  onFilterChange: (filters: {
    type?: AdminNotification['type'];
    priority?: AdminNotification['priority'];
    read?: boolean;
  }) => void;
  unreadCount: number;
  totalCount: number;
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  filters,
  onFilterChange,
  unreadCount,
  totalCount,
}) => {
  const types: AdminNotification['type'][] = [
    'order',
    'product',
    'customer',
    'payment',
    'inventory',
    'review',
    'marketing',
    'system',
  ];

  const priorities: AdminNotification['priority'][] = [
    'urgent',
    'high',
    'medium',
    'low',
  ];

  const handleTypeChange = (type: AdminNotification['type'] | 'all') => {
    onFilterChange({
      ...filters,
      type: type === 'all' ? undefined : type,
    });
  };

  const handlePriorityChange = (priority: AdminNotification['priority'] | 'all') => {
    onFilterChange({
      ...filters,
      priority: priority === 'all' ? undefined : priority,
    });
  };

  const handleReadChange = (read: 'all' | 'read' | 'unread') => {
    onFilterChange({
      ...filters,
      read: read === 'all' ? undefined : read === 'read',
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = filters.type || filters.priority !== undefined || filters.read !== undefined;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Total</p>
          <p className="text-lg font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="p-3 bg-primary-light rounded-lg">
          <p className="text-xs text-primary-dark mb-1">Unread</p>
          <p className="text-lg font-bold text-primary">{unreadCount}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg col-span-2 sm:col-span-1">
          <p className="text-xs text-green-700 mb-1">Read</p>
          <p className="text-lg font-bold text-green-700">{totalCount - unreadCount}</p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTypeChange('all')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
              !filters.type
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                filters.type === type
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePriorityChange('all')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
              filters.priority === undefined
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          {priorities.map((priority) => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                filters.priority === priority
                  ? getPriorityButtonClass(priority)
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Read Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {(['all', 'unread', 'read'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleReadChange(status)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                (status === 'all' && filters.read === undefined) ||
                (status === 'unread' && filters.read === false) ||
                (status === 'read' && filters.read === true)
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const getPriorityButtonClass = (priority: AdminNotification['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500 text-white hover:bg-red-600';
    case 'high':
      return 'bg-orange-500 text-white hover:bg-orange-600';
    case 'medium':
      return 'bg-yellow-500 text-white hover:bg-yellow-600';
    case 'low':
      return 'bg-gray-500 text-white hover:bg-gray-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
