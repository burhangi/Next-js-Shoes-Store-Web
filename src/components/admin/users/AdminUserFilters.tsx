// 📦 components/admin/users/AdminUserFilters.tsx
'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { AdminUser } from '@/lib/data/admin';
import { cn } from '@/lib/utils/cn';

interface AdminUserFiltersProps {
  filters: {
    role?: AdminUser['role'];
    status?: AdminUser['status'];
  };
  onFilterChange: (filters: {
    role?: AdminUser['role'];
    status?: AdminUser['status'];
  }) => void;
  totalCount: number;
}

export const AdminUserFilters: React.FC<AdminUserFiltersProps> = ({
  filters,
  onFilterChange,
  totalCount,
}) => {
  const roles: AdminUser['role'][] = ['super_admin', 'admin', 'manager', 'editor', 'viewer'];
  const statuses: AdminUser['status'][] = ['active', 'inactive', 'suspended'];

  const handleRoleChange = (role: AdminUser['role'] | 'all') => {
    onFilterChange({
      ...filters,
      role: role === 'all' ? undefined : role,
    });
  };

  const handleStatusChange = (status: AdminUser['status'] | 'all') => {
    onFilterChange({
      ...filters,
      status: status === 'all' ? undefined : status,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = filters.role || filters.status;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Total Users</p>
          <p className="text-lg font-bold text-gray-900">{totalCount}</p>
        </div>
      </div>

      {/* Role Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleRoleChange('all')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
              !filters.role
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                filters.role === role
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange('all')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
              !filters.status
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                filters.status === status
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
